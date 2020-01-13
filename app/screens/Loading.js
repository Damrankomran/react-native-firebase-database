import React, { Component } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import firebase from 'react-native-firebase';

export default class Loading extends Component {
    constructor() {
        super();

        this.state = {
          currentUser: null,
        };
    }

    //Uygulama ilk başlatıldığında bu screen açılır ve kontrol eder.
    componentDidMount() {
        const { currentUser } = firebase.auth()
        this.setState({ currentUser })
        console.log("(Loading)Did Mount Current User -->" +JSON.stringify(currentUser));
        
        this.props.navigation.navigate(currentUser ? 'App' : 'Login');
    }

  render() {
    return (
      <View style={styles.container}>
        <Text style={{color:'#e93766', fontSize: 40}}>Loading</Text>
        <ActivityIndicator color='#e93766' size="large" />
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#455a64',
    justifyContent: 'center',
    alignItems: 'center',
  }
});