import React, { Component } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { Button, FormInput, Icon } from "react-native-elements";
import { StackNavigator } from "react-navigation";

import Register from "./Register";
import { login } from "../services/userService";

class Login extends Component {
  static navigationOptions = {
    //Stack navigator opts
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  }

  setUsername(username) {
    this.setState({ username });
  }

  setPassword(password) {
    this.setState({ password });
  }

  onSignInClick() {
    login(this.state.username, this.state.password)
      .then(resp => {
        if (resp.status === 200) {
          this.props.screenProps.rootNavigation.navigate("Groups");
        }
      })
      .catch(e => console.error(e));
  }

  onSignUpClick() {
    this.props.navigation.navigate("Register");
  }

  render() {
    return (
      <View style={styles.container}>
        <FormInput
          placeholder="Username"
          onChangeText={text => this.setUsername(text)}
          onSubmitEditing={() => this.passwordRef.focus()}
        >
          {this.state.username}
        </FormInput>
        <FormInput
          placeholder="Password"
          onChangeText={text => this.setPassword(text)}
          secureTextEntry={true}
          ref={ref => (this.passwordRef = ref)}
        >
          {this.state.password}
        </FormInput>
        <Button
          onPress={() => this.onSignInClick()}
          icon={{ name: "login", type: "entypo" }}
          title="SIGN IN"
        />
        <Button
          onPress={() => this.onSignUpClick()}
          icon={{ name: "question", type: "font-awesome" }}
          title="Not using Caloocial yet?"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});

const LoginStackNav = StackNavigator(
  {
    Login: {
      screen: Login
    },
    Register: {
      screen: Register
    }
  },
  {
    headerMode: "screen"
  }
);

export default class LoginNavigator extends Component {
  static navigationOptions = {
    drawerLabel: "Logout",
    drawerIcon: ({ tintColor }) => (
      <Icon name="log-out" type="entypo" color={tintColor} />
    ),
    drawerLockMode: "locked-closed"
  };

  render() {
    return (
      <LoginStackNav screenProps={{ rootNavigation: this.props.navigation }} />
    );
  }
}
