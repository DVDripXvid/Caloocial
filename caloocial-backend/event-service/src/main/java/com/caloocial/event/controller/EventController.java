package com.caloocial.event.controller;

import com.caloocial.event.domain.Event;
import com.caloocial.event.service.EventService;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RestController
@RequestMapping("/groups")
public class EventController {

    private EventService eventService;

    public EventController(EventService eventService) {
        this.eventService = eventService;
    }

    @RequestMapping(method = RequestMethod.GET, value = "/{groupId}/events")
    public Set<Event> getEventsByGroup(@PathVariable long groupId){
        return eventService.getEventsByGroup(groupId);
    }

    @RequestMapping(method = RequestMethod.POST, value = "/{groupId}/events")
    public Event createEvent(@PathVariable long groupId, @RequestBody Event event){
        return eventService.createEvent(groupId, event);
    }

}
