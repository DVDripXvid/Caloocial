package com.caloocial.group.controller;

import com.caloocial.group.domain.Group;
import com.caloocial.group.service.GroupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RestController
public class GroupController {

    private GroupService groupService;

    @Autowired
    public GroupController(GroupService groupService) {
        this.groupService = groupService;
    }

    @RequestMapping(method = RequestMethod.POST, path = "/groups/default")
    public Group createDefaultForUser(@RequestParam("userId") long userId){
        return groupService.createDefaultForUser(userId);
    }

    @RequestMapping(method = RequestMethod.GET, path = "/persons/{personId}/groups")
    public Set<Group> getGroupsByPerson(@PathVariable long personId){
        return groupService.getGroupsByPersonId(personId);
    }

    @RequestMapping(method = RequestMethod.POST, path = "/person/{personId}/groups")
    public Group createGroup(@PathVariable long personId, @RequestParam("groupName") String groupName){
        return groupService.create(personId, groupName);
    }

    @RequestMapping(method = RequestMethod.POST, path = "/groups/{groupId}/members")
    public void addMemberToGroup(@PathVariable long groupId, @RequestParam long personId){
        groupService.addMember(groupId, personId);
    }

    @RequestMapping(method = RequestMethod.DELETE, path = "/groups/{groupId}/members")
    public void removeMemberFromGroup(@PathVariable long groupId, @RequestParam long personId){
        groupService.removeMember(groupId, personId);
    }

}
