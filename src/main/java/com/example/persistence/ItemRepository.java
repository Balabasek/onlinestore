package com.example.persistence;

import com.example.model.Item;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ItemRepository extends MongoRepository<Item, String> {
    Item deleteItemById(String id);

    Item findItemById(String id);
}
