import React from "react";
import { StyleSheet, View, BackHandler, AsyncStorage } from "react-native";
import { DrawerNavigator, NavigationActions } from "react-navigation";
import Login from "./src/screens/Login";
import Groups from "./src/screens/Groups";
import { getNewAccesToken } from "./src/services/userService";
import axios from "axios";

import config from "./src/config";

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
    this.configureAxios();

    axios.interceptors.response.use(
      resp => {
        console.log("REQUEST ========> " + resp.request.responseURL);
        console.log(resp);
        return resp;
      },
      error => {
        console.log("======= ERROR =======");
        console.log(error.request);
        console.error(error.response);
        if (error.response.status === 401)
          this.navigator.dispatch(
            NavigationActions.navigate({ routeName: "Login" })
          );
        return Promise.reject(error);
      }
    );
  }

  configureAxios() {
    return AsyncStorage.getItem(config.store.accessTokenKey).then(
      token =>
        (axios.defaults.headers.common["Authorization"] = "Bearer " + token)
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
