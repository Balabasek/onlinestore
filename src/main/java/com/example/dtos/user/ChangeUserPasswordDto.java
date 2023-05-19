package com.example.dtos.user;

import com.example.dtos.base.BaseDto;

public class ChangeUserPasswordDto extends BaseDto {
	private String newPassword;

	public ChangeUserPasswordDto(String id, String newPassword) {
		super(id);
		this.newPassword = newPassword;
	}

	public String getNewPassword() {
		return newPassword;
	}

	public void setNewPassword(String newPassword) {
		this.newPassword = newPassword;
	}
}
