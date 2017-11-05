import React from "react";
import { StyleSheet, View, BackHandler } from "react-native";
import { DrawerNavigator, NavigationActions } from "react-navigation";
import Login from "./src/screens/Login";
import Groups from "./src/screens/Groups";
import Expo from "expo";

const AppNavigator = DrawerNavigator({
  Groups: {
    screen: Groups
  },
  Login: {
    screen: Login
  }
});

export default class App extends React.Component {
  componentDidMount() {
    this.navigator.dispatch(NavigationActions.navigate({ routeName: "Login" }));
    BackHandler.addEventListener("hardwareBackPress", this.handleBackButton);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackButton);
  }

  handleBackButton() {
    BackHandler.exitApp();
    return true;
  }

  render() {
    return (
      <View style={styles.container}>
        <AppNavigator
          ref={nav => (this.navigator = nav)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Expo.Constants.statusBarHeight
  }
});
