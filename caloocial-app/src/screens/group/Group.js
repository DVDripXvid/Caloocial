import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import { TabNavigator } from "react-navigation";
import GroupEvents from "./GroupEvents";
import GroupMembers from "./GroupMembers";

const GroupNavigator = TabNavigator({
  GroupEvents: {
    screen: GroupEvents
  },
  GroupMembers: {
    screen: GroupMembers
  }
}, {
  tabBarOptions: {
    showIcon: true
  }
});

export default props => <GroupNavigator/>