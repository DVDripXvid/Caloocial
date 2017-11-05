import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import GroupCard from "../components/GroupCard";
import { Button, Icon } from "react-native-elements";
import Header from "../components/Header";


//@flow
export default class Groups extends Component {
  static navigationOptions = {
    drawerLabel: "Groups",
    drawerIcon: ({ tintColor }) => <Icon name="group" color={tintColor} />
  };

  render() {
    return (
      <View>
        <Header />
        <Button buttonStyle={styles.addButton} icon={{ name: "group-add" }} title="CREATE A NEW GROUP" />
        <GroupCard
          group={{
            members: [{ name: "Oliver" }, { name: "Béla" }, { name: "Károly" }]
          }}
        />
        <GroupCard group={{ members: [{ name: "Oliver" }] }} />
        <GroupCard group={{ members: [{ name: "Oliver" }] }} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  addButton: {
    backgroundColor: "#923"
  }
})
