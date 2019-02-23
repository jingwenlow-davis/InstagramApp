import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
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


 constructor(props){
    super(props);
    this.state ={ isLoading: true }
  }



async componentDidMount(){
  const userToken = await AsyncStorage.getItem('userToken');

  fetch('https://rude-bird-15.localtunnel.me/api/users/currentuser/', {
    method: 'GET',
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      Authorization: 'Token ' + userToken,
      // 'X-CSRFToken': csrfToken
    }
  }).then((response) => response.json())
    .then((responseJson) => {
      console.log(responseJson)
      this.setState({
        isLoading: false,
        user: responseJson,
      }, function(){});
    })
    .catch((error) =>{
      console.error(error);
    });
}

  render() {
    if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>
      )
    }

    return (
      <View style={styles.container}>

        <Text>Profile will go here.</Text>
        <Text>Username: {this.state.user[0].model}</Text>
        <Text>First Name: {this.state.user[0].first_name}</Text>
        <Text>Last Name: {this.state.user[0].last_name}</Text>
        <Text>Email: {this.state.user[0].email}</Text>
        <Text>Gender: {this.state.user[0].gender}</Text>
        <Button title="Go to settings" onPress={this._settings} />

      </View>
    );
  }

  _settings = () => {
    this.props.navigation.navigate('Settings');
  };


}



        // <Text>Username: {this.state.user[0].username}</Text>
        // <Text>First Name: {this.state.user[0].first_name}</Text>
        // <Text>Last Name: {this.state.user[0].last_name}</Text>
        // <Text>Email: {this.state.user[0].email}</Text>
        // <Text>Gender: {this.state.user[0].gender}</Text>

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
