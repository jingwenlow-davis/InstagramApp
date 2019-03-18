import React from 'react';
import {
  AsyncStorage,
  Button,
  StyleSheet,
  ScrollView,
  Image,
  View,
  KeyboardAvoidingView,
} from 'react-native';
import { _signInAsync, _signIn } from './auth.js';
import t from 'tcomb-form-native';

const Form = t.form.Form;

const User = t.struct({
  username: t.String,
  password: t.String,
});

const options = {
  // auto: 'none',
  fields: {
    username: {
      // placeholder: "Email Address"
    },
    password: {
      // placeholder: "Password",
      password: true,
      secureTextEntry: true,
    }
  }
}

export default class SignInScreen extends React.Component {
  static navigationOptions = {
    title: 'Sign in',
  };

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
          <Image
            style={styles.logo}
            source={require('../assets/images/Logo.png')}
          />
          <Form ref={c => (this._form = c)} type={User} options={options} 
            style={{
              width: '100'
            }}
          />
          <Button
            title="Sign in!"
            color="#FF7A89"
            onPress={() => _signInAsync(this.props.navigation, this._form)}
          />
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  logo: {
    resizeMode: 'contain',
    height: 200,
    maxWidth: "100%",
    margin: 0,
    marginBottom: 20,
  },
});

