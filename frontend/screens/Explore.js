import React from 'react';
import {
  Button,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';


export default class ExploreScreen extends React.Component {
  static navigationOptions = {
    title: 'Explore',
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>
          Explore will go here.
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
