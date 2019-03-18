import React from 'react';
import {
  createStackNavigator,
  createBottomTabNavigator,
  createSwitchNavigator,
  createAppContainer,
} from 'react-navigation';
import HomeScreen from './screens/Home';
import ExploreScreen from './screens/Explore';
import AddScreen from './screens/Add';
import ProfileScreen from './screens/Profile';
import MessagesScreen from './screens/Messages';
import SettingsScreen from './screens/Settings';
import ChatScreen from './screens/Chat';
import SignInScreen from './screens/SignIn';
import SignUpScreen from './screens/SignUp';
import AuthLoadingScreen from './screens/auth';
import { Icon, Header } from 'react-native-elements';

import t from 'tcomb-form-native';

export const url = 'http://7836cdcd.ngrok.io';

const Form = t.form.Form;
Form.stylesheet.textbox.normal.backgroundColor = '#E0E0E0';
Form.stylesheet.textbox.normal.color = '#828282';
Form.stylesheet.textbox.normal.borderWidth = 0;
Form.stylesheet.textbox.normal.height = 46;
Form.stylesheet.textbox.normal.fontSize = 24;
Form.stylesheet.textbox.normal.textAlign = 'left';

Form.stylesheet.textbox.error.backgroundColor = '#E0E0E0';
Form.stylesheet.textbox.error.color = '#828282';
Form.stylesheet.textbox.error.borderWidth = 0;
Form.stylesheet.textbox.error.height = 46;
Form.stylesheet.textbox.error.fontSize = 24;
Form.stylesheet.textbox.error.textAlign = 'left';

Form.stylesheet.controlLabel.normal.fontSize = 24;
Form.stylesheet.controlLabel.normal.color = '#828282';

Form.stylesheet.controlLabel.error.fontSize = 24;
Form.stylesheet.controlLabel.error.color = '#E75757';

Form.stylesheet.fieldset.flexDirection = 'column';
Form.stylesheet.fieldset.width = '80%';

const MessagesStack = createStackNavigator({
  Messages: {
    screen: MessagesScreen,
    navigationOptions: {
    },
  },
  Chat: {
    screen: ChatScreen,
    },
});

const ProfileStack = createStackNavigator({
  Profile: ProfileScreen,
  Settings: SettingsScreen,
});

const AppStack = createBottomTabNavigator(
  {
    // Home: HomeScreen,
    // Explore: ExploreScreen,
    // Add: AddScreen,
    // Messages: MessagesStack,
    // Profile: ProfileStack,
    Home: HomeScreen,
    Explore: ExploreScreen,
    Add: AddScreen,
    Messages: MessagesStack,
    Profile: ProfileStack,
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        // let IconComponent = Ionicons;
        let iconName;
        if (routeName === 'Home') {
          iconName = 'home';
        } else if (routeName === 'Explore') {
          iconName = 'search';
        } else if (routeName === 'Add') {
          iconName = focused ? 'add-circle' : 'add';
        } else if (routeName === 'Messages') {
          iconName = 'message';
        } else if (routeName === 'Profile') {
          iconName = 'person';
        }
        // You can return any component that you like here!
        return <Icon name={iconName} color={tintColor} type="material" />;
      },
    }),
    tabBarOptions: {
      activeTintColor: '#FF7A89',
      inactiveTintColor: 'gray',
    },
  }
);

const AuthStack = createBottomTabNavigator(
  {
    SignIn: SignInScreen,
    SignUp: SignUpScreen,
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        // let IconComponent = Ionicons;
        let iconName;
        if (routeName === 'SignIn') {
          iconName = 'exit-to-app';
        } else if (routeName === 'SignUp') {
          iconName = 'person-add';
        }
        // You can return any component that you like here!
        return <Icon name={iconName} color={tintColor} type="material" />;
      },
    }),
    tabBarOptions: {
      activeTintColor: '#FF7A89',
      inactiveTintColor: 'gray',
    },
  }
);

export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      App: AppStack,
      Auth: AuthStack,
    },
    {
      initialRouteName: 'AuthLoading',
    }
  )
);

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
