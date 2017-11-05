import React, { Component } from "react";
import { View, Text } from "react-native";
import { Card, Badge } from "react-native-elements";
import Dimensions from "Dimensions";

export default class GroupCard extends Component {
  render() {
    return (
      <View>
        <Card title="My Best group">
          <View style={{ flexDirection: "row" }}>
            {this.props.group.members.map(member => (
              <Badge key={member.name} value={member.name} />
            ))}
          </View>
        </Card>
      </View>
    );
  }
}
