package com.example.service;

import com.example.dtos.session.SaveSessionDto;
import com.example.logger.LoggerProvider;
import com.example.model.Session;
import com.example.model.User;
import com.example.persistence.SessionRepository;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SessionService {
	private final SessionRepository sessionRepository;

	private final UserService userService;

	private final Logger logger;

	@Autowired
	public SessionService(SessionRepository sessionRepository, UserService userService, LoggerProvider loggerProvider) {
		this.sessionRepository = sessionRepository;
		this.userService = userService;
		this.logger = loggerProvider.getLogger();
	}

	public String saveSession(Session session) throws RuntimeException {
		if (sessionRepository.existsSessionByUserName(session.getUserName())) {
			sessionRepository.save(session);
		}
		if (!userService.checkExistUserByLogin(session.getUserName())) {
			userService.createNewUser(session.getUserName());
		}

		if (sessionRepository.existsSessionById(session.getId())) {
			return "Save success";
		} else {
			return "Error occurred while save";
		}
	}

	public String getUserBySession(String token) {
		Session activeSession = sessionRepository.findSessionByCodeToken(token);
		User activeUser = userService.getUserByLogin(activeSession.getUserName());
		if (activeUser != null) {
			return activeUser.getLogin();
		} else {
			return "User not authorization";
		}
	}

	public String logout(String token) throws RuntimeException {
		sessionRepository.deleteSessionByCodeToken(token);

		if (!sessionRepository.existsSessionByCodeToken(token)) {
			return "Delete success";
		} else {
			return "Error occurred while delete";
		}
	}
}
