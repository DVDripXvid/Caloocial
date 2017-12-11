import config from "../config";
import axios from "axios";

const host = config.apiGateway + "/eventapi";

export async function getEventsByGroup(groupId) {
    let resp = await axios.get(`${host}/groups/${groupId}/events`);
    if(resp.status !== 200){
        throw new Error("Failed to fetch events by person");
    }
    return resp.data;
}

export async function getEventsByPerson(personId) {
    let resp = await axios.get(`${host}/persons/${personId}/events`);
    if(resp.status !== 200){
        throw new Error("Failed to fetch events by person");
    }
    return resp.data;
}

export async function createEventInGroup(groupId, event){
    let resp = await axios.post(`${host}/groups/${groupId}/events`, event);
    if(resp.status !== 200){
        throw new Error("Failed to create event");
    }
    return resp.data;
}

export async function modifyEvent(groupId, eventId, event){
    let resp = await axios.put(`${host}/groups/${groupId}/events/${eventId}`, event);
    if(resp.status !== 200){
        throw new Error("Failed to modify event");
    }
    return resp.data;
}