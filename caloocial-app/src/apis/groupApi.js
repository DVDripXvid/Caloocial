import config from "../config";
import axios from "axios";

const host = config.apiGateway + "/groupapi";

export async function getGroupsByPerson(personId) {
  let response = await axios.get(`${host}/persons/${personId}/groups`);
  if (response.status !== 200) {
    throw new Error("Failed to fetch groups");
  }
  return response.data;
}

export async function getGroupDetails(groupId) {
  let response = await axios.get(`${host}/groups/${groupId}`);
  if (response.status !== 200) {
    throw new Error("Failed to fetch group details");
  }
  return response.data;
}

export async function getPersonByUserId(userId) {
  let response = await axios.get(`${host}/persons/byUserId?userId=${userId}`);
  if (response.status !== 200) {
    throw new Error("Failed to get person be userId");
  }
  return response.data;
}

export async function createGroup(personId, groupName) {
  let response = await axios.post(
    `${host}/groups`,
    {},
    {
      params: {
        personId: personId,
        groupName: groupName
      }
    }
  );
  if (response.status !== 200) {
    throw new Error("Failed to create group");
  }
  return response.data;
}

export async function deleteGroup(groupId) {
  let response = await axios.delete(`${host}/groups/${groupId}`);
  if (response.status !== 200) {
    throw new Error("Failed to delete group with id: " + groupId);
  }
  return response.data;
}

export async function searchPersonByDisplayName(query) {
  let response = await axios.get(
    `${host}/persons/search/byDisplayName?q=${query}`
  );
  if (response.status !== 200) {
    throw new Error("Failed to search persons with query: " + query);
  }
  return response.data;
}

export async function addPersonToGroup(groupId, personId) {
  let response = await axios.post(
    `${host}/groups/${groupId}/members`,
    {},
    {
      params: {
        personId: personId
      }
    }
  );
  if (response.status !== 200) {
    throw new Error("Failed to add person to group");
  }
  return response.data;
}

export async function removePersonFromGroup(groupId, personId) {
  let response = await axios.delete(
    `${host}/groups/${groupId}/members`,
    {
      params: {
        personId: personId
      }
    }
  );
  if (response.status !== 200) {
    throw new Error("Failed to remove person from group");
  }
  return response.data;
}

export async function promotePerson(groupId, personId) {
  let response = await axios.put(`${host}/groups/${groupId}/members/${personId}/promote`);
  if (response.status !== 200) {
    throw new Error(`Failed to promote person (${personId}) in group (${groupId})`);
  }
  return response.data;
}

export async function demotePerson(groupId, personId) {
  let response = await axios.put(`${host}/groups/${groupId}/members/${personId}/demote`);
  if (response.status !== 200) {
    throw new Error(`Failed to demote person (${personId}) in group (${groupId})`);
  }
  return response.data;
}