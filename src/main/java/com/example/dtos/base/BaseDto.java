package com.example.dtos.base;

public class BaseDto {
    private String id;

    public BaseDto(String id) {
        this.id = id;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }
}
