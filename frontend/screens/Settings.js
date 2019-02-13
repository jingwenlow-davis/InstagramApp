import React from 'react';
import { AsyncStorage, StyleSheet, Button, Text, View } from 'react-native';
import Cookies from 'universal-cookie';
// import CookieManager from 'react-native-cookies';
import t from 'tcomb-form-native';

const Form = t.form.Form;

const User = t.struct({
  first_name: t.maybe(t.String),
  last_name: t.maybe(t.String),
  username: t.maybe(t.String),

  email: t.maybe(t.String),
  gender: t.maybe(t.String),
  birthday: t.maybe(t.String),
});

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'Settings',
  };

  render() {
    return (
      <View style={styles.container}>
        <Form ref={c => (this._form = c)} type={User} />
        <Button title="Save" onPress={this._updateSettings} />
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


    fetch('https://lazy-grasshopper-65.localtunnel.me/api/updatesettings/', {
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
    marginTop: 50,
    padding: 20,
    backgroundColor: '#ffffff',
  },
});
