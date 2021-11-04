import React from "react";
import { Image } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";


//import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Ionicons } from '@expo/vector-icons';

import homeicon from '../../images/home.png';
import espcreate from '../../images/espcreate.png';
import config from '../../images/config.png'
import { FontAwesome5 } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

import home from './home/home';
import Dispositivos from "./dispositivos/dispositivo";
import configs from "./configs/config";
import plantas from "./plantas/plantas";

export default function Main({route, navigation}) {
    let localizacao = route.params.location;
    if(localizacao == null) {
        console.log("Sem localização");
        localizacao = {
            latitude: -20.1903861,
            longitude: -40.2656685
        }
    }
    else {
        localizacao = {
            latitude: localizacao.coords.latitude,
            longitude: localizacao.coords.longitude
        };

        console.log(localizacao);
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
            <Tab.Screen 
                name="plantas"
                component={plantas} 
                options={{
                    headerShown: false,
                    tabBarLabel: "Plantas",
                    tabBarIcon: ({focused, color, size}) => {
                        return <FontAwesome5 name="seedling" size={24} color="#00000066" />
                    }
                }}
                initialParams={auth_params}
            />
            <Tab.Screen 
                name="configs"
                component={configs} 
                options={{
                    headerShown: false,
                    tabBarLabel: "Configurar",
                    tabBarIcon: ({focused, color, size}) => {
                        return <Image source={config}/>
                    }
                }}
                initialParams={auth_params}
            />
        </Tab.Navigator>
    );
}