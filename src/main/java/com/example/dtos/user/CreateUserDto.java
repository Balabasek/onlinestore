package com.example.dtos.user;

import com.fasterxml.jackson.annotation.JsonCreator;

public class CreateUserDto {
	private String login;

	@JsonCreator
	public CreateUserDto(String login) {
		this.login = login;
	}

	public String getLogin() {
		return login;
	}

	public void setLogin(String login) {
		this.login = login;
	}
}
