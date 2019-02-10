import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  Button,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import { createStackNavigator, createSwitchNavigator, createAppContainer } from 'react-navigation';
import HomeScreen from './screens/Home';
import OtherScreen from './screens/Other';
import SignInScreen from './screens/SignIn';


class AuthLoadingScreen extends React.Component {
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

const AppStack = createStackNavigator({ Home: HomeScreen, Other: OtherScreen });
const AuthStack = createStackNavigator({ SignIn: SignInScreen });

export default createAppContainer(createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
));









// import * as React from 'react';
// import { Text, View, StyleSheet } from 'react-native';
// import { createStackNavigator, createAppContainer } from "react-navigation";
//
// import { Constants } from 'expo';
//
// // You can import from local files
// import AssetExample from './components/AssetExample';
//
// // or any pure javascript modules available in npm
// import { Card } from 'react-native-paper';
//
// export default class App extends React.Component {
//   render() {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.paragraph}>
//           OUR INSTAGRM APP
//         </Text>
//
//
//         <AssetExample />
//       </View>
//     );
//   }
// }
//
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     // justifyContent: 'center',
//     paddingTop: Constants.statusBarHeight,
//     backgroundColor: '#ecf0f1',
//     padding: 8,
//   },
//   paragraph: {
//     margin: 24,
//     fontSize: 18,
//     fontWeight: 'bold',
//     textAlign: 'center',
//   },
// });
