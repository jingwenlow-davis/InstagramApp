import React from 'react';
import { createStackNavigator, createBottomTabNavigator, createSwitchNavigator, createAppContainer } from 'react-navigation';
import HomeScreen from './screens/Home';
import ExploreScreen from './screens/Explore';
import ProfileScreen from './screens/Profile';
import MessagesScreen from './screens/Messages';
import SignInScreen from './screens/SignIn';
import AuthLoadingScreen from './screens/auth';


const AppStack = createBottomTabNavigator(
  {
    Home: HomeScreen,
    Explore: ExploreScreen,
    Messages: MessagesScreen,
    Profile: ProfileScreen
  });
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
