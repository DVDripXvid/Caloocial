import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Icon, List, ListItem } from "react-native-elements";
import { getGroupDetails } from "../../apis/groupApi";

export default class GroupMembers extends Component {
  static navigationOptions = {
    tabBarLabel: "Members",
    tabBarIcon: ({ tintColor }) => (
      <Icon name="users" type="feather" color={tintColor} />
    )
  };

  constructor(props) {
    super(props);
    this.state = {
      members: [{ displayName: "Karcsi member" }]
    };
  }

  componentDidMount() {
    getGroupDetails(this.props.screenProps.id)
      .then(data => this.updateGroupData(data))
      .catch(error => console.warn(error));
  }

  updateGroupData(group) {
    group.members = group.members || [];
    var members = group.administrators
      .map(admin => {
        admin.isAdmin = true;
        admin.iconName = "account-star";
        return admin;
      })
      .concat(
        group.members.map(member => {
          member.isAdmin = false;
          member.iconName = "account-outline";
          return member;
        })
      );
    this.setState({ members });
  }

  render() {
    return (
      <View>
        <List>
          {this.state.members.map((m, i) => (
            <ListItem
              key={i}
              title={m.displayName}
              leftIcon={{ name: m.iconName, type: "material-community" }}
            />
          ))}
        </List>
      </View>
    );
  }
}

const styles = StyleSheet.create({});
