package com.caloocial.group.controller;

import com.caloocial.group.domain.Group;
import com.caloocial.group.domain.Person;
import com.caloocial.group.service.GroupService;
import com.caloocial.group.service.PersonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RestController
@RequestMapping("/persons")
public class PersonController {

    private PersonService personService;
    private GroupService groupService;

    @Autowired
    public PersonController(PersonService personService, GroupService groupService) {
        this.personService = personService;
        this.groupService = groupService;
    }

    @RequestMapping(method = RequestMethod.GET, value = "/byUserId")
    public Person getByUserId(@RequestParam("userId") long userId){
        return personService.getByUserId(userId);
    }

    @RequestMapping(method = RequestMethod.GET, value = "/search/byDisplayName")
    public Set<Person> findPersonByDisplayNameContains(@RequestParam("q") String query){
        return personService.findByUserNameContains(query);
    }

    @RequestMapping(method = RequestMethod.GET, value = "/{personId}/groups")
    public Set<Group> getGroupsByPerson(@PathVariable long personId){
        return groupService.getGroupsByPersonId(personId);
    }
}
