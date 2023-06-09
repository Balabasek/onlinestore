package com.example.persistence;

import com.example.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends MongoRepository<User, String> {
	User findUserById(String id);

	User findUserByLogin(String login);

	User deleteUsersById(String id);

	Boolean existsUserByLogin(String login);
}
