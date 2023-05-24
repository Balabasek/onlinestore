package com.example.persistence;

import com.example.model.Basket;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BasketRepository extends MongoRepository<Basket, String> {
	Basket findBasketById(String id);

	Basket deleteBasketById(String id);

	Boolean existsBasketById(String id);
}
