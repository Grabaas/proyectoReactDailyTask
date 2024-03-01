import React, { useState } from "react";
import { } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Tareas from "../Screens/Tareas";
import Notas from "../Screens/Notas";
import Home from "../Screens/Home";
import NuevasTareas from "../Screens/NuevasTareas";
import Profile from "../Screens/Perfil";
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

const HomeStack = createNativeStackNavigator();

    function BasicStack(){
        const [tasks, setTasks]=useState([]);
         const addTask = (newTask)=>{
            setTasks([...tasks, newTask]);
        };
         
        return(
            <HomeStack.Navigator initialRouteName="HomeScreen"> 

                <HomeStack.Screen name="HomeScreem" component={Home}/>

                <HomeStack.Screen name="Notas" component={Notas} options={{ headerBackTitleVisible:false }}/>

                <HomeStack.Screen name="Tareas" component={Tareas} options={{ headerBackTitleVisible:false }}/>

                <HomeStack.Screen name="NuevasTareas" component={NuevasTareas} options={{ headerBackTitleVisible:false }}/>


            </HomeStack.Navigator>
        );
    }

const Tab = createBottomTabNavigator ();
function MainStack(){
    return(
        <Tab.Navigator
            initialRouteName="Home"
            screenOptions={{
                tabBarActiveBackgroundColor: '#BDE038',
                tabBarInactiveBackgroundColor: '#A3AB78',
                tabBarActiveTintColor: '#10454F',
                tabBarInactiveTintColor: '#10454F'
            }}
        >
            <Tab.Screen
                name='Home'
                component={BasicStack}
                options={{ 
                    tabBarBadge: 5,
                    headerShown: false,
                    tabBarLabel:'Home',
                    tabBarIcon:()=>(
                        <FontAwesome name="home" size={24} color="black" />
                    )
                 }}
            />
              <Tab.Screen
                name='Profile'
                component={Profile}
                options={{ 
                    tabBarBadge: 5,
                    headerShown: false,
                    tabBarLabel:'Feed',
                    tabBarIcon:()=>(
                        <FontAwesome5 name="user-ninja" size={24} color="black" />
                    )
                 }}
            />
        </Tab.Navigator>
    )
}

export default function Navigation(){
    return(
        <NavigationContainer>
            <MainStack/>
        </NavigationContainer>    )
}