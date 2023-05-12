package com.example.dtos.base;

public class BaseDto {
	private String _id;

	public BaseDto(String _id) {
		this._id = _id;
	}

	public String get_Id() {
		return _id;
	}

	public void set_Id(String _id) {
		this._id = _id;
	}
}
