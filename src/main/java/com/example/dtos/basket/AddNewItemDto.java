package com.example.dtos.basket;

import com.fasterxml.jackson.annotation.JsonCreator;

public class AddNewItemDto {
	private long id;

	@JsonCreator
	public AddNewItemDto(long id) {
		this.id = id;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}
}
