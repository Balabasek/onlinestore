package com.example.service;

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
		if (!sessionRepository.existsSessionByUserName(session.getUserName())) {
			sessionRepository.save(session);
		} else {
			if (sessionRepository.removeSessionByUserName(session.getUserName()) != null) {
				sessionRepository.save(session);
			} else {
				logger.error("Error occurred while save session. Duplicate session not deleted!");
				return null;
			}
		}
		if (!userService.checkExistUserByLogin(session.getUserName())) {
			userService.createNewUser(session.getUserName());
		}

		if (sessionRepository.existsSessionById(session.getId())) {
			logger.info("Save session success " + session.getUserName());
			return "Save success";
		} else {
			logger.error("Error occurred while save, new session not exist!");
			return null;
		}
	}

	public String getUserBySession(String token) {
		Session activeSession = sessionRepository.findSessionByCodeToken(token);
		if (activeSession == null) {
			logger.warn("Active session doesn't exist");
			return null;
		}
		User activeUser = userService.getUserByLogin(activeSession.getUserName());
		if (activeUser != null) {
			return activeUser.getLogin();
		} else {
			logger.warn("User not authorization");
			return null;
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
