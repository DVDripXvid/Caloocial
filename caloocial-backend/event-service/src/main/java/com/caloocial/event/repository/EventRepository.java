package com.caloocial.event.repository;

import com.caloocial.event.domain.Event;
import org.springframework.data.neo4j.annotation.Query;
import org.springframework.data.neo4j.repository.GraphRepository;

import java.util.Set;

public interface EventRepository extends GraphRepository<Event> {

    Set<Event> findByGroup_Id(long group_id);

    @Query("MATCH (p:Person)-[:MEMBER_OF|:ADMINISTRATOR_OF]->(g:Group)<-[r:BELONGS_TO]-(e:Event) WHERE ID(p)={0} RETURN r,e,g")
    Set<Event> findByPersonId(long personId);

}
