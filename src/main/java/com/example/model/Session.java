package com.example.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.servlet.http.HttpServlet;
import java.util.UUID;

@Document
public class Session extends HttpServlet {

	@Id
	private String id;

	private String userName;

	private String codeToken;

	public Session() {
		this.id = UUID.randomUUID().toString();
	}

	public Session(String userName, String codeToken) {
		this.codeToken = codeToken;
		this.id = UUID.randomUUID().toString();
		this.userName = userName;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getCodeToken() {
		return codeToken;
	}

	public void setCodeToken(String codeToken) {
		this.codeToken = codeToken;
	}
}
