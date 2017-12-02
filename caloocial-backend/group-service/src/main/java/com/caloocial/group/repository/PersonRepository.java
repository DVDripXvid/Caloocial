package com.caloocial.group.repository;

import com.caloocial.group.domain.Person;
import org.springframework.data.neo4j.annotation.Query;
import org.springframework.data.neo4j.repository.GraphRepository;

import java.util.Set;

public interface PersonRepository extends GraphRepository<Person> {

    @Query("MATCH (p:Person) WHERE ID(p)={0} RETURN p")
    Person findById(Long id);

    @Query("MATCH (p:Person{userId: {0}}) RETURN p")
    Person findByUserId(Long userId);

    @Query("MATCH (p:Person) WHERE p.displayName CONTAINS {0} RETURN p")
    Set<Person> findByDisplayNameContains(String query);

    @Query("MATCH (p:Person)-[:MEMBER_OF]->(g:Group) WHERE ID(g)={0} RETURN p")
    Set<Person> findGroupMembers(long groupId);

    @Query("MATCH (p:Person)-[:ADMINISTRATOR_OF]->(g:Group) WHERE ID(g)={0} RETURN p")
    Set<Person> findGroupAdministrators(long groupId);
}
