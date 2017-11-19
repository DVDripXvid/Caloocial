import realm from "../realmConfig";
import { getEventsByGroup, getEventsByPerson } from "../apis/eventApi";

let events = realm.objects("Event").sorted("dateTime");

let syncIntervalId;

export function getEventsByPersonId(id){
    if(!syncIntervalId){
        syncIntervalId = setInterval(() => getEventsByPersonId(id), 21000);
    }
    getEventsByPerson(id).then(syncronizeEvents).catch(error => {
        clearInterval(syncIntervalId);
        syncIntervalId = null;
        console.warn(error);
    });
    return events;
}

export function getEventsByGroupId(groupId){
    return events.filtered(`group.id == ${groupId}`);
}

export function addEventsChangeListener(listener){
    events.addListener(listener);
}

export function removeEventsChangeListener(listener) {
    events.removeListener(listener);
}

function syncronizeEvents(fetchedEvents) {
    let ids = fetchedEvents.map(e => e.id);
    var query = ids.map(id => `id != ${id}`).join(" AND ");
    let removedEvents = events.filtered(query);
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