package com.caloocial.event.service;

import com.caloocial.event.domain.Event;
import com.caloocial.event.exception.EventNotFoundException;

import java.util.Set;

public interface EventService {

    Event createEvent(long groupId, Event event);
    Set<Event> getEventsByGroup(long groupId);

    Set<Event> getEventsByPerson(long personId);

    void deleteEvent(long eventId);

    Event modifyEvent(long eventId, Event event) throws EventNotFoundException;
}
