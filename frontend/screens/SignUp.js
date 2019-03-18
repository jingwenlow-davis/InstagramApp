import React from "react";
import {
  AsyncStorage,
  Button,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Text,
  StatusBar,
  View
} from 'react-native';
import { Card, FormLabel, FormInput } from "react-native-elements";
import {_signInAsync, _signUpAsync} from './auth.js'
import t from 'tcomb-form-native';

const Form = t.form.Form;

const User = t.struct({
  email: t.String,
  first_name: t.String,
  last_name: t.String,
  username: t.String,
  gender: t.String,
  password: t.String,
  birthday: t.Date,
});

var options = {
  fields: {
    birthday: {
      mode: 'date'
    },
    password: {
      password: true,
      secureTextEntry: true,
    }
  }
};


export default class SignUpScreen extends React.Component {
  static navigationOptions = {
    title: 'Sign Up'
  };

  render() {
    return(
      <KeyboardAvoidingView behavior="padding" enabled
      style={{
        flex:1,
        backgroundColor: '#fff',
        // height: '100%'
      }}>
      
        <ScrollView style={styles.container}>
          <View
          style={{
            flex:1,
            alignItems: 'center',
            paddingBottom: 30,
            paddingTop: 50,
            fontWeight: 800
          }}>
            <Text
            style={{
              fontSize: 40,
              color: '#FF7A89',
            }}
            >Sign Up</Text>
            <Form 
              ref={c => this._form = c}
              type={User} 
              options={options}
            />
            <Button
              title="Sign Up!"
              color="#FF7A89"
              onPress={() => _signUpAsync(this.props.navigation, this._form)}
              style={{
                flex: 0,
              }}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
  
}


const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    flex: 1,
    // padding: 30
  },
});



