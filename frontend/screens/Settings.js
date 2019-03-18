import React from 'react';
import {
  AsyncStorage,
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  View,
} from 'react-native';
import Cookies from 'universal-cookie';
import Expo from 'expo-server-sdk';
import { Header, Button, Icon, Divider } from 'react-native-elements';
// import CookieManager from 'react-native-cookies';
import t from 'tcomb-form-native';
import { _signOutAsync } from './auth.js';
import { url } from '../App.js';

const Form = t.form.Form;

const User = t.struct({
  first_name: t.maybe(t.String),
  last_name: t.maybe(t.String),
  username: t.maybe(t.String),
  email: t.maybe(t.String),
  gender: t.maybe(t.String),
  birthday: t.Date,
});

var options = {
  fields: {
    birthday: {
      mode: 'date',
    },
    password: {
      password: true,
      secureTextEntry: true,
    },
  },
};

export default class SettingsScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Settings',
      header: navigationProps => (
        <Header
          placement="left"
          backgroundColor="#fff"
          leftComponent={
            <Button
              onPress={() => navigation.goBack()}
              type="clear"
              icon=<Icon name="arrow-back" color="grey" />
            />
          }
          centerComponent={{
            text: 'Settings',
            style: {
              color: '#FF7A89',
              fontSize: 22,
            },
          }}
        />
      ),
    };
  };

  render() {
    return (
      <View
        style={{
          flex: 1,
        }}>
        <ScrollView style={styles.container}>
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              marginTop: 140,
              // paddingVertical: 400
            }}>
            <Form ref={c => (this._form = c)} type={User} options={options} />
            <Button title="Save" onPress={this._updateSettings} type="clear" titleStyle={{
                color: "#FF7A89"
              }}/>
            
            <Divider />
            
            <Button
              title="Sign Out"
              titleStyle={{
                color: "grey"
              }}
              type="clear"
              onPress={() => _signOutAsync(this.props.navigation)}
            />
          </View>
        </ScrollView>
      </View>
    );
  }

  // _getCsrfToken = () => {
  //   var url = 'https://lazy-grasshopper-65.localtunnel.me/api/updatesettings/';
  //   return CookieManager.get(url).then(response => {
  //     console.log('get token ', response.status);
  //     return response.csrftoken;
  //   });
  // };

  _updateSettings = async () => {
    const user = this._form.getValue();
    const userToken = await AsyncStorage.getItem('userToken');

    console.log('val', user);
    console.log('token ', userToken);
    // console.log(Cookies.get('csrftoken'));

    // // const csrfToken = this._getCsrfToken;
    // const csrfToken = Cookies.get('csrftoken');
    // if (csrfToken == null) {
    //   console.log('CSRF NOT SET')
    // }

    fetch(url + '/api/updatesettings/', {
      method: 'POST',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Token ' + userToken,
        // 'X-CSRFToken': csrfToken
      },
      body: JSON.stringify({
        first_name: user.first_name,
        last_name: user.last_name,
        username: user.username,
        email: user.email,
        gender: user.gender,
        birthday: user.birthday,
      }),
    })
      .then(function(response) {
        console.log(response.status);
        alert('Profile successfully updated.');
        this.props.navigation.navigate('Profile');
      })
      .catch(function(error) {
        console.log(error);
      });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
});
