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
  RefreshControl,
} from 'react-native';
import { url } from '../App.js';
import { Header } from 'react-native-elements';
import { GiftedChat } from 'react-native-gifted-chat'; // 0.3.0

type Props = {
  name?: string,
};

export default class ChatScreen extends React.Component<Props> {
  static navigationOptions = ({ navigation }) => ({
    // put name of user we are chatting with
    title: 'Chat',
    header: navigationProps => (
      <Header
        placement="left"
        backgroundColor="#fff"
        centerComponent={{
          text: 'Chat with ' + navigation.getParam('username'),
          style: {
            color: '#FF7A89',
            fontSize: 22,
          },
        }}
      />
    ),
  });

  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      messages: [],
    };
  }

  async componentDidMount() {
    this.sendRequest();
  }

  sendRequest = async () => {
    let receiver = this.props.navigation.getParam('username');
    let respUser, respMessages, resultUser, resultMessages;

    try {
      this.setState({
        uploading: true,
      });
      respUser = await requestCurrentUser();
      respMessages = await requestMessages(receiver);
      resultUser = await respUser.json();
      resultMessages = await respMessages.json();
    } catch (e) {
      console.log({ respUser });
      console.log({ respMessages });
      console.log({ e });
    } finally {
      this.setState(previousState => ({
        user: {
          _id: JSON.parse(resultUser)[0].pk,
          name: JSON.parse(resultUser)[0].fields.username,
        },
        isLoading: false,
        messages: GiftedChat.append(previousState.messages, resultMessages),
      }));
    }
  };

  _sendmessage = async messages => {
    const userToken = await AsyncStorage.getItem('userToken');
    let message = {
      received_by: this.props.navigation.getParam('username'),
      content: messages[0].text,
    };

    // console.log(message)

    fetch(url + '/api/messages/sendmessage/', {
      method: 'POST',
      headers: {
        Authorization: 'Token ' + userToken,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    })
      .then(response => {
        if (response.status != 200) {
          alert('Something went wrong while sending your message');
        }
        return response.json();
      })
      .then(async responseJson => {
        console.log('data: ', responseJson);
        this.setState(previousState => ({
          messages: GiftedChat.append(previousState.messages, [responseJson]),
        }));
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={this._sendmessage}
        user={this.state.user}
      />
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

async function requestMessages(receiver) {
  console.log(receiver);
  const userToken = await AsyncStorage.getItem('userToken');
  // let receiver = this.state.receiver
  // console.log(receiver)

  return fetch(url + '/api/messages/getmessages/', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Token ' + userToken,
    },
    body: JSON.stringify({
      received_by: receiver,
    }),
  });
}
