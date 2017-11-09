

const host = "http://localhost:4000/persongroups";

export async function getGroupsByPerson(personId){
    return  Promise.resolve([
        {id: 1, name: "Group1"},
        {id: 2, name: "Group2"}
    ]);
    /*try {
        return await fetch(`${host}/persons/${personId}/groups`).json();   
    } catch (error) {
        console.error("failed to fetch groups by personid: " + personId)
        console.error(error);
    }*/
}