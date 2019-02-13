import React from 'react';
import {
  StyleSheet,
  Button,
  Text,
  View,
} from 'react-native';
import {Header} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';



// Profile
export default class ProfileScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Profile',

      headerRight: (
        <Button
          onPress={() => navigation.navigate('Settings')}
          color="#000"
          // icon={
          //   <Icon
          //     name="arrow-right"
          //     size={15}
          //     color="white"
          //   />
          // }
          title="Settings"
        />
      ),
    };
  };


  render() {
    return (
      <View style={styles.container}>

        <Text>
          Profile will go here.
        </Text>

        <Button title="Go to settings" onPress={this._settings} />

      </View>
    );
  }

  _settings = () => {
    this.props.navigation.navigate('Settings');
  };


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
