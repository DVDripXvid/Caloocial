package com.caloocial.event.repository;

import com.caloocial.event.domain.Event;
import org.springframework.data.neo4j.repository.GraphRepository;

import java.util.Set;

public interface EventRepository extends GraphRepository<Event> {

    Set<Event> findByGroup_Id(long group_id);

}
