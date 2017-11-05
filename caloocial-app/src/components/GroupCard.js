import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Card, Badge, Icon } from "react-native-elements";
import Dimensions from "Dimensions";

export default class GroupCard extends Component {
  render() {
    return (
      <View>
        <Card title="My Best group">
          <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
            <View style={{justifyContent: "space-around" }}>
              <Badge value="Next event: 2017.12.24" />
              <Badge value="6 members" />
            </View>
            <Icon
              raised
              name="navigate-next"
              color="#923"
              reverse
              onPress={() => this.props.onPress(2)}
            />
          </View>
        </Card>
      </View>
    );
  }
}

const styles = StyleSheet.create({
});
