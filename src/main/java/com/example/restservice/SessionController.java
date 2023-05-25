package com.example.restservice;

import com.example.dtos.session.SaveSessionDto;
import com.example.service.SessionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;

@RestController
@CrossOrigin
@RequestMapping("sessionService")
public class SessionController {
	@Autowired
	private SessionService sessionService;

	@GetMapping(value = "/getUser/{token}")
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

	@GetMapping(value = "/logout/{token}")
	@ResponseBody
	public String deleteSession(@PathVariable(value = "token") String token) {
		try {
			return sessionService.logout(token);
		} catch (Exception e) {
			System.err.println("Error occurred logout!");
			System.err.println(e.getMessage());
			Arrays.stream(e.getStackTrace()).toList().forEach(System.err::println);
		}
		return null;
	}
}
