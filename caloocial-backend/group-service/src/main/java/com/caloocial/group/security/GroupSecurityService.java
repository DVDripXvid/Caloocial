package com.caloocial.group.security;

import com.caloocial.group.domain.Group;
import com.caloocial.group.domain.Person;
import com.caloocial.group.repository.PersonRepository;
import com.caloocial.group.service.GroupService;
import com.caloocial.group.service.PersonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

@Component("groupSecurity")
public class GroupSecurityService {

    private PersonRepository personRepository;
    private GroupService groupService;

    @Autowired
    public GroupSecurityService(PersonRepository personRepository, GroupService groupService) {
        this.personRepository = personRepository;
        this.groupService = groupService;
    }

    public boolean isAdminInGroup(Authentication auth, long groupId) {
        Person person = personRepository.findByUserName((String)auth.getPrincipal());
        if (person == null) {
            return false;
        }
        Group group = groupService.getGroupDetails(groupId);
        if(group == null){
            return false;
        }
        return group.isAdmin(person);
    }
}
