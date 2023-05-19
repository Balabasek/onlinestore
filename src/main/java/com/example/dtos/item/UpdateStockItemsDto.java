package com.example.dtos.item;

import com.example.dtos.base.BaseDto;

public class UpdateStockItemsDto extends BaseDto {
	private long count;
	private boolean isBuy;
	private long id;

	public UpdateStockItemsDto(String _id, long count, boolean isBuy, long id) {
		super(_id);
		this.count = count;
		this.isBuy = isBuy;
		this.id = id;
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

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}
}
