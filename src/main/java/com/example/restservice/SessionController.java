package com.example.restservice;

import com.example.dtos.session.SaveSessionDto;
import com.example.logger.LoggerProvider;
import com.example.service.SessionService;
import org.slf4j.Logger;
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

	private Logger logger;

	@Autowired
	public void SetLogger(LoggerProvider loggerProvider) {
		logger = loggerProvider.getLogger();
	}

	@GetMapping(value = "/getUser/{token}")
	@ResponseBody
	public String getUser(@PathVariable(value = "token") String token) {
		try {
			return sessionService.getUserBySession(token);
		} catch (Exception e) {
			logger.error("Error occurred while get user!", e);
		}
		return null;
	}

	@GetMapping(value = "/logout/{token}")
	@ResponseBody
	public String deleteSession(@PathVariable(value = "token") String token) {
		try {
			return sessionService.logout(token);
		} catch (Exception e) {
			logger.error("Error occurred logout!", e);
		}
		return null;
	}
}
