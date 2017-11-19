import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Icon, List, ListItem } from "react-native-elements";

import { getEventsByGroupId } from "../../services/eventService";

export default class GroupEvents extends Component {
  static navigationOptions = {
    tabBarLabel: "Events",
    tabBarIcon: ({ tintColor }) => (<Icon name="event" color={tintColor} ></Icon>)
  };

  constructor(props){
    super(props);
    this.state = {
      events: []
    };
    this.onEventsChange = this.onEventsChange.bind(this);
  }

  componentDidMount() {
    let eventsRealm = getEventsByGroupId(this.props.screenProps.id);
    this.onEventsChange(eventsRealm);
    eventsRealm.addListener(this.onEventsChange);
  }

  componentWillUnmount(){
    let eventsRealm = getEventsByGroupId(this.props.screenProps.id);
    eventsRealm.removeListener(this.onEventsChange);
  }

  onEventsChange(events){
    this.setState({events});
  }

  render() {
    return (
      <View>
        <List>
          {this.state.events.map((e, i) => (
            <ListItem
              key={i}
              subtitle={e.dateTime.toDateString()}
              title={e.name}
            />
          ))}
        </List>
      </View>
    );
  }
}

const styles = StyleSheet.create({});
