import React from "react";
import { Text, SafeAreaView, StyleSheet, StatusBar, Image, Dimensions } from "react-native";
import { useIsFocused } from '@react-navigation/native';

import logo from '../../images/logo.png'

export default function Main({route, navigation}) {
    console.log(route.params);
    
    return (
        <SafeAreaView style={estilo.container}>
            <StatusBar backgroundColor="#FF0000" />
            
            <SafeAreaView style={estilo.navbar}>
                <SafeAreaView style={estilo.area_image}>
                    <Image source={logo} style={{width: 126/2, height: 79/2,}}/>
                </SafeAreaView>
                
                <SafeAreaView style={estilo.areaTitle}>
                    <Text style={estilo.title}>Vegeta</Text>
                </SafeAreaView>
            </SafeAreaView>
        </SafeAreaView>
    );
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

console.log(windowWidth);

const estilo = StyleSheet.create({
    container: {
        flex: 1,
        width: windowWidth,
        height: windowHeight
    },
    navbar: {
        flexDirection: "row",
        height: 60,
        padding: 5,
        borderBottomWidth: 1
    },
    areaTitle: {
        marginLeft: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    area_image: {
        marginLeft: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        fontSize: 26
    }
});