package com.example.service;

import com.example.dtos.basket.AddNewItemDto;
import com.example.dtos.basket.ReturnItemBasketDto;
import com.example.dtos.user.CreateUserDto;
import com.example.dtos.user.DeleteUserDto;
import com.example.model.Basket;
import com.example.model.Item;
import com.example.model.User;
import com.example.persistence.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserService {
	private final UserRepository userRepository;
	private final BasketService basketService;

	@Autowired
	public UserService(UserRepository userRepository, BasketService basketService) {
		this.userRepository = userRepository;
		this.basketService = basketService;
	}

	public User createNewUser(CreateUserDto createUserDto) {
		User user = new User(createUserDto.getLogin());
		Basket basket = basketService.createNewEmptyBasket();
		user.setBasket(basket);

		return userRepository.save(user);
	}

	public User createNewUser(String login) {
		User user = new User(login);
		Basket basket = basketService.createNewEmptyBasket();
		user.setBasket(basket);

		return userRepository.save(user);
	}

	public List<ReturnItemBasketDto> getUserBasket(String userId) {
		User user = userRepository.findUserById(userId);
		Basket basket = user.getBasket();

		List<ReturnItemBasketDto> result = new ArrayList<>();
		for (Item item : basket.getItemList()) {
			ReturnItemBasketDto returnItemBasketDto = new ReturnItemBasketDto();
			returnItemBasketDto.setId(item.getId());
			returnItemBasketDto.setPrice(item.getPrice());
			returnItemBasketDto.setStock(item.getStock());
			returnItemBasketDto.setCount(basket.getMapItemCount().get(item.getUniqId()));
			returnItemBasketDto.setTotal(item.getPrice());

			result.add(returnItemBasketDto);
		}
		return result;
	}

	public String addNewItemInBasket(String userId, AddNewItemDto addNewItemDto) {
		User user = userRepository.findUserById(userId);

		return basketService.addNewItem(addNewItemDto, user);
	}

	public String updateItemCount(String userId, String action, Long itemId) {
		User user = userRepository.findUserById(userId);

		return basketService.updateItemCount(action, itemId, user);
	}

	public String deleteItem(String userId, Long itemId) {
		User user = userRepository.findUserById(userId);

		return basketService.deleteItem(itemId, user);
	}

	public User getUserByLogin(String login) {
		return userRepository.findUserByLogin(login);
	}

	public String getUserIdByLogin(String login) {
		return userRepository.findUserByLogin(login).getId();
	}

	public User deleteUser(DeleteUserDto deleteUserDto) {
		User user = userRepository.deleteUsersById(deleteUserDto.get_Id());
		System.out.println("User " + user.getLogin() + " deleted");
		if (!basketService.deleteBasket(user.getBasket().getId())) {
			System.out.println("Error occurred while delete basket in user " + user.getLogin());
		}

		return user;
	}
}
