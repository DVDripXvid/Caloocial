import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Icon } from "react-native-elements";

export default class Header extends Component {
  static navigationOptions = {
    tabBarLabel: "Members",
    tabBarIcon: ({ tintColor }) => (<Icon name="users" type="feather" color={tintColor} ></Icon>)
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
