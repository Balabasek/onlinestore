package com.example.persistence;

import com.example.model.Session;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SessionRepository extends MongoRepository<Session, String> {
	Session findSessionByCodeToken(String codeToken);

	Session findSessionByUserName(String userName);

	Session removeSessionByUserName(String userName);

	void deleteSessionByCodeToken(String codeToken);

	Boolean existsSessionById(String id);

	Boolean existsSessionByCodeToken(String codeToken);

	Boolean existsSessionByUserName(String userName);
}
