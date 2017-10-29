package com.caloocial.group.service;

import com.caloocial.group.domain.Group;

import java.util.Set;

public interface GroupService {

    Group createDefaultForUser(long userId);
    Group create(long personId, String name);
    void addMember(long groupId, long personId);
    void removeMember(long groupId, long personId);
    void promoteMemberToAdmin(long groupId, long personId);
    void demoteAdminToMember(long groupId, long personId);

    Set<Group> getGroupsByPersonId(long personId);
}
