package com.example.restservice;

import com.example.dtos.promo.CreatePromoCodeDto;
import com.example.dtos.promo.DeletePromoCodeDto;
import com.example.dtos.promo.UsePromoCodeDto;
import com.example.model.PromoCode;
import com.example.service.PromoCodeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;

@RestController
@RequestMapping("promoCodeService")
public class PromoCodeController {
    @Autowired
    private PromoCodeService promoCodeService;

    @PostMapping(
            value = "/create",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public PromoCode createNewPromoCode(@RequestBody CreatePromoCodeDto createPromoCodeDto) {
        try {
            return promoCodeService.createNewPromoCode(createPromoCodeDto);
        } catch (Exception e) {
            System.err.println("Error occurred while create new promo code!");
            System.err.println(e.getMessage());
            Arrays.stream(e.getStackTrace()).toList().forEach(System.err::println);
        }
        return null;
    }

    @PostMapping(
            value = "/use",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public String usePromoCode(@RequestBody UsePromoCodeDto usePromoCodeDto) {
        try {
            return promoCodeService.usePromoCode(usePromoCodeDto);
        } catch (Exception e) {
            System.err.println("Error occurred while use promo code " + usePromoCodeDto.get_Id());
            System.err.println(e.getMessage());
            Arrays.stream(e.getStackTrace()).toList().forEach(System.err::println);
        }
        return null;
    }

    @PostMapping(
            value = "/delete",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public PromoCode deletePromoCode(@RequestBody DeletePromoCodeDto deletePromoCodeDto) {
        try {
            return promoCodeService.deletePromoCode(deletePromoCodeDto);
        } catch (Exception e) {
            System.err.println("Error occurred while delete promo code!");
            System.err.println(e.getMessage());
            Arrays.stream(e.getStackTrace()).toList().forEach(System.err::println);
        }
        return null;
    }
}
