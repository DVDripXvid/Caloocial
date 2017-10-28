package com.caloocial.auth.repository;

import com.caloocial.auth.domain.User;
import org.springframework.data.neo4j.repository.GraphRepository;

public interface UserRepository extends GraphRepository<User> {

    User findByUsername(String username);

}
