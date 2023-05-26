package com.example.service;

import com.example.dtos.basket.AddNewItemDto;
import com.example.logger.LoggerProvider;
import com.example.model.Basket;
import com.example.model.Item;
import com.example.model.User;
import com.example.persistence.BasketRepository;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class BasketService {
	private final BasketRepository basketRepository;

	private final ItemService itemService;

	private final Logger logger;

	@Autowired
	public BasketService(BasketRepository basketRepository, ItemService itemService, LoggerProvider loggerProvider) {
		this.basketRepository = basketRepository;
		this.itemService = itemService;
		this.logger = loggerProvider.getLogger();
	}

	public Basket createNewEmptyBasket() {
		Basket basket = new Basket();

		return basketRepository.save(basket);
	}

	public String addNewItem(AddNewItemDto addNewItemDto, User user) {
		Basket basket;
		if (user != null) {
			basket = user.getBasket();
		} else {
			return null;
		}

		Item addItem = itemService.findItemById(addNewItemDto.getId());

		basket.addNewItem(addItem);
		updateBasket(basket);
		logger.info("Add new item success");
		return "Товар добавлен";
	}

	public String updateItemCount(String action, Long itemId, User user) {
		Basket basket;
		if (user != null) {
			basket = user.getBasket();
		} else {
			return null;
		}

		Item item = itemService.findItemById(itemId);
		if ("increase".equals(action)) {
			basket.increaseItemCount(item);
			updateBasket(basket);
			logger.info("Increase item count success");
			return "Increase item count success";
		} else if ("decrease".equals(action)) {
			basket.decreaseItemCount(item);
			updateBasket(basket);
			logger.info("Decrease item count success");
			return "Decrease item count success";
		}

		logger.error("Update item count error! Invalid action" + action);
		return "Error";
	}

	public String deleteItem(Long itemId, User user) {
		Basket basket;
		if (user != null) {
			basket = user.getBasket();
		} else {
			return null;
		}

		Item deleteItem = itemService.findItemById(itemId);
		basket.deleteItem(deleteItem);
		if (basket.getItemList().contains(deleteItem)) {
			logger.error("Error occurred while delete item for id " + itemId);
			return "Ошибка сервера!";
		}
		updateBasket(basket);
		logger.info("Delete item success (" + itemId + ")");
		return "Товар убран из корзины";
	}

	public String buying(Basket basket) throws Exception {
		List<Item> itemList = basket.getItemList();
		Map<String, Long> itemMap = basket.getMapItemCount();

		for (Item item : itemList) {
			if (itemMap.containsKey(item.getUniqId())) {
				long count = itemMap.get(item.getUniqId());
				if (item.getStock() >= count) {
					item.setStock(item.getStock() - count);
				} else {
					return "Товара " + item.getTitle() + " нет в наличии!";
				}
			} else {
				logger.error("Error, item not found in basket map. Check this!!! Return null.");
				return "Ошибка сервера!";
			}
		}
		itemService.saveItems(itemList);
		itemList.clear();
		itemMap.clear();
		basketRepository.save(basket);
		return "Успешная покупка!";
	}

	public void updateBasket(Basket basket) {
		basketRepository.save(basket);
	}

	public boolean deleteBasket(String id) {
		basketRepository.deleteBasketById(id);

		return !basketRepository.existsBasketById(id);
	}
}
