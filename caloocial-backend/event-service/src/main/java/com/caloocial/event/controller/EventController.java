package com.caloocial.event.controller;

import com.caloocial.event.domain.Event;
import com.caloocial.event.exception.EventNotFoundException;
import com.caloocial.event.service.EventService;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RestController
public class EventController {

    private EventService eventService;

    public EventController(EventService eventService) {
        this.eventService = eventService;
    }

    @RequestMapping(method = RequestMethod.GET, value = "/groups/{groupId}/events")
    public Set<Event> getEventsByGroup(@PathVariable long groupId) {
        return eventService.getEventsByGroup(groupId);
    }

    @RequestMapping(method = RequestMethod.POST, value = "/groups/{groupId}/events")
    public Event createEvent(@PathVariable long groupId, @RequestBody Event event) {
        return eventService.createEvent(groupId, event);
    }

    @RequestMapping(method = RequestMethod.DELETE, value = "/groups/{groupId}/events/{eventId}")
    public void deleteEvent(@PathVariable long groupId, @PathVariable long eventId) {
        eventService.deleteEvent(eventId);
    }

    @RequestMapping(method = RequestMethod.GET, value = "/persons/{personId}/events")
    public Set<Event> getEventsByPerson(@PathVariable long personId) {
        return eventService.getEventsByPerson(personId);
    }

    @RequestMapping(method = RequestMethod.PUT, value = "/groups/{groupId}/events/{eventId}")
    public Event modifyEvent(@RequestBody Event event, @PathVariable("eventId") Long eventId) throws EventNotFoundException {
        return eventService.modifyEvent(eventId, event);
    }

}
