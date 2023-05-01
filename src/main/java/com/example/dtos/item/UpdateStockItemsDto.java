package com.example.dtos.item;

import com.example.dtos.base.BaseDto;

public class UpdateStockItemsDto extends BaseDto {
    private long count;
    private boolean isBuy;

    public UpdateStockItemsDto(String id, long count, boolean isBuy) {
        super(id);
        this.count = count;
        this.isBuy = isBuy;
    }

    public long getCount() {
        return count;
    }

    public void setCount(long count) {
        this.count = count;
    }

    public boolean isBuy() {
        return isBuy;
    }

    public void setBuy(boolean buy) {
        isBuy = buy;
    }
}
