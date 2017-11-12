import config from "../config";
import axios from "axios";

const host = config.apiGateway + "/usergroups";

export async function getGroupsByPerson(personId) {
  let response = await axios.get(`${host}/persons/${personId}/groups`);
  if (response.status !== 200) {
      throw Error("Failed to fetch groups");
  }
  return await response.data;
}

export async function getGroupDetails(groupId){
  let response = await axios.get(`${host}/groups/${groupId}`);
  if(response.status !== 200){
    throw Error("Failed to fetch group details");
  }
  return await response.data;
}
