import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, SafeAreaView, View, Image, Text, TextInput, TouchableOpacity } from 'react-native';

import logo from "./assets/images/logo.png"

export default function App() {
    return (
        <SafeAreaView style={styles.container}>
            <Image source={logo} style={styles.styleimage} />

            <TextInput defaultValue="LOGIN" style={styles.input}/>
            <TextInput defaultValue="SENHA" style={styles.input}/>

            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Conectar</Text>
            </TouchableOpacity>
            <View style={styles.viewDisplay}>
                <Text>Não possuí login?</Text>
                <TouchableOpacity style={styles.buttonCadastro}>
                    <Text style={styles.buttonText}>cadastre aqui</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#B0E0E6',
        alignItems: 'center',
        justifyContent: 'center',
    },

    styleimage: {
        marginBottom: 30,
    },
    
    viewDisplay: {
        flexDirection: "row",
        marginTop: 40
    },

    buttonCadastro: {
        marginLeft: 20,
        backgroundColor: "#FFFFFF",
        width: "35%",
        padding: 5,
        borderRadius: 20
    },

    button: {
        backgroundColor: "#F5DEB3",
        width: "50%",
        marginTop: 35,
        padding: 5,
        borderRadius: 10
    },

    buttonText: {
        textAlign: "center",
    },

    input: {
        width: "80%",
        textAlign: "center",
        justifyContent: "center",
        marginTop: 10,
        borderRadius: 10,
        borderWidth: 1,
        padding: 5
        
    }
});
