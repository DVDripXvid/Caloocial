import React, { Component } from "react";
import { Text } from "react-native";
import GroupEventForm from "../group/GroupEventForm";

export default function(props) {
  let event = props.navigation.state.params.event;
  return (
    <GroupEventForm
      onReady={() =>
        props.navigation.goBack()
      }
      groupId={event.group.id}
      name={event.name}
      dateTime={event.dateTime}
      eventId={event.id}
    />
  );
}
