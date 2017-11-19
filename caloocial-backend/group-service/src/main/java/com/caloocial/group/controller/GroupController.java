package com.caloocial.group.controller;

import com.caloocial.group.domain.Group;
import com.caloocial.group.service.GroupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RestController
@RequestMapping("/groups")
public class GroupController {

    private GroupService groupService;

    @Autowired
    public GroupController(GroupService groupService) {
        this.groupService = groupService;
    }

    @RequestMapping(method = RequestMethod.POST)
    public Group createGroup(@RequestParam("personId") long personId, @RequestParam("groupName") String groupName){
        return groupService.create(personId, groupName);
    }

    @RequestMapping(method = RequestMethod.DELETE, value = "/{groupId}")
    public void deleteGroup(@PathVariable long groupId){
        groupService.deleteGroup(groupId);
    }

    @RequestMapping(method = RequestMethod.POST, value = "/{groupId}/members")
    public void addMemberToGroup(@PathVariable long groupId, @RequestParam long personId){
        groupService.addMember(groupId, personId);
    }

    @RequestMapping(method = RequestMethod.PUT, value = "/{groupId}/members/{personId}/promote")
    public void promoteMember(@PathVariable long groupId, @PathVariable long personId){
        groupService.promoteMemberToAdmin(groupId, personId);
    }

    @RequestMapping(method = RequestMethod.PUT, value = "/{groupId}/members/{personId}/demote")
    public void demoteMember(@PathVariable long groupId, @PathVariable long personId){
        groupService.demoteAdminToMember(groupId, personId);
    }

    @RequestMapping(method = RequestMethod.DELETE, value = "/{groupId}/members")
    public void removeMemberFromGroup(@PathVariable long groupId, @RequestParam long personId){
        groupService.removeMember(groupId, personId);
    }

    @RequestMapping(method = RequestMethod.GET, value = "/{groupId}")
    public Group getGroupDetails(@PathVariable long groupId){
        return groupService.getGroupDetails(groupId);
    }

}
