import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  FlatList,
  RefreshControl,
} from 'react-native';
import { url } from '../App.js';
import { Header, Avatar, Button, Icon, Divider } from 'react-native-elements';
import Expo from 'expo-server-sdk';
import FeedPost from '../components/Feed';
import ProfileInfo from '../components/ProfileComponent';

export default class ProfileScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Profile',
      header: navigationProps => (
        <Header
          placement="left"
          backgroundColor="#fff"
          centerComponent={{
            text: 'My Profile',
            style: {
              color: '#FF7A89',
              fontSize: 22,
            },
          }}
          rightComponent={
            <Button
              onPress={() => navigation.navigate('Settings')}
              type='clear'
              icon=<Icon name='settings' color='grey'/>
            />
          }
        />
      ),
    };
  };

  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      refreshing: false,
      posts: [],
    };
  }

  _onRefresh = () => {
    this.setState({ refreshing: true });
    this.sendRequest().then(() => {
      this.setState({ refreshing: false });
    });
  };

  async componentDidMount() {
    this.sendRequest();
  }

  sendRequest = async () => {
    let respUser, respPosts, resultUser, resultPosts;

    try {
      this.setState({
        uploading: true,
      });
      respUser = await requestCurrentUser();
      respPosts = await requestUserPosts();
      resultUser = await respUser.json();
      resultPosts = await respPosts.json();
    } catch (e) {
      console.log({ respUser });
      console.log({ respPosts });
      console.log({ e });
      alert('Upload failed');
    } finally {
      this.setState({
        user: JSON.parse(resultUser)[0].fields,
        posts: resultPosts,
        isLoading: false,
      });
    }
  };

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, padding: 20 }}>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <View style={{
        flex:1,
      }}>
        <View style={styles.container}>
          <ProfileInfo
            username={this.state.user.username}
            first_name={this.state.user.first_name}
            last_name={this.state.user.last_name}
            profileUri={url + this.state.user.profile_picture}
            bio={this.state.user.bio}
          />
        </View>
        <Divider />
        <FlatList style={styles.container}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
            />
          }
          data={this.state.posts}
          renderItem={({ item }) => (
            <FeedPost
              username={item.posted_by.username}
              profileUri={url + item.posted_by.profile_picture}
              likeCount={0}
              liked={false}
              photoUri={url + item.image}
              caption={item.caption}
            />
          )}
          keyExtractor={item => item.posted_by.username}
        />
      </View>
    );
  }
}

async function requestCurrentUser() {
  const userToken = await AsyncStorage.getItem('userToken');

  return fetch(url + '/api/users/currentuser/', {
    method: 'GET',
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      Authorization: 'Token ' + userToken,
    },
  });
}

async function requestUserPosts() {
  const userToken = await AsyncStorage.getItem('userToken');

  return fetch(url + '/api/posts/getuserposts/', {
    method: 'GET',
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      Authorization: 'Token ' + userToken,
    },
  });
}

const styles = StyleSheet.create({
  container: {
    flex: 0.2,
    justifyContent: 'flex-start',
  },
});
