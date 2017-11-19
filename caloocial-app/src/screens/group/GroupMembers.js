import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Icon, List, ListItem, Button } from "react-native-elements";
import {
  getGroupDetails,
  addPersonToGroup,
  removePersonFromGroup,
  promotePerson,
  demotePerson
} from "../../apis/groupApi";
import SearchPerson from "./SearchPerson";

export default class GroupMembers extends Component {
  static navigationOptions = {
    tabBarLabel: "Members",
    tabBarIcon: ({ tintColor }) => (
      <Icon name="users" type="feather" color={tintColor} />
    )
  };

  constructor(props) {
    super(props);
    this.state = {
      groupId: props.screenProps.id,
      members: [],
      isSearchPersonVisible: false
    };
  }

  componentDidMount() {
    this.reFetchData();
  }

  reFetchData() {
    getGroupDetails(this.state.groupId)
      .then(data => this.updateGroupData(data))
      .catch(error => console.warn(error));
  }

  updateGroupData(group) {
    group.members = group.members || [];
    var members = group.administrators
      .map(admin => {
        admin.isAdmin = true;
        admin.iconName = "account-star";
        return admin;
      })
      .concat(
        group.members.map(member => {
          member.isAdmin = false;
          member.iconName = "account-outline";
          return member;
        })
      );
    this.setState({ members });
  }

  onSearchPersonEnded(person) {
    if (person) {
      addPersonToGroup(this.state.groupId, person.id)
        .then(() => this.reFetchData())
        .catch(e => console.error(e));
    }
    this.setState({ isSearchPersonVisible: false });
  }

  deletePerson(person) {
    removePersonFromGroup(this.state.groupId, person.id)
      .then(() => this.reFetchData())
      .catch(e => console.error(e));
  }

  changePersonMembership(p) {
    let funcToCall = p.isAdmin ? demotePerson : promotePerson;
    funcToCall(this.state.groupId, p.id)
      .then(() => this.reFetchData())
      .catch(e => console.error(e));
  }

  render() {
    return (
      <View style={styles.container}>
        <Button
          buttonStyle={styles.addButton}
          icon={{ name: "person-add" }}
          onPress={() => this.setState({ isSearchPersonVisible: true })}
          title="ADD PERSON TO THIS GROUP"
        />
        <List>
          {this.state.members.map((m, i) => (
            <ListItem
              key={i}
              title={m.displayName}
              leftIcon={{ name: m.iconName, type: "material-community" }}
              rightIcon={{ name: "trash", type: "evilicon" }}
              onPressRightIcon={() => this.deletePerson(m)}
              onLongPress={() => this.changePersonMembership(m)}
              subtitle={m.isAdmin ? "Hold to demote" : "Hold to promote"}
            />
          ))}
        </List>
        <SearchPerson
          onSelect={p => this.onSearchPersonEnded(p)}
          visible={this.state.isSearchPersonVisible}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  addButton: {
    backgroundColor: "#923"
  },
  container: {
    marginTop: 21
  }
});
