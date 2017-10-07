package com.caloocial.auth.service.security;

import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
public class InMemoryUserDetailsService implements UserDetailsService {

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        if(username.equals("Omar") || username.equals("Oliver")){
            String passwordHash = "$2a$04$nkSGwHSrVUYRLi3mRyO0g.wCOcJm6WdFhVgB7/hP34yAPD0dHGPY6"; //asd12345
            return new User(username, passwordHash, Collections.emptyList());
        }
        throw new UsernameNotFoundException(username);
    }
}
