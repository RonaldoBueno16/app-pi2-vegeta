import React from "react";
import { Image } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";


//import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

import home from './home/home';
import relatorio from './relatorio';

export default function Main({route, navigation}) {
    const auth_params = {
        user_id: route.params.user_id,
        location: route.params.location.coords
    }
    
    return (
        <Tab.Navigator
            initialRouteName="home"
            
            screenOptions={{
                tabBarActiveTintColor: "#1E90FF",
                tabBarLabelStyle: {
                    fontSize: 16,
                    marginBottom: 3
                },
                tabBarStyle: {
                    position: 'absolute',
                    height: 55
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
                        return <Ionicons name="home" size={size} color={color} />
                    }
                }}
                initialParams={auth_params}
            />
            <Tab.Screen 
                name="relatorio"
                component={relatorio} 
                options={{
                    headerShown: false,
                    tabBarLabel: "Notificações",
                    tabBarIcon: ({focused, color, size}) => {
                        return <Ionicons name="notifications" size={24} color={color} />
                    }
                }}
                initialParams={auth_params}
            />
        </Tab.Navigator>
    );
}