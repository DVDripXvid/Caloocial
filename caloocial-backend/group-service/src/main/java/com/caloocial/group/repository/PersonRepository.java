package com.caloocial.group.repository;

import com.caloocial.group.domain.Person;
import org.springframework.data.neo4j.annotation.Query;
import org.springframework.data.neo4j.repository.GraphRepository;

public interface PersonRepository extends GraphRepository<Person> {

    @Query("MATCH (p:Person) WHERE ID(p)={0} RETURN p")
    Person findById(Long id);

    @Query("MATCH (p:Person{userId: {0}}) RETURN p")
    Person findByUserId(Long userId);
}
