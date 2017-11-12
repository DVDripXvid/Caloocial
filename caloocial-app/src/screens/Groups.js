import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, Icon, List, ListItem } from "react-native-elements";
import Group from "./group/Group";
import { StackNavigator } from "react-navigation";

import { getGroupsByPersonId, addGroupsListener, removeGroupsListener } from "../services/groupService";

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
    let groups = getGroupsByPersonId(8);
    console.log(groups);
    addGroupsListener(this.groupsAreChanged);
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
