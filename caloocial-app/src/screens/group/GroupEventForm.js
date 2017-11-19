import React, { Component } from "react";
import { View, Modal, StyleSheet, Text } from "react-native";
import { FormInput, FormLabel, Button, Icon } from "react-native-elements";
import { createEventInGroup } from "../../apis/eventApi";
import DateTimePicker from "react-native-modal-datetime-picker";

export default class GroupEventForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDateTimePickerVisible: false,
      dateTime: new Date(),
      name: ""
    };
  }


  save() {
    createEventInGroup(this.props.groupId, this.state.dateTime, this.state.name)
      .then(event => {
        this.props.onReady();
      })
      .catch(err => console.error(err));
  }

  render() {
    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={this.props.visible}
        onRequestClose={() => this.props.onReady()}
      >
        <View style={styles.container}>
          <FormLabel>Event name</FormLabel>
          <FormInput
            placeholder="Type here ..."
            onChangeText={name => this.setState({ name })}
          >
            {this.state.name}
          </FormInput>
          <FormLabel>Event date</FormLabel>
          <Button
            iconRight={{ name: "calendar-clock", type: "material-community" }}
            title={this.state.dateTime.toLocaleString()}
            onPress={() => this.setState({ isDateTimePickerVisible: true })}
          />
          <Button
            buttonStyle={styles.saveButton}
            icon={{ name: "save" }}
            title="SAVE EVENT"
            onPress={() => this.save()}
          />
        </View>
        <DateTimePicker
          mode="datetime"
          isVisible={this.state.isDateTimePickerVisible}
          onConfirm={picked =>
            this.setState({ dateTime: picked, isDateTimePickerVisible: false })}
          onCancel={() => this.setState({ isDateTimePickerVisible: false })}
        />
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50
  },
  saveButton: {
    marginTop: 21,
    backgroundColor: "#923"
  }
});
