import React from "react";
import { SafeAreaView, StyleSheet, Text, TextInput, Dimensions } from "react-native";

export default function Input(prop) {
    return (
        <SafeAreaView>
            <Text style={estilo.label}>{prop.label}</Text>
            <TextInput value={prop.value} autoCapitalize={prop.autoCapitalize} autoCorrect={prop.autoCorrect == undefined ? (false) : (prop.autoCorrect)} style={estilo.input} onChangeText={prop.onChangeText} placeholder={prop.placeholder} secureTextEntry={prop.protected == undefined ? (false) : true} />
            
        </SafeAreaView>
    )
}

const windowWidth = Dimensions.get('window').width;

const estilo = StyleSheet.create({
    label: {
        marginTop: 10,
        width: windowWidth*0.75
    },
    input: {
        width: windowWidth*0.75,
        padding: 2,
        textAlign: 'center',
        borderRadius: 1,
        borderWidth: 0.1,
        marginTop: 5
    }
});