package com.caloocial.group.controller;

import com.caloocial.group.domain.Group;
import com.caloocial.group.service.GroupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RestController("/groups")
public class GroupController {

    private GroupService groupService;

    @Autowired
    public GroupController(GroupService groupService) {
        this.groupService = groupService;
    }

    @RequestMapping(method = RequestMethod.POST, path = "/default")
    public Group createDefaultForUser(@RequestParam("userId") long userId){
        return groupService.createDefaultForUser(userId);
    }

    @RequestMapping(method = RequestMethod.GET)
    public Set<Group> getGroupsByPerson(@PathVariable long personId){
        return groupService.getGroupsByPersonId(personId);
    }

    @RequestMapping(method = RequestMethod.POST)
    public Group createGroup(@RequestParam("personId") long personId, @RequestParam("groupName") String groupName){
        return groupService.create(personId, groupName);
    }

    @RequestMapping(method = RequestMethod.POST, path = "/{groupId}/members")
    public void addMemberToGroup(@PathVariable long groupId, @RequestParam long personId){
        groupService.addMember(groupId, personId);
    }

    @RequestMapping(method = RequestMethod.DELETE, path = "/{groupId}/members")
    public void removeMemberFromGroup(@PathVariable long groupId, @RequestParam long personId){
        groupService.removeMember(groupId, personId);
    }

}
