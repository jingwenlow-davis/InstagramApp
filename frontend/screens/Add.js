import React, { Component } from 'react';
import {
  ActivityIndicator,
  Button,
  Clipboard,
  Image,
  Share,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  AsyncStorage,
} from 'react-native';
import { url } from '../App.js';
import { Constants, ImagePicker, Permissions } from 'expo';
import t from 'tcomb-form-native';
import { Icon, Divider, Overlay, Header } from 'react-native-elements';
const Form = t.form.Form;

const Post = t.struct({
  caption: t.String,
  tags: t.maybe(t.String),
});

export default class AddScreen extends React.Component {
  static navigationOptions = {
    title: 'Add',
  };

  state = {
    image: null,
    uploading: false,
  };

  componentDidMount() {}

  render() {
    let { image } = this.state;
    let iconSize = 100;
    let iconColor = 'grey';

    return (
      <View
        style={{
          flex: 1,
        }}>
        <ScrollView style={styles.container}>
          <StatusBar barStyle="default" />
          <View>
            <TouchableOpacity onPress={this._pickImage}>
              <Icon name="photo-library" size={iconSize} color={iconColor} />
            </TouchableOpacity>
            <Text>Choose from gallery</Text>
            <Divider />
            <TouchableOpacity onPress={this._takePhoto}>
              <Icon name="photo-camera" size={iconSize} color={iconColor} />
            </TouchableOpacity>
            <Text>Take a new photo</Text>
          </View>

          {this._maybeRenderImage()}
        </ScrollView>
      </View>
    );
  }
  // {this._maybeRenderUploadingOverlay()}

  _maybeRenderUploadingOverlay = () => {
    if (this.state.uploading) {
      return (
        <ScrollView
          style={[StyleSheet.absoluteFill, styles.maybeRenderUploading]}>
          <ActivityIndicator color="#fff" size="large" />
        </ScrollView>
      );
    }
  };

  _maybeRenderImage = () => {
    let { image } = this.state;

    if (!image) {
      return;
    }

    return (
      <View>
        <View style={styles.maybeRenderContainer}>
          <View style={styles.maybeRenderImageContainer}>
            <Image
              source={{ uri: this.state.image }}
              style={styles.maybeRenderImage}
            />
          </View>
        </View>
        <Form ref={c => (this._form = c)} type={Post} />
        <Button
          title="POST"
          onPress={() => this._handleImagePicked(this.state.image, this._form)}
        />
      </View>
    );
  };

  _takePhoto = async () => {
    const { status: cameraPerm } = await Permissions.askAsync(
      Permissions.CAMERA
    );

    const { status: cameraRollPerm } = await Permissions.askAsync(
      Permissions.CAMERA_ROLL
    );

    // only if user allows permission to camera AND camera roll
    if (cameraPerm === 'granted' && cameraRollPerm === 'granted') {
      let pickerResult = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [1, 1],
      });

      // this._handleImagePicked(pickerResult);
      this.setState({ image: pickerResult.uri });
    }
  };

  _pickImage = async () => {
    const { status: cameraRollPerm } = await Permissions.askAsync(
      Permissions.CAMERA_ROLL
    );

    // only if user allows permission to camera roll
    if (cameraRollPerm === 'granted') {
      let pickerResult = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [1, 1],
      });

      // this._handleImagePicked(pickerResult);
      this.setState({ image: pickerResult.uri });
    }
  };

  _handleImagePicked = async (uri, form) => {
    const newForm = form.getValue();
    let uploadResponse, uploadResult;

    try {
      this.setState({
        uploading: true,
      });
      console.log(newForm);
      uploadResponse = await uploadImageAsync(uri, newForm);
      uploadResult = await uploadResponse.json();
    } catch (e) {
      console.log({ uploadResponse });
      console.log({ uploadResult });
      console.log({ e });
      alert('Upload failed');
    } finally {
      this.setState({
        uploading: false,
      });
      alert('Post Created');
    }
  };
}

async function uploadImageAsync(uri, form) {
  const userToken = await AsyncStorage.getItem('userToken');
  console.log(userToken);

  let uriParts = uri.split('.');
  let fileType = uriParts[uriParts.length - 1];

  let formData = new FormData();

  formData.append('caption', form.caption);
  formData.append('hashtags', form.tags);
  formData.append('image', {
    uri,
    name: `photo.${fileType}`,
    type: `image/${fileType}`,
  });

  let options = {
    method: 'POST',
    body: formData,
    headers: {
      Authorization: 'Token ' + userToken,
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    },
  };

  return fetch(url + '/api/posts/createpost/', options);
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  exampleText: {
    fontSize: 20,
    marginBottom: 20,
    marginHorizontal: 15,
    textAlign: 'center',
  },
  maybeRenderUploading: {
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
  },
  maybeRenderContainer: {
    borderRadius: 3,
    elevation: 2,
    marginTop: 30,
    shadowColor: 'rgba(0,0,0,1)',
    shadowOpacity: 0.2,
    shadowOffset: {
      height: 4,
      width: 4,
    },
    shadowRadius: 5,
    width: 250,
  },
  maybeRenderImageContainer: {
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
    overflow: 'hidden',
  },
  maybeRenderImage: {
    height: 250,
    width: 250,
  },
  // maybeRenderImageText: {
  //   paddingHorizontal: 10,
  //   paddingVertical: 10,
  // }
});

// https://github.com/expo/image-upload-example/blob/master/frontend/App.js
