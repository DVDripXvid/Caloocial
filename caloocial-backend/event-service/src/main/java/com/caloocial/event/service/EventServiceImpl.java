package com.caloocial.event.service;

import com.caloocial.event.domain.Event;
import com.caloocial.event.domain.Group;
import com.caloocial.event.repository.EventRepository;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
public class EventServiceImpl implements EventService {

    private EventRepository repository;

    public EventServiceImpl(EventRepository repository) {
        this.repository = repository;
    }

    @Override
    public Event createEvent(long groupId, Event event) {
        event.setGroup(new Group(groupId));
        return repository.save(event);
    }

    @Override
    public Set<Event> getEventsByGroup(long groupId) {
        return repository.findByGroup_Id(groupId);
    }

    @Override
    public Set<Event> getEventsByPerson(long personId) {
        return repository.findByPersonId(personId);
    }

    @Override
    public void deleteEvent(long eventId) {
        repository.delete(eventId);
    }
}
