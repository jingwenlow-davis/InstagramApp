import React from 'react';
import {
  // Button,
  StatusBar,
  StyleSheet,
  Text,
  View,
  ListView,
  ScrollView,
  FlatList,
  ActivityIndicator,
  AsyncStorage,
} from 'react-native';
import { url } from '../App.js';
import t from 'tcomb-form-native';
import {
  ListItem,
  SearchBar,
  Header,
  Icon,
  Button,
} from 'react-native-elements';

import ProfileTile from '../components/ProfileComponent';
const Form = t.form.Form;

const Search = t.struct({
  search: t.String,
});

export default class MessagesScreen extends React.Component {
  static navigationOptions = {
    title: 'Messages',
    header: navigationProps => (
      <Header
        placement="left"
        backgroundColor="#fff"
        centerComponent={{
          text: 'Messages',
          style: {
            color: '#FF7A89',
            fontSize: 22,
          },
        }}
      />
    ),
  };

  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      data: [],
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
          width: '86%',
          backgroundColor: '#CED0CE',
          marginLeft: '14%',
        }}
      />
    );
  };

  searchFilterFunction = text => {
    console.log(text);
    this.setState({
      value: text,
    });

    const newData = this.arrayholder.filter(item => {
      const itemData = `${item.username.toUpperCase()}`;
      // ${item.name.first.toUpperCase()} ${item.name.last.toUpperCase()}`;
      const textData = text.toUpperCase();

      return itemData.indexOf(textData) > -1;
    });
    console.log(newData);
    this.setState({
      data: newData,
    });
  };

  renderHeader = () => {
    return (
      <SearchBar
        placeholder="Type Here..."
        lightTheme
        round
        onChangeText={text => this.searchFilterFunction(text)}
        autoCorrect={false}
        value={this.state.value}
        platform="ios"
        cancelButtonProps={{
          color: 'grey',
        }}
      />
    );
  };

  _openMessages = async (navigation, username) => {
    navigation.navigate('Chat', { username: username });
  };

  render() {
    if (this.state.loading) {
      return (
        <View
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator />
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
              onPress={() =>
                this._openMessages(
                  this.props.navigation,
                  // item.first_name + ' ' + item.last_name,
                  item.username
                )
              }
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

// const styles = StyleSheet.create({
// //
// });
