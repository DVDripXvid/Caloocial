import React, { Component } from "react";
import { StyleSheet, Text, View, AsyncStorage } from "react-native";
import { Button, Icon, List, ListItem } from "react-native-elements";
import Group from "./group/Group";
import { StackNavigator } from "react-navigation";

import config from "../config";

import {
  getGroupsByPersonId,
  addGroupsListener,
  removeGroupsListener
} from "../services/groupService";

import { getEventsByPersonId, getEventsByGroupId } from "../services/eventService";

class Groups extends Component {
  static navigationOptions = {
    //Tab navigator opts
    title: "Groups",
    header: null,
    //Draw navigator opts
    drawerLabel: "Groups",
    drawerIcon: ({ tintColor }) => <Icon name="group" color={tintColor} />
  };

  constructor(props) {
    super(props);
    this.state = {
      groups: []
    };
    this.groupsAreChanged = this.groupsAreChanged.bind(this);
  }

  componentDidMount() {
    addGroupsListener(this.groupsAreChanged);
    AsyncStorage.getItem(config.store.personKey)
      .then(json => {
        if (!json) throw "person is null";
        return JSON.parse(json);
      })
      .then(person => {
        let groups = getGroupsByPersonId(person.id);
        //TODO: remove unused call but ensure that somewhere it has been called every app start
        getEventsByPersonId(person.id);
      })
      .catch(e => console.error(e));
  }

  componentWillUnmount() {
    removeGroupsListener(this.groupsAreChanged);
  }

  groupsAreChanged(groups) {
    this.setState({ groups });
  }

  render() {
    return (
      <View style={styles.container}>
        <Button
          buttonStyle={styles.addButton}
          icon={{ name: "group-add" }}
          title="CREATE A NEW GROUP"
        />
        <List>
          {this.state.groups.map(g => (
            <ListItem
              key={g.id}
              title={g.name}
              subtitle={"Next event: 2017.12.21"}
              onPress={() =>
                this.props.navigation.navigate("Group", {
                  id: g.id,
                  name: g.name
                })}
            />
          ))}
        </List>
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

const GroupsNavigator = StackNavigator(
  {
    Groups: {
      screen: Groups
    },
    Group: {
      path: "groups/:id",
      screen: Group,
      navigationOptions: ({ navigation }) => ({
        title: navigation.state.params.name
      })
    }
  },
  {
    headerMode: "screen"
  }
);

export default GroupsNavigator;
