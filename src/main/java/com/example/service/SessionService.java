package com.example.service;

import com.example.dtos.session.SaveSessionDto;
import com.example.model.Session;
import com.example.model.User;
import com.example.persistence.SessionRepository;
import com.example.persistence.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SessionService {
	private final SessionRepository sessionRepository;

	private final UserRepository userRepository;

	@Autowired
	public SessionService(SessionRepository sessionRepository, UserRepository userRepository) {
		this.sessionRepository = sessionRepository;
		this.userRepository = userRepository;
	}

	public String saveSession(Session session) throws RuntimeException {
		sessionRepository.save(session);

		if (sessionRepository.existsSessionById(session.getId())) {
			return "Save success";
		} else {
			return "Error occurred while save";
		}
	}

	public String saveSession(SaveSessionDto saveSessionDto) throws RuntimeException {
		Session activeSession = new Session(saveSessionDto.getUserName(), saveSessionDto.getToken());

		sessionRepository.save(activeSession);

		if (sessionRepository.existsSessionById(activeSession.getId())) {
			return "Save success";
		} else {
			return "Error occurred while save";
		}
	}

	public String getUserBySession(String token) {
		Session activeSession = sessionRepository.findSessionByCodeToken(token);
		User activeUser = userRepository.findUserByLogin(activeSession.getUserName());
		if (activeUser != null) {
			return activeUser.getLogin();
		} else {
			User user = new User();
			user.setLogin(activeSession.getUserName());
			userRepository.save(user);
			return user.getLogin();
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
