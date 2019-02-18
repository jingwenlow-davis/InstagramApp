import React from 'react';
import {
  AsyncStorage,
  Button,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {_signInAsync, _signIn} from './auth.js'
import t from 'tcomb-form-native';

const Form = t.form.Form;

const User = t.struct({
  username: t.String,
  password: t.String,
});


export default class SignInScreen extends React.Component {
  static navigationOptions = {
    title: 'Sign in'
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <Form
          ref={c => this._form = c}
          type={User}
        />
        <Button
          title="Sign in!"
          onPress={() => _signInAsync(this.props.navigation, this._form)}         />
      </ScrollView>
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
