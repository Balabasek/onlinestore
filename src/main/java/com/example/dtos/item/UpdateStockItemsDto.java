package com.example.dtos.item;

import com.example.dtos.base.BaseDto;

public class UpdateStockItemsDto extends BaseDto {
    private long count;

    public UpdateStockItemsDto(String id, long count) {
        super(id);
        this.count = count;
    }

    public long getCount() {
        return count;
    }

    public void setCount(long count) {
        this.count = count;
    }
}
