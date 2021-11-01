import React from "react";
import { Text, SafeAreaView, StyleSheet, StatusBar, Image, Dimensions, TouchableOpacity } from "react-native";

import logo from '../../images/logo.png';
import montanha from '../../images/montanha.png';

export default function Relatorio({route, navigation}) {    
    
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

const estilo = StyleSheet.create({
    container: {
        backgroundColor: "#cdd8d9",
        flex: 1,
        width: windowWidth,
        height: windowHeight
    },
    navbar: {
        flexDirection: "row",
        height: 60,
        padding: 5,
        left: 10,
        borderRadius: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#9ea6a1ff',
        width: "95%"
    },
    area_image: {
        marginLeft: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    areaTitle: {
        marginLeft: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        fontSize: 24,
        color: "#303333",
        fontFamily: 'Rajdhani-Regular'
    },
    boxfundo: {
        marginTop: 20,
        width: windowWidth,
        alignItems: 'center',
    },
    boxdentro: {
        alignItems: 'center',
        backgroundColor: "#e3e2dc",
        borderRadius: 5,
        padding: 15,
        width: windowWidth*0.85
    },
    vincularesp: {
        alignItems: 'center',
        backgroundColor: "#e3e2dc",
        borderRadius: 5,
        padding: 15,
        width: windowWidth*0.85
    },
    buttonVincular: {
        marginTop: 10,
        width: "100%",
        alignItems: 'flex-end'
    },
    vincularLabel: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        textAlign: 'center',
        backgroundColor: '#d7d1bd',
        borderRadius: 5,
        fontFamily: 'Rajdhani-Regular',
        fontSize: 16
    }
});