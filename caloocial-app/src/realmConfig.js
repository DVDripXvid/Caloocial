import Realm from "realm";

 const groupSchema = {
  name: "Group",
  primaryKey: "id",
  properties: {
    id: "int",
    name: "string"
  }
};

const eventSchema = {
    name: "Event",
    primaryKey : "id",
    properties: {
        id: "int",
        name: "string",
        dateTime: "date",
        group: "Group"
    }
}

export default realm = new Realm({ schema: [groupSchema, eventSchema] });