import config from "../config";
import axios from "axios";

const host = config.apiGateway + "/usergroups";

export async function getGroupsByPerson(personId) {
  let response = await axios.get(`${host}/persons/${personId}/groups`);
  if (response.status !== 200) {
      throw new Error("Failed to fetch groups");
  }
  return response.data;
}

export async function getGroupDetails(groupId){
  let response = await axios.get(`${host}/groups/${groupId}`);
  if(response.status !== 200){
    throw new Error("Failed to fetch group details");
  }
  return response.data;
}

export async function getPersonByUserId(userId){
  let response = await axios.get(`${host}/persons/byUserId?userId=${userId}`);
  if(response.status !== 200){
    throw new Error("Failed to get person be userId");
  }
  return response.data;
}
