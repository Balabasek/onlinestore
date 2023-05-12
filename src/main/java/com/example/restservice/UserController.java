package com.example.restservice;

import com.example.dtos.user.ChangeUserPasswordDto;
import com.example.dtos.user.CreateUserDto;
import com.example.dtos.user.DeleteUserDto;
import com.example.model.User;
import com.example.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;

@RestController
@RequestMapping("userService")
public class UserController {
	@Autowired
	private UserService userService;

	@PostMapping(
			value = "/create",
			consumes = MediaType.APPLICATION_JSON_VALUE,
			produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public User createNewUser(@RequestBody CreateUserDto createUserDto) {
		try {
			return userService.createNewUser(createUserDto);
		} catch (Exception e) {
			System.err.println("Error occurred while create new user!");
			System.err.println(e.getMessage());
			Arrays.stream(e.getStackTrace()).toList().forEach(System.err::println);
		}
		return null;
	}

	@PostMapping(
			value = "/changePassword",
			consumes = MediaType.APPLICATION_JSON_VALUE,
			produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public String changePassword(@RequestBody ChangeUserPasswordDto changeUserPasswordDto) {
		try {
			return userService.changePassword(changeUserPasswordDto);
		} catch (Exception e) {
			System.err.println("Error occurred while change password in user " + changeUserPasswordDto.get_Id());
			System.err.println(e.getMessage());
			Arrays.stream(e.getStackTrace()).toList().forEach(System.err::println);
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
			System.err.println("Error occurred while delete user!");
			System.err.println(e.getMessage());
			Arrays.stream(e.getStackTrace()).toList().forEach(System.err::println);
		}
		return null;
	}
}
