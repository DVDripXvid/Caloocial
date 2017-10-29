package com.caloocial.group.service;

import com.caloocial.group.domain.Person;
import com.caloocial.group.repository.PersonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
public class PersonServiceImpl implements PersonService {

    private PersonRepository personRepository;

    @Autowired
    public PersonServiceImpl(PersonRepository personRepository) {
        this.personRepository = personRepository;
    }

    @Override
    public Person getByUserId(long userId) {
        return personRepository.findByUserId(userId);
    }

    @Override
    public Set<Person> findByUserNameContains(String query) {
        return personRepository.findByDisplayNameRegex(query);
    }
}
