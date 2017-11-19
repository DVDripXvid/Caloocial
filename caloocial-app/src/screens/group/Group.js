import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import { Icon } from "react-native-elements";
import { TabNavigator } from "react-navigation";
import GroupEvents from "./GroupEvents";
import GroupMembers from "./GroupMembers";

import { deleteGroupById } from "../../services/groupService";

const GroupNavigator = TabNavigator(
  {
    GroupEvents: {
      screen: GroupEvents
    },
    GroupMembers: {
      screen: GroupMembers
    }
  },
  {
    tabBarOptions: {
      showIcon: true,
      showLabel: false
    }
  }
);

export default class Group extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerRight: (
      <Icon
        style={{ marginRight: 7 }}
        onPress={() => {
          deleteGroupById(navigation.state.params.id);
          navigation.navigate("Groups");
        }}
        name={"delete"}
      />
    )
  });

  render() {
    return (
      <GroupNavigator
        screenProps={{ id: this.props.navigation.state.params.id }}
      />
    );
  }
}
