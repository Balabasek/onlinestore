package com.example.service;

import com.example.dtos.promo.CreatePromoCodeDto;
import com.example.dtos.promo.DeletePromoCodeDto;
import com.example.dtos.promo.UsePromoCodeDto;
import com.example.model.PromoCode;
import com.example.persistence.PromoCodeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PromoCodeService {
    private final PromoCodeRepository promoCodeRepository;

    @Autowired
    public PromoCodeService(PromoCodeRepository promoCodeRepository) {
        this.promoCodeRepository = promoCodeRepository;
    }

    public PromoCode createNewPromoCode(CreatePromoCodeDto createPromoCodeDto) {
        PromoCode promoCode = new PromoCode(createPromoCodeDto.getName(), createPromoCodeDto.getCount(), createPromoCodeDto.getDiscount());
        promoCodeRepository.save(promoCode);

        return promoCode;
    }

    public String usePromoCode(UsePromoCodeDto usePromoCodeDto) {
        PromoCode promoCode = promoCodeRepository.findPromoCodeById(usePromoCodeDto.getId());

        for (String userId : promoCode.getUsersUsedList()) {
            if (userId.equals(usePromoCodeDto.getUser().getId())) {
                return "Already used";
            }
        }
        return "Promo can be used";
    }

    public PromoCode deletePromoCode(DeletePromoCodeDto deletePromoCodeDto) {
        return promoCodeRepository.deletePromoCodeById(deletePromoCodeDto.getId());
    }
}
