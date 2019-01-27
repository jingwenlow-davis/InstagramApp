import * as React from 'react';
import { Text, View, StyleSheet, FlatList, ActivityIndicator } from 'react-native';

export default class AssetExample extends React.Component {
  constructor(props){
    super(props);
    this.state ={ isLoading: true}
  }

  componentDidMount(){
    // https://facebook.github.io/react-native/movies.json
    return fetch('/api/users/')
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          isLoading: false,
          dataSource: responseJson,
        }, function(){

        });

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
      <View style={{paddingTop:20}}>
        <Text style={styles.title}>
          All Users:
        </Text>

        <FlatList
          style={styles.paragraph}
          data={this.state.dataSource}
          renderItem={({item}) => <Text>{item.first_name} {item.last_name}</Text>}
          keyExtractor={({id}, index) => id}
        />

        <Text style={styles.title}>
          Greet the first User:
        </Text>
        <Text style={styles.paragraph}>Hello {this.state.dataSource[0].first_name} {this.state.dataSource[0].last_name}!</Text>

        <Text style={styles.paragraph}>Username: {this.state.dataSource[0].username}</Text>
        <Text style={styles.paragraph}>Email: {this.state.dataSource[0].email}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  paragraph: {
    marginLeft: 24,
    marginRight: 24,
    fontSize: 14,
    // fontWeight: 'bold',
    // textAlign: 'center',
  },
});
