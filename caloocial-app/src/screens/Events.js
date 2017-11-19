import React, { Component } from "react";
import { StyleSheet, Text, View, AsyncStorage } from "react-native";
import { Button, Icon, List, ListItem } from "react-native-elements";
import { StackNavigator } from "react-navigation";

import config from "../config";
import Event from "./event/Event";
import { getGroupsByPersonId } from "../services/groupService";

import {
  getEventsByPersonId,
  addEventsChangeListener,
  removeEventsChangeListener
} from "../services/eventService";

class Events extends Component {
  static navigationOptions = {
    //Tab navigator opts
    title: "Events",
    header: null,
    //Draw navigator opts
    drawerLabel: "Events",
    drawerIcon: ({ tintColor }) => <Icon name="event" color={tintColor} />
  };

  constructor(props) {
    super(props);
    this.state = {
      events: []
    };
    this.eventsAreChanged = this.eventsAreChanged.bind(this);
  }

  componentDidMount() {
    addEventsChangeListener(this.eventsAreChanged);
    AsyncStorage.getItem(config.store.personKey)
      .then(json => {
        if (!json) throw "person is null";
        return JSON.parse(json);
      })
      .then(person => {
        getGroupsByPersonId(person.id);
        getEventsByPersonId(person.id);
      })
      .catch(e => console.error(e));
  }

  componentWillUnmount() {
    removeEventsChangeListener(this.eventsAreChanged);
  }

  eventsAreChanged(events) {
    this.setState({ events });
  }

  render() {
    return (
      <View style={styles.container}>
        <Button
          buttonStyle={styles.addButton}
          icon={{ name: "event-available" }}
          title="CREATE A NEW EVENT"
        />
        <List>
          {this.state.events.map(e => (
            <ListItem
              key={e.id}
              title={e.name}
              subtitle={e.dateTime.toDateString()}
              onPress={() =>
                this.props.navigation.navigate("Event", {
                  id: e.id,
                  name: e.name
                })}
            />
          ))}
        </List>
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

const EventsNavigator = StackNavigator(
  {
    Events: {
      screen: Events
    },
    Event: {
      path: "events/:id",
      screen: Event,
      navigationOptions: ({ navigation }) => ({
        title: navigation.state.params.name
      })
    }
  },
  {
    headerMode: "screen"
  }
);

export default EventsNavigator;
