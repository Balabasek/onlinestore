package com.example.dtos.item;

import com.example.dtos.base.BaseDto;

public class DeleteItemDto extends BaseDto {
    private String name;

    private String category;

    public DeleteItemDto(String id, String name, String category) {
        super(id);
        this.name = name;
        this.category = category;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

}
