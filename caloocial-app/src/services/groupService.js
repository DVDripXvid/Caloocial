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

export function getGroupsByPersonId(id) {
  getGroupsByPerson(id).then(syncronizeGroups);
  return groups;
}

function syncronizeGroups(fetchedGroups) {
  let ids = fetchedGroups.map(g => g.id);
  var query = ids.map(id => `id != ${id}`).join(" AND ");
  let removedGroups = groups.filtered(query);
  removedGroups.length > 0 && realm.delete(removedGroups);
  realm.write(() => {
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
