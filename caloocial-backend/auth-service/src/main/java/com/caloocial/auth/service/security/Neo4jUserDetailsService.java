package com.caloocial.auth.service.security;

import com.caloocial.auth.domain.User;
import com.caloocial.auth.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class Neo4jUserDetailsService implements UserDetailsService {

    private final UserRepository repository;

    @Autowired
    public Neo4jUserDetailsService(UserRepository repository) {
        this.repository = repository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = repository.findByUsername(username);

        if(user == null){
            throw new UsernameNotFoundException(username);
        }

        return user;
    }

}
