import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Icon, List, ListItem, Button } from "react-native-elements";
import GroupEventForm from "./GroupEventForm";

import { getEventsByGroupId } from "../../services/eventService";

export default class GroupEvents extends Component {
  static navigationOptions = {
    tabBarLabel: "Events",
    tabBarIcon: ({ tintColor }) => <Icon name="event" color={tintColor} />
  };

  constructor(props) {
    super(props);
    this.state = {
      groupId: this.props.screenProps.id,
      isEventModalVisible: false,
      events: [],
      selectedEvent: null
    };
    this.onEventsChange = this.onEventsChange.bind(this);
  }

  componentDidMount() {
    let eventsRealm = getEventsByGroupId(this.state.groupId);
    this.onEventsChange(eventsRealm);
    eventsRealm.addListener(this.onEventsChange);
  }

  componentWillUnmount() {
    let eventsRealm = getEventsByGroupId(this.state.groupId);
    eventsRealm.removeListener(this.onEventsChange);
  }

  onEventsChange(events) {
    this.setState({ events });
  }

  render() {
    return (
      <View style={styles.container}>
        <Button
          buttonStyle={styles.addButton}
          icon={{ name: "calendar-plus", type: "material-community" }}
          onPress={() => this.setState({ isEventModalVisible: true })}
          title="CREATE NEW EVENT"
        />
        <List>
          {this.state.events.map((e, i) => (
            <ListItem
              key={i}
              subtitle={e.dateTime.toDateString()}
              title={e.name}
              onPress={() =>
                this.setState({ isEventModalVisible: true, selectedEvent: e })
              }
            />
          ))}
        </List>
        {this.state.isEventModalVisible && (
          <GroupEventForm
            onReady={() =>
              this.setState({ isEventModalVisible: false, selectedEvent: null })
            }
            groupId={this.state.groupId}
            name={this.state.selectedEvent ? this.state.selectedEvent.name : ""}
            dateTime={
              this.state.selectedEvent
                ? this.state.selectedEvent.dateTime
                : new Date()
            }
            eventId={
              this.state.selectedEvent ? this.state.selectedEvent.id : null
            }
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  addButton: {
    backgroundColor: "#923"
  },
  container: {
    marginTop: 21
  }
});
