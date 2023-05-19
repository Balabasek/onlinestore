package com.example.dtos.session;

import com.fasterxml.jackson.annotation.JsonCreator;

public class SaveSessionDto {
	private String token;

	private String userName;

	@JsonCreator
	public SaveSessionDto(String token, String userName) {
		this.token = token;
		this.userName = userName;
	}

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}
}
