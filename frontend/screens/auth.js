import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  Button,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import Cookies from "universal-cookie";
// import Expo from 'expo-server-sdk';
// import {Constants} from 'expo';
import * as Expo from 'expo'

export const _signInAsync = async (navigation, data) => {
  const user = data.getValue();
  console.log("val",user);

  fetch('https://curly-seahorse-73.localtunnel.me/api-token-auth/', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      "username": user.username,
      "password": user.password
    }),
  })
    .then((response) => {
      if(response.status != 200){
        // TODO use non_field_errors
        alert("Unable to log in with provided credentials.")
      }
      return response.json()
    })
    .then(async (responseJson) => {
      console.log("data: ",responseJson) // User Data
      await AsyncStorage.setItem('userToken', responseJson.token);
      navigation.navigate('App');
    })
    .catch(function (error) {
      console.log(error);
    });

};

export const _signUpAsync = async (navigation, data) => {
  const user = data.getValue();
  const userToken = await AsyncStorage.getItem('userToken');

  fetch(Expo.Constants.manifest.extra.url + '/api/signup/', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      "email": user.email,
      "first_name": user.first_name,
      "last_name": user.last_name,
      "username": user.username,
      "gender": user.gender,
      "password": user.password
    }),
  })
    .then((response) => response.json())
    .then(async (responseJson) => {
      console.log("data: ",responseJson) // User Data
      await AsyncStorage.setItem('userToken', responseJson.token);
      navigation.navigate('App');
    })
    .catch(function (error) {
      console.log(error);
    });
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
