package com.example.dtos.promo;

import com.example.dtos.base.BaseDto;
import com.example.model.User;

public class UsePromoCodeDto extends BaseDto {
    private User user;

    public UsePromoCodeDto(String id, User user) {
        super(id);
        this.user = user;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
