import React, {Component} from 'react';
import 
    {
     TouchableOpacity,
     Button,
     Text,
     View,
     FlatList,
     Platform,
     TextInput
    } from 'react-native';
import firebase from 'react-native-firebase';

const iosConfig = {
   
};

const androidConfig = {

}

const animalApp = firebase.initializeApp(
    
    Platform.OS === 'ios' ? iosConfig : androidConfig,
    'animalApp'
);

const rootRef = firebase.database().ref();
const animalRef = rootRef.child('animals');

class Home extends React.Component{

    constructor() {
        super();
        //this.unsubscriber = null;
        this.state = {
          currentUser: null,
          animals: [],
          newAnimalName: '',
          loading: false,
        };
    }

    //renderdan önce çalışan fonksiyon
    componentWillMount() {
        const { currentUser } = firebase.auth()
        this.setState({ currentUser });
        //console.log("(Home)Will Mount Current User -->" +JSON.stringify(currentUser));

        animalRef.on('value', (childSnapshot)=>{
            const animals = [];
            childSnapshot.forEach((doc)=>{
                animals.push({
                    key:doc.key,
                    animalName: doc.toJSON().animalName
                });
                this.setState({
                    animals: animals.sort((a,b)=>{
                        return (a.animalName < b.animalName);
                    }),
                    loading: false,
                });
            });
        });
    }

    onPressAdd = () => {
        if(this.state.newAnimalName.trim() === ''){
            alert('Animal name is blank');
            return
        }
        animalRef.push({
            animalName: this.state.newAnimalName
        });
    }

    
    render(){
        const { currentUser } = this.state
        //console.log("(Home)Render current User -->" +JSON.stringify(currentUser));
        
        return(
            <View style={styles.container}>
                <View style={styles.header}>
                    <TextInput
                        style={styles.input}
                        keyboardType="default"
                        placeholder='Enter a animal name'
                        placeholderTextColor="black"
                        autoCapitalize="none"
                        onChangeText={
                            (text)=>{
                                this.setState({newAnimalName:text});
                            }
                        }
                        value={this.state.newAnimalName}
                    >

                    </TextInput>
                    <Button 
                        title="Ekle" 
                        onPress={this.onPressAdd}
                    />
                </View>
                <View style={styles.list}>
                    <FlatList
                        data={this.state.animals}
                        renderItem={({item, index}) => {
                            return(
                                <Text style={{
                                    fontSize:20,
                                    fontWeight:'bold',
                                    margin:10,
                                    borderRadius:26,
                                    backgroundColor:'white'
                                }}> {item.animalName}</Text>
                            );
                        }}
                    >

                    </FlatList>
                </View>
                
            </View>
        );
    }
}

const styles={
    container:{
        flex:1,
        backgroundColor:'#455a64',
        marginTop:21,
    },
    header:{
        flex:1,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'flex-end'
    },
    list:{
        flex: 5,
        
    },
    input:{
        height:40,
        width:300,
        borderRadius:25,
        color:'black',
        backgroundColor:'white',
        margin: 10,
        padding: 10,
        borderWidth:1,
        borderColor:'white'
    }
}


export default Home;
