package com.example.restservice;

import com.example.dtos.session.SaveSessionDto;
import com.example.service.SessionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;

@RestController
@RequestMapping("sessionService")
public class SessionController {
	@Autowired
	private SessionService sessionService;

	@PostMapping(
			value = "/create",
			consumes = MediaType.APPLICATION_JSON_VALUE,
			produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public String saveActiveSession(@RequestBody SaveSessionDto SaveSessionDto) {
		try {
			return sessionService.saveSession(SaveSessionDto);
		} catch (Exception e) {
			System.err.println("Error occurred while save session!");
			System.err.println(e.getMessage());
			Arrays.stream(e.getStackTrace()).toList().forEach(System.err::println);
		}
		return null;
	}

	@PostMapping(
			value = "/getUser/{token}",
			consumes = MediaType.APPLICATION_JSON_VALUE,
			produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public String getUser(@PathVariable(value = "token") String token) {
		try {
			return sessionService.getUserBySession(token);
		} catch (Exception e) {
			System.err.println("Error occurred while get user!");
			System.err.println(e.getMessage());
			Arrays.stream(e.getStackTrace()).toList().forEach(System.err::println);
		}
		return null;
	}

	@PostMapping(
			value = "/delete/{token}",
			consumes = MediaType.APPLICATION_JSON_VALUE,
			produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public String deleteSession(@PathVariable(value = "token") String token) {
		try {
			return sessionService.deleteSession(token);
		} catch (Exception e) {
			System.err.println("Error occurred while delete session!");
			System.err.println(e.getMessage());
			Arrays.stream(e.getStackTrace()).toList().forEach(System.err::println);
		}
		return null;
	}
}