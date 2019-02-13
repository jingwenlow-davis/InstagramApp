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


export const _signInAsync = async (navigation, data) => {
  const user = data.getValue();
  console.log("val",user);

  fetch('https://lazy-grasshopper-65.localtunnel.me/api-token-auth/', {
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

export const _signUpAsync = async (navigation, data) => {
  const user = data.getValue();
  const userToken = await AsyncStorage.getItem('userToken');

  fetch('https://lazy-grasshopper-65.localtunnel.me/api-token-auth/', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Token ' + userToken
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
  // const config = {
  //   headers: {
  //     "Authorization": `Token ffd76aeb75391899390f037e1b820d0454a9ae03`,
  //     'X-CSRFToken': Cookies.get('csrftoken'),
  //     'Content-Type': 'application/json'
  //   },
  //   data: {}
  // };

  // axiosInst.post('api/login/', config)
  //   .then(async function (response) {
  //     console.log(response.status);

  //     if (response.status === 200) {
  //       await AsyncStorage.setItem('userToken', response.data.token);
  //       navigation.navigate('App');
  //     } else {
  //       throw new Error('Invalid credentials');
  //     }
  //   });
};

export const _signOutAsync = async (navigation) => {
  // console.log(Cookies.get('csrftoken'))
  // console.log("SDF")
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
