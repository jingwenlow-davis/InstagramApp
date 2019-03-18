import React from 'react';
import {
  AsyncStorage,
  Button,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  RefreshControl
} from 'react-native';
import {url} from '../App.js';

import { Avatar, Header, Icon } from 'react-native-elements';
import FeedPost from '../components/Feed';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Home',
  };

  // Hashtages example
  // let users = ourStore.users;
  // let stringWithUsername = "Hello #efog, how do you feel today?";

  // let processed = processString([{
  //     regex: /\#([a-z0-9_\-]+?)( |\,|$|\.)/gim, //regex to match a username
  //     fn: (key, result) => {
  //         let username = result[1];
  //         let foundUsers = users.filter(user => user.username === username);

  //         if (!foundUsers.length)
  //             return result[0]; //@username

  //         return <a key={key} href={`/user/${username}`}>@{username}</a>;
  //     }
  // }]);


  constructor(props) {
      super(props);

      this.state = {
        refreshing: false,
        loading: true,
        posts: [],
      };
    }


  _onRefresh = () => {
    this.setState({refreshing: true});
    this.makeRemoteRequest().then(() => {
      this.setState({refreshing: false});
    });
  }

  async componentDidMount() {
    this.makeRemoteRequest();
  }

  makeRemoteRequest = async () => {
    const userToken = await AsyncStorage.getItem('userToken');

    fetch(url + '/api/posts/getfeed/', {
      method: 'GET',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        Authorization: 'Token ' + userToken,
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        this.setState(
          {
            loading: false,
            posts: responseJson,
          },
        );
      })
      .catch(error => {
        console.error(error);
      }); 
    
    }



  render() {
    if (this.state.loading) {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator />
        </View>
      );
    }
    return (
      <View>
        <Header
          backgroundColor="#fff"
          placement="center"
          centerComponent={{
            text: 'Pretty Near',
            style: {
              color: '#FF7A89',
              fontSize: 30,
            },
          }}
        />
        
        <FlatList
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
            />
          }
          data={this.state.posts}
          renderItem={({item}) => 
          <FeedPost
              username={item.posted_by.username}
              profileUri={url + item.posted_by.profile_picture}
              likeCount={0}
              liked={false}
              photoUri={url + item.image}
              caption={item.caption}
              hashtags={item.hashtags}
            />
          }
          keyExtractor={item => item.posted_by.username}
        />
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  // container: {
  //   alignItems: 'flex-start',
  //   justifyContent: 'flex-start',
  // },
});
