package com.example.logger;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

@Component
public class LoggerProvider {

	private static final Logger logger = LoggerFactory.getLogger(LoggerProvider.class);

	public Logger getLogger() {
		return logger;
	}
}