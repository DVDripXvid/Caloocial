import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import Expo from "expo";

export default class Header extends Component {

  render() {
    return (
      <View style={styles.header}>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    header: {
        marginTop: Expo.Constants.statusBarHeight,
        backgroundColor: "#fff"
    }
})