package com.caloocial.auth.service;

import com.caloocial.auth.domain.User;
import com.caloocial.auth.event.UserRegistered;
import com.caloocial.auth.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

@Service
public class UserServiceImpl implements UserService {

    private UserRepository repository;
    private static final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
    private ApplicationContext context;

    @Autowired
    public UserServiceImpl(UserRepository repository, ApplicationContext context) {
        this.repository = repository;
        this.context = context;
    }

    @Override
    public User create(User user) {

        User existing = repository.findByUsername(user.getUsername());
        Assert.isNull(existing, "username already exist: " + user.getUsername());

        String hash = encoder.encode(user.getPassword());
        user.setPassword(hash);

        User saved = repository.save(user);

        UserRegistered event = new UserRegistered(this, context.getId());
        event.setUserId(saved.getId());
        event.setUsername(saved.getUsername());
        context.publishEvent(event);

        return saved;
    }
}
