import React, { Component } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { Button, FormInput, Icon } from "react-native-elements";

import { register } from "../services/userService";

export default class Register extends Component {
  static navigationOptions = {
    //Stack navigator opts
    title: "Registration to Caloocial"
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

  onSignUpClick() {
    register(this.state.username, this.state.password)
      .then(resp => {
        if (resp.status === 200) {
          this.props.navigation.navigate("Login");
        }
      })
      .catch(e => console.error(e));
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
          onPress={() => this.onSignUpClick()}
          icon={{ name: "check", type: "entypo" }}
          title="SIGN UP"
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