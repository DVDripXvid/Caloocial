package com.caloocial.auth.service;

import com.caloocial.auth.domain.User;
import com.caloocial.auth.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

@Service
public class UserServiceImpl implements UserService {

    private UserRepository repository;
    private static final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();


    @Autowired
    public UserServiceImpl(UserRepository repository) {
        this.repository = repository;
    }

    @Override
    public User create(User user) {

        User existing = repository.findByUsername(user.getUsername());
        Assert.isNull(existing, "username already exist: " + user.getUsername());

        String hash = encoder.encode(user.getPassword());
        user.setPassword(hash);

        User saved = repository.save(user);

        //TODO: somehow connect to a person
        return saved;
    }
}
