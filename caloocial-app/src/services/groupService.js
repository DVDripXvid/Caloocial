import realm from "../realmConfig";
import { getGroupsByPerson, createGroup, deleteGroup } from "../apis/groupApi";
import { AsyncStorage } from "react-native";
import config from "../config";

let groups = realm.objects("Group");

let syncIntervalId;

var personId;

export function getGroups() {
  AsyncStorage.getItem(config.store.personKey)
    .then(json => JSON.parse(json))
    .then(person => {
      if (!syncIntervalId) {
        syncIntervalId = setInterval(() => getGroups(), 21000);
      }
      getGroupsByPerson(person.id)
        .then(syncronizeGroups)
        .catch(error => {
          clearInterval(syncIntervalId);
          syncIntervalId = null;
          console.warn(error);
        });
    })
    .catch(err => console.error(err));
  return groups;
}

export function createGroupForPerson(personId, groupName) {
  createGroup(personId, groupName)
    .then(group =>
      realm.write(() => {
        realm.create("Group", {
          id: group.id,
          name: group.name
        });
      })
    )
    .catch(err => console.warn(err));
}

export function deleteGroupById(groupId) {
  deleteGroup(groupId)
    .then(() => {
      let deletedGroup = groups.filtered(`id == ${groupId}`)[0];
      realm.write(() => realm.delete(deletedGroup));
    })
    .catch(err => console.warn(err));
}

export function addGroupsListener(cb) {
  groups.addListener(cb);
}

export function removeGroupsListener(cb) {
  groups.removeListener(cb);
}

function syncronizeGroups(fetchedGroups) {
  let ids = fetchedGroups.map(g => g.id);
  var query = ids.map(id => `id != ${id}`).join(" AND ");
  let removedGroups = groups.filtered(query);
  realm.write(() => {
    removedGroups.length > 0 && realm.delete(removedGroups);

    fetchedGroups.forEach(g =>
      realm.create(
        "Group",
        {
          id: g.id,
          name: g.name
        },
        true
      )
    );
  });
}
