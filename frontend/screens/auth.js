import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  Button,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';


export const _signInAsync = async (navigation) => {
  await AsyncStorage.setItem('userToken', 'abc');
  navigation.navigate('App');
};

export const _signUpAsync = async (navigation, data) => {
  const value = data.getValue();
  alert(value.email);
  await AsyncStorage.setItem('userToken', 'abc');
  navigation.navigate('App');
};

export const _signOutAsync = async (navigation) => {
  await AsyncStorage.clear();
  navigation.navigate('Auth');
};


// Decide if user is logged in or not App or Auth screen is showed
export default class AuthLoadingScreen extends React.Component {
  constructor() {
    super();
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem('userToken');

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    this.props.navigation.navigate(userToken ? 'App' : 'Auth');
  };

  // Render any loading content that you like here
  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
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
