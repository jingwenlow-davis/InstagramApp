import React from 'react';
import { StyleSheet, Text, View, Button, ScrollView,Image} from 'react-native';
import ImageBrowser from './image/ImageBrowser';
import t from 'tcomb-form-native';

const Form = t.form.Form;

const Post = t.struct({
  caption: t.String,
  tags: t.String,
});


export default class AddScreen extends React.Component {
  static navigationOptions = {
    title: 'Add',
  };

  constructor(props) {
    super(props);
    this.state = {
      imageBrowserOpen: true,
      photos: []
    }
  }

  imageBrowserCallback = (callback) => {
    callback.then((photos) => {
      console.log(photos)
      this.setState({
        imageBrowserOpen: false,
        photos
      })
    }).catch((e) => console.log(e))
  }

  renderImage(item, i) {
    return(
      <Image
        style={{height: 350, width: 350}}
        source={{uri: item.file}}
        key={i}
      />
    )
  }

  render() {
    if (this.state.imageBrowserOpen) {
      return(<ImageBrowser max={1} callback={this.imageBrowserCallback}/>);
    }
    return (
      <View style={styles.container}>
        <View style={{alignItems: 'center'}}>
          {this.state.photos.map((item,i) => this.renderImage(item,i))}
        </View>
        <Button
          title="Change Image"
          onPress={() => this.setState({imageBrowserOpen: true})}
        />
        <Form
          ref={c => this._form = c}
          type={Post}
        />
        <Button
          title="POST"
          onPress={this._postPic}
        />
      </View>
    );
  }

  _postPic() {
    const data = new FormData();
    data.append('name', 'testName'); // you can append anyone.
    data.append('photo', {
      uri: photo.uri,
      type: 'image/jpeg', // or photo.type
      name: 'testPhotoName'
    });
    fetch(url, {
      method: 'post',
      body: data
    }).then(res => {
      console.log(res)
    });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    padding: 20,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
