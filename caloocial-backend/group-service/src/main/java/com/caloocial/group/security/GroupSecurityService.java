package com.caloocial.group.security;

import com.caloocial.group.domain.Group;
import com.caloocial.group.domain.Person;
import com.caloocial.group.service.GroupService;
import com.caloocial.group.service.PersonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.util.Collection;

@Component("groupSecurity")
public class GroupSecurityService {

    private PersonService personService;
    private GroupService groupService;

    @Autowired
    public GroupSecurityService(PersonService personService, GroupService groupService) {
        this.personService = personService;
        this.groupService = groupService;
    }

    public boolean isAdminInGroup(Authentication auth, long groupId){
        if(auth.getPrincipal() instanceof User){
            User principal = (User) auth.getPrincipal();
            Person person = personService.getByUserId(principal.getId());
            Group group = groupService.getGroupDetails(groupId);
            return group.isAdmin(person);
        }
        return true;
    }

    private class User implements UserDetails {

        private Long Id;
        private String username;
        private String password;

        @Override
        public Collection<? extends GrantedAuthority> getAuthorities() {
            return null;
        }

        @Override
        public String getPassword() {
            return password;
        }

        @Override
        public String getUsername() {
            return username;
        }

        @Override
        public boolean isAccountNonExpired() {
            return true;
        }

        @Override
        public boolean isAccountNonLocked() {
            return true;
        }

        @Override
        public boolean isCredentialsNonExpired() {
            return true;
        }

        @Override
        public boolean isEnabled() {
            return true;
        }

        public void setUsername(String username) {
            this.username = username;
        }

        public void setPassword(String password) {
            this.password = password;
        }

        public Long getId() {
            return Id;
        }

        public void setId(Long id) {
            Id = id;
        }
    }

}
