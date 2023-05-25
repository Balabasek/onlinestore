package com.example.restservice;

import com.example.dtos.basket.AddNewItemDto;
import com.example.dtos.basket.ReturnItemBasketDto;
import com.example.dtos.user.CreateUserDto;
import com.example.dtos.user.DeleteUserDto;
import com.example.logger.LoggerProvider;
import com.example.model.User;
import com.example.service.SessionService;
import com.example.service.UserService;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("userService")
public class UserController {
	@Autowired
	private UserService userService;

	@Autowired
	private SessionService sessionService;

	private Logger logger;

	@Autowired
	public void SetLogger(LoggerProvider loggerProvider) {
		logger = loggerProvider.getLogger();
	}

	@PostMapping(
			value = "/create",
			consumes = MediaType.APPLICATION_JSON_VALUE,
			produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public User createNewUser(@RequestBody CreateUserDto createUserDto) {
		try {
			return userService.createNewUser(createUserDto);
		} catch (Exception e) {
			logger.error("Error occurred while create new user!", e);
		}
		return null;
	}

	@GetMapping(value = "/getUserBasket/{token}")
	@ResponseBody
	public List<ReturnItemBasketDto> getUserBasket(@PathVariable(value = "token") String token) {
		try {
			String userId = userService.getUserIdByLogin(sessionService.getUserBySession(token));
			return userService.getUserBasket(userId);
		} catch (Exception e) {
			logger.error("Error occurred while get user basket!", e);
		}
		return null;
	}

	@GetMapping(value = "/deleteItem/{token}/{itemId}")
	@ResponseBody
	public String deleteItemInBasket(@PathVariable(value = "token") String token, @PathVariable(value = "itemId") Long itemId) {
		try {
			String userId = userService.getUserIdByLogin(sessionService.getUserBySession(token));
			return userService.deleteItem(userId, itemId);
		} catch (Exception e) {
			logger.error("Error occurred while delete item in user basket!", e);
		}
		return null;
	}

	@GetMapping(value = "/updateItemCount/{token}/{action}/{itemId}")
	@ResponseBody
	public String updateItemCount(@PathVariable(value = "token") String token,
								  @PathVariable(value = "action") String action,
								  @PathVariable(value = "itemId") Long itemId) {
		try {
			String userId = userService.getUserIdByLogin(sessionService.getUserBySession(token));
			return userService.updateItemCount(userId, action, itemId);
		} catch (Exception e) {
			logger.error("Error occurred while update count item in user basket!", e);
		}
		return null;
	}

	@PostMapping(
			value = "/addNewItem/{token}",
			consumes = MediaType.APPLICATION_JSON_VALUE,
			produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public String addNewItem(@PathVariable(value = "token") String token, @RequestBody AddNewItemDto addNewItemDto) {
		try {
			String userId = userService.getUserIdByLogin(sessionService.getUserBySession(token));
			return userService.addNewItemInBasket(userId, addNewItemDto);
		} catch (Exception e) {
			logger.error("Error occurred while add new item in user basket!", e);
		}
		return null;
	}

	@PostMapping(
			value = "/delete",
			consumes = MediaType.APPLICATION_JSON_VALUE,
			produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public User deleteUser(@RequestBody DeleteUserDto deleteUserDto) {
		try {
			return userService.deleteUser(deleteUserDto);
		} catch (Exception e) {
			logger.error("Error occurred while delete user!", e);
		}
		return null;
	}
}
