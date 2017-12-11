import realm from "../realmConfig";
import * as api from "../apis/eventApi";
import { AsyncStorage } from "react-native";
import config from "../config";

let events = realm.objects("Event").sorted("dateTime");

let syncIntervalId;

export function getEvents() {
  AsyncStorage.getItem(config.store.personKey)
    .then(json => JSON.parse(json))
    .then(person => {
      if (!syncIntervalId) {
        syncIntervalId = setInterval(() => getEvents(), 21000);
      }
      api.getEventsByPerson(person.id)
        .then(syncronizeEvents)
        .catch(error => {
          clearInterval(syncIntervalId);
          syncIntervalId = null;
          console.warn(error);
        });
    })
    .catch(err => console.error(error));
  return events;
}

export function getEventsByGroupId(groupId) {
  return events.filtered(`group.id == ${groupId}`);
}

export function createEvent(groupId, event){
  let prom = api.createEventInGroup(groupId, event);
  prom.then(() => getEvents());
  return prom;
}

export function deleteEvent(groupId, eventId){
  let prom = api.deleteEvent(groupId, eventId);
  prom.then(() => getEvents());
  return prom;
}

export function modifyEvent(groupId, eventId, event){
  let prom = api.modifyEvent(groupId, eventId, event);
  prom.then(() => getEvents());
  return prom;
}

export function addEventsChangeListener(listener) {
  events.addListener(listener);
}

export function removeEventsChangeListener(listener) {
  events.removeListener(listener);
}

function syncronizeEvents(fetchedEvents) {
  let ids = fetchedEvents.map(e => e.id);
  let removedEvents = [];
  let query = ids.map(id => `id != ${id}`).join(" AND ");
  removedEvents = ids.length > 0 ? events.filtered(query) : events;
  realm.write(() => {
    removedEvents.length > 0 && realm.delete(removedEvents);

    fetchedEvents.forEach(e =>
      realm.create(
        "Event",
        {
          id: e.id,
          name: e.name,
          dateTime: new Date(e.dateTime),
          group: e.group
        },
        true
      )
    );
  });
}
