package com.caloocial.group.controller;

import com.caloocial.group.domain.Person;
import com.caloocial.group.service.PersonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController("/persons")
public class PersonController {

    private PersonService personService;

    @Autowired
    public PersonController(PersonService personService) {
        this.personService = personService;
    }

    @RequestMapping(method = RequestMethod.GET, value = "/byUserId")
    public Person getByUserId(@RequestParam("userId") long userId){
        return personService.getByUserId(userId);
    }

}
