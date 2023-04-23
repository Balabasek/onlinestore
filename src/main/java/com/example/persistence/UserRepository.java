package com.example.persistence;

import com.example.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends MongoRepository<User, String> {
    Boolean existsDistinctByPassword(String password);

    User findUserById(String id);

    User deleteUsersById(String id);
}
