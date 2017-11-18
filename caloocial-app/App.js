import React from "react";
import { StyleSheet, View, BackHandler } from "react-native";
import { DrawerNavigator, NavigationActions } from "react-navigation";
import Login from "./src/screens/Login";
import Groups from "./src/screens/Groups";
import axios from "axios";

const AppNavigator = DrawerNavigator({
  Groups: {
    screen: Groups
  },
  Login: {
    screen: Login
  }
});

export default class App extends React.Component {
  componentWillMount() {
    axios.interceptors.response.use(
      resp => {
        console.log("REQUEST ========> " + resp.request.responseURL);
        console.log(resp.data);
        return resp;
      },
      error => {
        console.log("======= ERROR =======");
        console.error(error);
        if (error.response.status === 401)
          this.navigator.dispatch(
            NavigationActions.navigate({ routeName: "Login" })
          );
        return Promise.reject(error);
      }
    );
  }

  componentDidMount() {
    //this.navigator.dispatch(NavigationActions.navigate({ routeName: "Login" }));
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
    return <AppNavigator ref={nav => (this.navigator = nav)} />;
  }
}

const styles = StyleSheet.create({});
