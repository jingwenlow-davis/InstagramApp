import React from 'react';
import {
  AsyncStorage,
  Button,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {_signOutAsync} from './auth.js';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Home',
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Home</Text>
        <Button
          title="Sign Out"
          onPress={() => _signOutAsync(this.props.navigation)}
        />
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
