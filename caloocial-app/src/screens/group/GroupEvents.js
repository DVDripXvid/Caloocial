import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Icon } from "react-native-elements";

export default class GroupEvents extends Component {
  static navigationOptions = {
    tabBarLabel: "Events",
    tabBarIcon: ({ tintColor }) => (<Icon name="event" color={tintColor} ></Icon>)
  };

  render() {
    return (
      <View>
        <Text>Not implemented yet :(</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({});
