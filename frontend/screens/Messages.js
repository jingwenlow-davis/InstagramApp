import React from 'react';
import {
  Button,
  StyleSheet,
  Text,
  View,
} from 'react-native';


export default class MessagesScreen extends React.Component {
  static navigationOptions = {
    title: 'Messages',
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>
          Messages will go here.
        </Text>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
