package com.caloocial.group.event;

import org.springframework.cloud.bus.event.RemoteApplicationEvent;

public class UserRegistered extends RemoteApplicationEvent {

    private long userId;
    private String username;

    public UserRegistered() {
    }

    public UserRegistered(Object source, String originService) {
        super(source, originService);
    }

    public long getUserId() {
        return userId;
    }

    public void setUserId(long userId) {
        this.userId = userId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
}