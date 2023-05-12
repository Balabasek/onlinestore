package com.example.persistence;

import com.example.model.PromoCode;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PromoCodeRepository extends MongoRepository<PromoCode, String> {
	PromoCode findPromoCodeById(String id);

	PromoCode deletePromoCodeById(String id);
}
