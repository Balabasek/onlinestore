package com.example;

import com.example.logger.LoggerProvider;
import jakarta.annotation.PostConstruct;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class OnlineStoreApplication {
	private final Logger logger;

	@Autowired
	public OnlineStoreApplication(LoggerProvider loggerProvider) {
		this.logger = loggerProvider.getLogger();
	}

	public static void main(String[] args) {
		SpringApplication.run(OnlineStoreApplication.class, args);
	}

	@PostConstruct
	public void startup() {
		logger.info("Server Online store start!");
	}
}