import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StyleSheet,
  Button,
  Text,
  View,
  Image,
  ScrollView,
  FlatList,
  RefreshControl,
  TouchableHighlight,
} from 'react-native';
import { url } from '../App.js';
import { Header, Avatar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class ProfileTile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        username: this.props.username,
        first_name: this.props.first_name,
        last_name: this.props.last_name,
        initials:
          this.props.first_name.charAt(0) + this.props.last_name.charAt(0),
        profileUri: this.props.profileUri,
      },
    };
  }
  handleClick = () => {
    this.props.navigation.navigate('Messages', {
      username: this.props.username,
    });
  };
  render() {
    return (
      <TouchableHighlight
        onPress={this.props.onPress}
        underlayColor="none"
        style={{
          paddingHorizontal: 10,
          paddingVertical: 10,
        }}>
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            alignItems: 'center',
          }}>
          <Avatar
            rounded
            title={this.state.user.initials}
            size="large"
            source={{
              uri: this.state.user.profileUri,
            }}
          />
          <View
            style={{
              padding: 5,
            }}>
            <Text
              style={{
                fontSize: 40,
              }}>
              {this.state.user.first_name} {this.state.user.last_name}
            </Text>
            <Text
              style={{
                fontSize: 16,
              }}>
              {this.state.user.username}
            </Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}

export class ProfileInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        username: this.props.username,
        first_name: this.props.first_name,
        last_name: this.props.last_name,
        initials:
          this.props.first_name.charAt(0) + this.props.last_name.charAt(0),
        profileUri: this.props.profileUri,
        bio: this.props.bio,
      },
    };
  }
  render() {
    return (
      <View
        style={{
          width: '100%',
          paddingHorizontal: 10,
          paddingVertical: 10,
          borderBottomColor: 'black',
          borderBottomWidth: 1,
        }}>
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            alignItems: 'center',
          }}>
          <Avatar
            rounded
            title={this.state.user.initials}
            size="large"
            source={{
              uri: this.state.user.profileUri,
            }}
          />
          <View
            style={{
              padding: 5,
            }}>
            <Text
              style={{
                fontSize: 40,
              }}>
              {this.state.user.first_name} {this.state.user.last_name}
            </Text>
            <Text
              style={{
                fontSize: 16,
              }}>
              {this.state.user.username}
            </Text>
          </View>
        </View>
        <Text>{this.state.user.bio}</Text>
      </View>
    );
  }
}
