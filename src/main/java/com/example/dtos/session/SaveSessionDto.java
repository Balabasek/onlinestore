package com.example.dtos.session;

public class SaveSessionDto {
	private String token;

	private String userName;

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
