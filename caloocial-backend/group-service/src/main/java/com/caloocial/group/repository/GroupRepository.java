package com.caloocial.group.repository;

import com.caloocial.group.domain.Group;
import org.springframework.data.neo4j.annotation.Query;
import org.springframework.data.neo4j.repository.GraphRepository;

import java.util.Set;

public interface GroupRepository extends GraphRepository<Group> {

    @Query("MATCH (g:Group) WHERE ID(g)={0} RETURN g")
    Group findById(long groupId);

    @Query("MATCH (:Person{userId:{0}})-[:ADMINISTRATOR_OF]->(g:Group{name:{1}}) RETURN g")
    Group findByNameAndAdministratorUserId(long userId, String groupName);

    @Query("MATCH (p:Person)-[:ADMINISTRATOR_OF]->(g:Group{name:{1}}) WHERE ID(p)={0} RETURN g")
    Group findByNameAndAdministratorPersonId(long personId, String groupName);

    @Query("MATCH (p:Person)-[:MEMBER_OF|:ADMINISTRATOR_OF]->(g:Group) WHERE ID(p)={0} RETURN g")
    Set<Group> findByPersonId(long personId);

}
