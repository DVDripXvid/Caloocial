import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, Icon, List, ListItem } from "react-native-elements";
import Group from "./group/Group";
import { StackNavigator } from "react-navigation";

import { getGroupsByPersonId } from "../services/groupService";

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
  }

  componentDidMount() {
    let groups = getGroupsByPersonId(1);
    console.log(groups);
    groups.addListener(groups => this.setState({ groups }));
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
              onPress={() => this.props.navigation.navigate("Group", {id: g.id})}
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
        title: `Groupd id: ${navigation.state.params.id}`
      })
    }
  },
  {
    headerMode: "screen"
  }
);

export default GroupsNavigator;
