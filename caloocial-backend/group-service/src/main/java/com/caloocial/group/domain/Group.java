package com.caloocial.group.domain;

import org.neo4j.ogm.annotation.GraphId;
import org.neo4j.ogm.annotation.NodeEntity;
import org.neo4j.ogm.annotation.Relationship;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@NodeEntity
public class Group {

    @GraphId
    private Long id;
    private String name;
    @Relationship(type = "ADMINISTRATOR_OF", direction = "INCOMING")
    private Set<Person> administrators;
    @Relationship(type = "MEMBER_OF", direction = "INCOMING")
    private Set<Person> members;

    public void addMember(Person person){
        if(members == null){
            members = new HashSet<>();
        }
        members.add(person);
    }

    public void removeMember(long personId){
        if(members == null || members.isEmpty()){
            return;
        }
        Optional<Person> member =  getMemberById(personId);
        member.ifPresent(members::remove);
    }

    public void promoteToAdmin(Person person){
        if(isAdmin(person)){
            return;
        }
        if(isMember(person)){
            members.remove(person);
        }
        if(administrators == null){
            administrators = new HashSet<>();
        }
        administrators.add(person);
    }

    public void demoteToMember(Person person){
        if(isMember(person)){
            return;
        }
        if(isAdmin(person)){
            administrators.remove(person);
        }
        if(members == null){
            members = new HashSet<>();
        }
        members.add(person);
    }

    public boolean isMember(Person person){
        return members != null && members.contains(person);
    }

    public boolean isAdmin(Person person){
        return administrators != null && administrators.contains(person);
    }

    public Optional<Person> getMemberById(long personId){
        return members.stream().filter(p -> p.getId() == personId).findFirst();
    }

    public Optional<Person> getAdminById(long personId){
        return administrators.stream().filter(p -> p.getId() == personId).findFirst();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<Person> getAdministrators() {
        return administrators;
    }

    public void setAdministrators(Set<Person> administrators) {
        this.administrators = administrators;
    }

    public Set<Person> getMembers() {
        return members;
    }

    public void setMembers(Set<Person> members) {
        this.members = members;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Group group = (Group) o;

        if (id != null ? !id.equals(group.id) : group.id != null) return false;
        return name != null ? name.equals(group.name) : group.name == null;
    }

    @Override
    public int hashCode() {
        int result = id != null ? id.hashCode() : 0;
        result = 31 * result + (name != null ? name.hashCode() : 0);
        return result;
    }
}
