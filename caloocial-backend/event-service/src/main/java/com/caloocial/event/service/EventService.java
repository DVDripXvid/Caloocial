package com.caloocial.event.service;

import com.caloocial.event.domain.Event;

import java.util.Set;

public interface EventService {

    Event createEvent(long groupId, Event event);
    Set<Event> getEventsByGroup(long groupId);

    Set<Event> getEventsByPerson(long personId);
}
