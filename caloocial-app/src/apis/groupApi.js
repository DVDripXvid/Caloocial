import config from "../config";

const host = config.apiGateway + "/usergroups";

export async function getGroupsByPerson(personId) {
  let response = await fetch(`${host}/persons/${personId}/groups`);
  if (response.status !== 200) {
      throw Error("Failed to fetch groups");
  }
  return await response.json();
}

export async function getGroupDetails(groupId){
  let response = await fetch(`${host}/groups/${groupId}`);
  console.log(response);
  if(response.status !== 200){
    throw Error("Failed to fetch group details");
  }
  return await response.json();
}
