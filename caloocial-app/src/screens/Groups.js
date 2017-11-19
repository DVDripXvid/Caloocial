import React, { Component } from "react";
import { StyleSheet, Text, View, AsyncStorage, TextInput } from "react-native";
import { Button, Icon, List, ListItem, FormInput } from "react-native-elements";
import Group from "./group/Group";
import { StackNavigator } from "react-navigation";

import PopupDialog, {
  SlideAnimation,
  DialogTitle,
  DialogButton
} from "react-native-popup-dialog";
import config from "../config";

import {
  getGroups,
  addGroupsListener,
  removeGroupsListener,
  createGroupForPerson
} from "../services/groupService";

import { getEvents, getEventsByGroupId } from "../services/eventService";

class Groups extends Component {
  static navigationOptions = {
    //Stack navigator opts
    header: null,
    //Draw navigator opts
    drawerLabel: "Groups",
    drawerIcon: ({ tintColor }) => <Icon name="group" color={tintColor} />
  };

  constructor(props) {
    super(props);
    this.state = {
      groups: [],
      newGroupName: ""
    };
    this.groupsAreChanged = this.groupsAreChanged.bind(this);
  }

  componentDidMount() {
    addGroupsListener(this.groupsAreChanged);
    getEvents();
    let groups = getGroups();
    this.groupsAreChanged(groups);
  }

  componentWillUnmount() {
    removeGroupsListener(this.groupsAreChanged);
  }

  groupsAreChanged(groups) {
    this.setState({ groups });
  }

  createGroup() {
    AsyncStorage.getItem(config.store.personKey)
      .then(json => JSON.parse(json))
      .then(person => {
        createGroupForPerson(person.id, this.state.newGroupName);
      })
      .catch(e => console.error(e));
  }

  render() {
    return (
      <View style={styles.container}>
        <Button
          buttonStyle={styles.addButton}
          icon={{ name: "group-add" }}
          onPress={() => this.createDialog.show()}
          title="CREATE A NEW GROUP"
        />
        <PopupDialog
          ref={popupDialog => (this.createDialog = popupDialog)}
          dialogTitle={<DialogTitle title="CREATE GROUP" />}
          width={0.8}
          height={0.4}
          actions={[
            <DialogButton
              text="SAVE"
              onPress={() => {
                this.createGroup();
                this.createDialog.dismiss();
              }}
              onShown={() => this.newGroupInput.focus()}
              key="save-button"
            />
          ]}
        >
          <View style={styles.popupContent}>
            <TextInput
              //style={{ marginLeft: 21, marginRight: 21 }}
              ref={ref => (this.newGroupInput = ref)}
              placeholder="Please enter group name"
              onChangeText={newGroupName => this.setState({ newGroupName })}
            >
              {this.state.newGroupName}
            </TextInput>
          </View>
        </PopupDialog>
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
  },
  popupContent: {
    alignItems: "stretch",
    justifyContent: "center"
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
