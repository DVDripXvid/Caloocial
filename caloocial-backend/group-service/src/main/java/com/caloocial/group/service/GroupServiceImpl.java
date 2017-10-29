package com.caloocial.group.service;

import com.caloocial.group.domain.Group;
import com.caloocial.group.domain.Person;
import com.caloocial.group.repository.GroupRepository;
import com.caloocial.group.repository.PersonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import java.util.Optional;
import java.util.Set;

@Service
public class GroupServiceImpl implements GroupService {

    private GroupRepository groupRepository;
    private PersonRepository personRepository;
    private static final String DEFAULT_GROUP_NAME = "DEFAULT";
    private static final String UNNAMED_GROUP_NAME = "Unnamed";

    @Autowired
    public GroupServiceImpl(GroupRepository groupRepository, PersonRepository personRepository) {
        this.groupRepository = groupRepository;
        this.personRepository = personRepository;
    }

    @Override
    public Group createDefaultForUser(long userId) {
        Group existing = groupRepository.findByNameAndAdministratorUserId(userId, DEFAULT_GROUP_NAME);
        Assert.isNull(existing, "Default group already exists for user: " + userId);

        Group group = new Group();
        group.setName(DEFAULT_GROUP_NAME);

        Person person = new Person();
        person.setUserId(userId);
        group.promoteToAdmin(person);

        groupRepository.save(group);
        return group;
    }

    @Override
    public Group create(long personId, String name) {
        Person person = personRepository.findById(personId);
        Assert.notNull(person, "Person not found with id: " + personId);

        if(name == null || name.isEmpty()){
            name = UNNAMED_GROUP_NAME;
        }
        Group existing = groupRepository.findByNameAndAdministratorPersonId(personId, name);
        Assert.isNull(existing, name + " group already exists for person: " + personId);

        Group group = new Group();
        group.setName(name);
        group.promoteToAdmin(person);

        Group saved = groupRepository.save(group);
        return saved;
    }

    @Override
    public void addMember(long groupId, long personId) {
        Group group = getGroupById(groupId);

        Person person = personRepository.findById(personId);
        assertNotNull(person, groupId);

        group.addMember(person);
        groupRepository.save(group);
    }

    @Override
    public void removeMember(long groupId, long personId) {
        Group group = getGroupById(groupId);

        group.removeMember(groupId);

        groupRepository.save(group);
    }

    @Override
    public void promoteMemberToAdmin(long groupId, long personId) {
        Group group = getGroupById(groupId);

        Optional<Person> member = group.getMemberById(personId);

        member.ifPresent(group::promoteToAdmin);
    }

    @Override
    public void demoteAdminToMember(long groupId, long personId) {
        Group group = getGroupById(groupId);

        if(group.getAdministrators().size() == 1){
            return;
        }

        Optional<Person> admin = group.getAdminById(personId);
        admin.ifPresent(group::demoteToMember);
    }


    @Override
    public Set<Group> getGroupsByPersonId(long personId) {
        return groupRepository.findByPersonId(personId);
    }

    private Group getGroupById(long id){
        Group group = groupRepository.findById(id);
        assertNotNull(group, id);
        return group;
    }

    private void assertNotNull(Object entity, long id){
        Assert.notNull(entity, entity.getClass().getSimpleName() + " not found with id: " + id);
    }

}
