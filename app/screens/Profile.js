import React, {Component} from 'react';
import {TouchableOpacity, Button, Text, View} from 'react-native';
import firebase from 'react-native-firebase';

class Profile extends React.Component{

    constructor() {
        super();
        //this.unsubscriber = null;
        this.state = {
          currentUser: null,
        };
    }

    //renderdan önce çalışan fonksiyon
    componentWillMount() {
        const { currentUser } = firebase.auth()
        this.setState({ currentUser })
    }

    signOut = () =>{
        //console.log("(Profile) Log out click!");
        firebase.auth().signOut();
        const { currentUser } = firebase.auth()
        this.setState({ currentUser })
        {this.props.navigation.navigate("Login")}
    }

    render(){
        const { currentUser } = this.state
        return(
            <View style={styles.container}>
                <Text style={styles.text}>Profile Screen</Text>
                <Text style={styles.text}>{currentUser.email}</Text>
                <Button title="Sign Out" onPress={this.signOut}/>
            </View>
        );
    }
}

const styles={
    container:{
        flex:1,
        backgroundColor:'#455a64',
        justifyContent:'center',
        alignItems:'center',
        marginTop:21,
    },
    text:{
        fontSize:24,
        color:'white'
    }
}


export default Profile;