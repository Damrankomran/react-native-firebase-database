import React from 'react';
import {createBottomTabNavigator, createStackNavigator, createAppContainer, createSwitchNavigator} from 'react-navigation';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import Home from '../screens/Home';
import Profile from '../screens/Profile';
import Login from '../screens/Login';
import Loading from '../screens/Loading';

const tabBarIcon = name => ({ tintColor }) => (
    <MaterialIcons
      style={{ backgroundColor: 'transparent' }}
      name={name}
      color={tintColor}
      size={24}
    />
  );

  //App navigator
const TabNavigator = createBottomTabNavigator(
    {
        Home:{
            screen: Home,
            navigationOptions:{
                title: 'Home',
                tabBarIcon: tabBarIcon("home")
            }
        },     
        Profile:{
            screen: Profile,
            navigationOptions:{
                title: 'Profile',
                tabBarIcon: tabBarIcon("person"),
            }
        },
    },
    {
        tabBarOptions: {
            activeTintColor: 'white',
            inactiveTintColor: 'gray',
            style:{
                backgroundColor:'#1c313a'
            }
          },
    }
);

    //Login Navigator
const LoginStack = createStackNavigator({
    
    Login: {
      screen: Login,
        navigationOptions:{
            header: null
        }
    },
});

export default createAppContainer(createSwitchNavigator(
    {
        Loading: Loading,
        App: TabNavigator,
        Login: LoginStack
    }
));