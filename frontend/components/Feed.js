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
} from 'react-native';

import { Avatar, Header, Icon } from 'react-native-elements';

function getFavoriteButtonIcon(liked) {
  if (liked) {
    return 'favorite';
  }
  return 'favorite-border';
}

function changeLikes(liked, likeCount) {
  if (liked) {
    return ++likeCount;
  }
  return --likeCount;
}

export default class FeedPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      liked: this.props.liked,
      likeCount: this.props.likeCount,
    };
  }

  render() {
    return (
      <View
        style={{
          width: '100%',
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
          paddingBottom: 80,
        }}>
        <Header
          containerStyle={{
            height: 50,
            paddingTop: 0,
          }}
          backgroundColor="#fff"
          placement="left"
          leftComponent={
            <Avatar
              rounded
              source={{
                uri: this.props.profileUri,
              }}
            />
          }
          centerComponent={{
            text: this.props.username,
            style: {
              fontSize: 20,
            },
          }}
        />
        <View
          style={{
            width: '100%',
            aspectRatio: 1,
            backgroundColor: '#fff',
          }}>
          <Image
            style={{
              aspectRatio: 1,
              flex: -1,
              resizeMode: 'contain',
            }}
            source={{uri: this.props.photoUri}}
          />
        </View>
        <Header
          containerStyle={{
            height: 50,
            paddingTop: 0,
          }}
          backgroundColor="#fff"
          placement="left"
          leftComponent={
            <Icon
              name={getFavoriteButtonIcon(this.state.liked)}
              type="material"
              onPress={() => {
                this.setState({
                  liked: !this.state.liked,
                  likeCount: changeLikes(!this.state.liked, this.state.likeCount)
                });
              }}
            />
          }
          centerComponent={{
            text: this.state.likeCount,
            style: {
              fontSize: 20,
            },
          }}
        />
        {/* Likes and message button*/}

        <Text
          style={{
            fontSize: 20,
            padding: 5,
            // flex:1
          }}>
          {this.props.caption}
        </Text>
      </View>
    );
  }
}
