import React from 'react';
import {
  Button,
  StatusBar,
  StyleSheet,
  Text,
  View,
  ListView,
  ScrollView,
  FlatList,
  ActivityIndicator,
  AsyncStorage,
  RefreshControl
} from 'react-native';
import { url } from '../App.js';
import t from 'tcomb-form-native';
import { ListItem, SearchBar, Header } from 'react-native-elements';
import { Constants } from 'expo';
import FeedPost from '../components/Feed';

import ProfileTile from '../components/ProfileComponent';
const Form = t.form.Form;

const Search = t.struct({
  search: t.String,
});

export default class ExploreScreen extends React.Component {
  static navigationOptions = {
    title: 'Explore',
  };
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      data: [],
      posts: false,
      error: null,
    };

    this.arrayholder = [];
  }

  componentDidMount() {
    this.makeRemoteRequest();
  }

  makeRemoteRequest = () => {
    this.setState({ loading: true });

    fetch(url + '/api/users/')
      .then(res => res.json())
      .then(res => {
        console.log(res);
        this.setState({
          data: res,
          error: res.error || null,
          loading: false,
        });
        this.arrayholder = res;
      })
      .catch(error => {
        this.setState({ error, loading: false });
      });
  };

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          backgroundColor: 'rgba(100, 100, 100, .1)',
        }}
      />
    );
  };

  searchFilterFunction = async text => {
    console.log(text);
    this.setState({
      value: text,
    });
    console.log(this.state.value)
    // if hashtag
    if(text[0] == '#'){
      let hashtag = text.slice(1);
      let resp, result;

      try {
        this.setState({
          uploading: true,
        });
        resp = await getHashtags(hashtag);
        result = await resp.json();
        console.log(result)
      } catch (e) {
        console.log({ resp });
        console.log({ result });
        console.log({ e });
        alert('Search failed');
      } finally {
        if (result.length > 0) {
          this.setState({
            posts: result,
            data: [],
          })
        }
        else this.setState({data:[]});
      }
    }

    else {
      const newData = this.arrayholder.filter(item => {
        const itemData = `${item.username.toUpperCase()}`;
        // ${item.name.first.toUpperCase()} ${item.name.last.toUpperCase()}`;
        const textData = text.toUpperCase();

        return itemData.indexOf(textData) > -1;
      });
      console.log(newData);
      this.setState({
        data: newData,
        posts: false
      });
    }
  };

  renderHeader = () => {
    return (
      <View>
        <Header
          placement="left"
          backgroundColor="#fff"
          centerComponent={{
            text: 'Explore',
            style: {
              color: '#FF7A89',
              fontSize: 22,
            },
          }}
        />
        <SearchBar
          placeholder="Type Here..."
          lightTheme
          round
          onChangeText={text => this.searchFilterFunction(text)}
          autoCorrect={false}
          value={this.state.value}
          platform="ios"
          cancelButtonProps={{
            color: "grey",
          }}
        />
      </View>
    );
  };

  _onRefresh = () => {
    alert("yuh")
  }


  render() {
    if (this.state.loading) {
      return (
        <View
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator />
        </View>
      );
    }
    if (this.state.posts) {
      return (
      <View style={{ flex: 1 }}>
        
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
          ListHeaderComponent={this.renderHeader}

        />
        
      </View>

      );
    }
    return (
      <View style={{ flex: 1 }}>
        <FlatList
          data={this.state.data}
          renderItem={({ item }) => (
            <ProfileTile
              username={item.username}
              first_name={item.first_name}
              last_name={item.last_name}
              navigation={this.props.navigation}
            />
          )}
          keyExtractor={item => item.username}
          ItemSeparatorComponent={this.renderSeparator}
          ListHeaderComponent={this.renderHeader}
        />
      </View>
    );
  }
}

async function getHashtags(hashtag) {
  const userToken = await AsyncStorage.getItem('userToken');

  return fetch(url + '/api/posts/?hashtags__hashtag=%23' + hashtag, {
    method: 'GET',
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      Authorization: 'Token ' + userToken,
    },
  });
}
// renderItem={
//   ({item}) =>
//     <ProfileTile
//       username={item.id}
//       first_name="Gerald"
//       last_name="Ogbert"
//     />
// }
const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   alignItems: 'center',
  //   paddingTop: 30,
  //   // justifyContent: 'center',
  // },
});
