package com.example.dtos.basket;

public class ReturnItemBasketDto {

	private long id;

	private double price;

	private long count;

	private double total;

	private long stock;

	public ReturnItemBasketDto() {
	}

	public ReturnItemBasketDto(long id, double price, long count, double total, long stock) {
		this.id = id;
		this.price = price;
		this.count = count;
		this.total = total;
		this.stock = stock;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public double getPrice() {
		return price;
	}

	public void setPrice(double price) {
		this.price = price;
	}

	public long getCount() {
		return count;
	}

	public void setCount(long count) {
		this.count = count;
	}

	public double getTotal() {
		return total;
	}

	public void setTotal(double total) {
		this.total = total;
	}

	public long getStock() {
		return stock;
	}

	public void setStock(long stock) {
		this.stock = stock;
	}
}
