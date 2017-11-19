import React, { Component } from "react";
import { View, Modal, StyleSheet } from "react-native";
import { SearchBar, List, ListItem } from "react-native-elements";
import { searchPersonByDisplayName } from "../../apis/groupApi";

export default class SearchPerson extends Component {
  constructor(props) {
    super(props);
    this.state = {
      persons: []
    };
  }

  onSearchTextChanged(text) {
    if (!text) {
      return;
    }
    searchPersonByDisplayName(text)
      .then(persons => {
        this.setState({ persons });
      })
      .catch(error => console.error(error));
  }

  onPersonSelected(person){
    if(typeof this.props.onSelect === "function"){
      this.props.onSelect(person);
    }
  }

  render() {
    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={this.props.visible}
        onRequestClose={() => {
          this.onPersonSelected(null);
        }}
      >
        <View style={{ marginTop: 22 }}>
          <SearchBar
            placeholder={"Start typing to search for other users..."}
            onChangeText={t => this.onSearchTextChanged(t)}
          />
          <List>
            {this.state.persons.map((p, i) => (
              <ListItem
                key={i}
                title={p.displayName}
                onPress={() => this.onPersonSelected(p)}
              />
            ))}
          </List>

        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({});
