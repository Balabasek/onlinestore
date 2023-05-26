package com.example.service;

import com.example.dtos.promo.CreatePromoCodeDto;
import com.example.dtos.promo.DeletePromoCodeDto;
import com.example.dtos.promo.UsePromoCodeDto;
import com.example.logger.LoggerProvider;
import com.example.model.PromoCode;
import com.example.persistence.PromoCodeRepository;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class PromoCodeService {
	private final PromoCodeRepository promoCodeRepository;

	private final Logger logger;

	@Autowired
	public PromoCodeService(PromoCodeRepository promoCodeRepository, LoggerProvider loggerProvider) {
		this.promoCodeRepository = promoCodeRepository;
		this.logger = loggerProvider.getLogger();
	}

	public PromoCode createNewPromoCode(CreatePromoCodeDto createPromoCodeDto) {
		PromoCode promoCode = new PromoCode(createPromoCodeDto.getName(), createPromoCodeDto.getCount(), createPromoCodeDto.getDiscount());
		promoCodeRepository.save(promoCode);

		return promoCode;
	}

	public String usePromoCode(UsePromoCodeDto usePromoCodeDto) {
		PromoCode promoCode = promoCodeRepository.findPromoCodeById(usePromoCodeDto.get_Id());

		for (String userId : promoCode.getUsersUsedList()) {
			if (userId.equals(usePromoCodeDto.getUser().getId())) {
				return "Already used";
			}
		}
		return "Promo can be used";
	}

	public PromoCode deletePromoCode(DeletePromoCodeDto deletePromoCodeDto) {
		return promoCodeRepository.deletePromoCodeById(deletePromoCodeDto.get_Id());
	}
}
