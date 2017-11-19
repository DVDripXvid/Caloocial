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
  getGroupsByPersonId,
  addGroupsListener,
  removeGroupsListener,
  createGroupForPerson
} from "../services/groupService";

import {
  getEventsByPersonId,
  getEventsByGroupId
} from "../services/eventService";

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
      groups: [],
      newGroupName: "",
      personId: ""
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
        getGroupsByPersonId(person.id);
        getEventsByPersonId(person.id);
        this.setState({ personId: person.id });
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
                createGroupForPerson(
                  this.state.personId,
                  this.state.newGroupName
                );
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
