import React, { Component } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { Button, FormInput, Icon } from "react-native-elements";

import { login } from "../services/userService";

export default class Login extends Component {
  static navigationOptions = {
    drawerLabel: "Logout",
    drawerIcon: ({ tintColor }) => <Icon name="log-out" type="entypo" color={tintColor} />,
    drawerLockMode: 'locked-closed'
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
    login(this.state.username, this.state.password).then(resp => {
      if(resp.status === 200){
        this.props.navigation.navigate('Groups');
      }
    }).catch(e => console.error(e));
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
          ref={ref => this.passwordRef = ref}
        >
          {this.state.password}
        </FormInput>
        <Button
          onPress={() => this.onSignInClick()}
          icon={{ name: "login", type: "entypo" }}
          title="SIGN IN"
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
  },
})