package com.caloocial.group.service;

import com.caloocial.group.domain.Person;

import java.util.Set;

public interface PersonService {

    Person getByUserId(long userId);
    Set<Person> findByUserNameContains(String query);

}
