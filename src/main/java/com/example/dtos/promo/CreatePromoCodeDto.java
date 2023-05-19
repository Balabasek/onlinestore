package com.example.dtos.promo;

import com.fasterxml.jackson.annotation.JsonCreator;

public class CreatePromoCodeDto {
	private String name;
	private double discount;
	private long count;

	@JsonCreator
	public CreatePromoCodeDto(String name, double discount, long count) {
		this.name = name;
		this.discount = discount;
		this.count = count;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public double getDiscount() {
		return discount;
	}

	public void setDiscount(double discount) {
		this.discount = discount;
	}

	public long getCount() {
		return count;
	}

	public void setCount(long count) {
		this.count = count;
	}
}
