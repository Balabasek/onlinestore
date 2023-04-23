package com.example.dtos.user;


import com.example.dtos.base.BaseDto;

public class CreateUserDto extends BaseDto {
    private String firstName;
    private String middleName;
    private String secondName;
    private String login;
    private String password;

    public CreateUserDto(String id, String firstName, String middleName, String secondName, String login, String password) {
        super(id);
        this.firstName = firstName;
        this.middleName = middleName;
        this.secondName = secondName;
        this.login = login;
        this.password = password;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getMiddleName() {
        return middleName;
    }

    public void setMiddleName(String middleName) {
        this.middleName = middleName;
    }

    public String getSecondName() {
        return secondName;
    }

    public void setSecondName(String secondName) {
        this.secondName = secondName;
    }

    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
