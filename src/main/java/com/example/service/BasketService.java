package com.example.service;

import com.example.dtos.basket.AddNewItemDto;
import com.example.logger.LoggerProvider;
import com.example.model.Basket;
import com.example.model.Item;
import com.example.model.User;
import com.example.persistence.BasketRepository;
import com.example.persistence.ItemRepository;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BasketService {
	private final BasketRepository basketRepository;

	private final ItemRepository itemRepository;

	private final Logger logger;

	@Autowired
	public BasketService(BasketRepository basketRepository, ItemRepository itemRepository, LoggerProvider loggerProvider) {
		this.basketRepository = basketRepository;
		this.itemRepository = itemRepository;
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

		Item addItem = itemRepository.findItemById(addNewItemDto.getId());

		basket.addNewItem(addItem);
		updateBasket(basket);
		logger.info("Add new item success");
		return "Add new item success";
	}

	public String updateItemCount(String action, Long itemId, User user) {
		Basket basket;
		if (user != null) {
			basket = user.getBasket();
		} else {
			return null;
		}

		Item item = itemRepository.findItemById(itemId);
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

		Item deleteItem = itemRepository.findItemById(itemId);
		basket.deleteItem(deleteItem);
		if (basket.getItemList().contains(deleteItem)) {
			logger.error("Error occurred while delete item for id " + itemId);
			return "Error";
		}
		updateBasket(basket);
		logger.info("Delete item success (" + itemId + ")");
		return "Delete item success";
	}

	public void updateBasket(Basket basket) {
		basketRepository.save(basket);
	}

	public boolean deleteBasket(String id) {
		basketRepository.deleteBasketById(id);

		return !basketRepository.existsBasketById(id);
	}
}
