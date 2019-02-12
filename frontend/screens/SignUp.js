import React from "react";
import {
  AsyncStorage,
  Button,
  StyleSheet,
  View,
} from 'react-native';
import { Card, FormLabel, FormInput } from "react-native-elements";
import {_signInAsync, _signUpAsync} from './auth.js'
import t from 'tcomb-form-native';

const Form = t.form.Form;

const User = t.struct({
  email: t.String,
  first_name: t.String,
  last_name: t.String,
  password: t.String,
});


export default class SignUpScreen extends React.Component {
  static navigationOptions = {
    title: 'Sign Up'
  };

  render() {
    return(
      <View style={styles.container}>
        <Form
          ref={c => this._form = c}
          type={User}
        />
        <Button
          title="Sign Up!"
          onPress={() => _signUpAsync(this.props.navigation, this._form)}
        />
      </View>
    );
  }

}


const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginTop: 50,
    padding: 20,
    backgroundColor: '#ffffff',
  },
});
