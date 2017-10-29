package com.caloocial.group.listener;

import com.caloocial.group.event.UserRegistered;
import com.caloocial.group.service.GroupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.stereotype.Component;

@Component
public class UserRegisteredListener implements ApplicationListener<UserRegistered> {

    private GroupService groupService;

    @Autowired
    public UserRegisteredListener(GroupService groupService) {
        this.groupService = groupService;
    }

    @Override
    public void onApplicationEvent(UserRegistered userRegistered) {
        groupService.createDefaultForUser(userRegistered.getUserId(), userRegistered.getUsername());
    }

}
