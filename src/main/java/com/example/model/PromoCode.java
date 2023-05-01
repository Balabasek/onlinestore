package com.example.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Document
public class PromoCode {
    @Id
    private String id;

    private String name;

    private long count;

    private double discount;

    private List<String> usersUsedList;

    public PromoCode(String name, long count, double discount) {
        this.id = UUID.randomUUID().toString();
        this.name = name;
        this.count = count;
        this.discount = discount;
        this.usersUsedList = new ArrayList<>();
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public long getCount() {
        return count;
    }

    public void setCount(long count) {
        this.count = count;
    }

    public double getDiscount() {
        return discount;
    }

    public void setDiscount(double discount) {
        this.discount = discount;
    }

    public List<String> getUsersUsedList() {
        return usersUsedList;
    }

    public void setUsersUsedList(List<String> usersUsedList) {
        this.usersUsedList = usersUsedList;
    }

    public void addUsedUser(User user) {
        usersUsedList.add(user.getId());
    }
}
