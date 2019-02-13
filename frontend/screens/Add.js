import React from 'react';
import {
  Button,
  StyleSheet,
  Text,
  View,
} from 'react-native';


export default class AddScreen extends React.Component {
  static navigationOptions = {
    title: 'Add',
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>
          This page is for creating a post.
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
