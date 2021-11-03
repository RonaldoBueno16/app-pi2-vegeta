import React from "react";
import { Image } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";


//import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Ionicons } from '@expo/vector-icons';

import homeicon from '../../images/home.png';
import espcreate from '../../images/espcreate.png';

const Tab = createBottomTabNavigator();

import home from './home/home';
import Dispositivos from "./dispositivos/dispositivo";

export default function Main({route, navigation}) {
    let localizacao = route.params.location;
    if(route.params.location == null) {
        localizacao = null;
    }
    else {
        localizacao = {
            latitude: route.params.location.coords.latitude,
            longitude: route.params.location.coords.longitude
        };
    }

    

    
    const auth_params = {
        user_id: route.params.user_id,
        nome: route.params.nome,
        nascimento: route.params.nascimento,
        address: route.params.address,
        location: localizacao
    }
    
    return (
        <Tab.Navigator
            initialRouteName="home"
            
            screenOptions={{
                tabBarActiveTintColor: "#1E90FF",
                tabBarLabelStyle: {
                    fontSize: 18,
                    fontFamily: 'Rajdhani-Bold',
                },
                tabBarStyle: {
                    position: 'absolute',
                    height: 55,
                    paddingTop: 5,
                    backgroundColor: "#E4E4DE"
                }
                
            }}
        >
            <Tab.Screen 
                name="home"
                component={home} 
                options={{
                    headerShown: false,
                    tabBarLabel: "Início",
                    tabBarIcon: ({focused, color, size}) => {
                        return <Image source={homeicon}/>
                        // return <Ionicons name="home" size={size} color={color} />
                    }
                }}
                listeners={({navigation, route}) => ({
                    tabPress: (e) => {
                        // e.preventDefault();
                    }
                })}
                
                initialParams={auth_params}
            />
            <Tab.Screen 
                name="dispositivos"
                component={Dispositivos} 
                options={{
                    headerShown: false,
                    tabBarLabel: "Dispositivos",
                    tabBarIcon: ({focused, color, size}) => {
                        return <Image source={espcreate}/>
                    }
                }}
                initialParams={auth_params}
            />
        </Tab.Navigator>
    );
}