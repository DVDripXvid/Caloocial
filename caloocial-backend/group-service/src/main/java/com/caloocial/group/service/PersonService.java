package com.caloocial.group.service;

import com.caloocial.group.domain.Person;

public interface PersonService {

    Person getByUserId(long userId);

}
