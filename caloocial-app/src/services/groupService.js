import Realm from "realm";
import { getGroupsByPerson } from "../apis/groupApi";

const groupSchema = {
  name: "Group",
  primaryKey: "id",
  properties: {
    id: "int",
    name: "string"
  }
};

const realm = new Realm({ schema: [groupSchema] });

let groups = realm.objects("Group");

let syncIntervalId;

export function getGroupsByPersonId(id) {
  if(!syncIntervalId){
    syncIntervalId = setInterval(() => getGroupsByPersonId(id), 10000);
  }
  getGroupsByPerson(id).then(syncronizeGroups).catch(error => {
    clearInterval(syncIntervalId);
    syncIntervalId = null;
  });
  return groups;
}

export function addGroupsListener(cb){
  groups.addListener(cb);
}

export function removeGroupsListener(cb){
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
1;
