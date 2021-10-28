import React from "react";
import { SafeAreaView, StyleSheet, Text, TextInput, Dimensions } from "react-native";
import { TextInputMask } from "react-native-masked-text";

export default function InputMask(prop) {
    return (
        <SafeAreaView>
            <Text style={estilo.label}>{prop.label}</Text>
            <TextInputMask style={estilo.input}
                type={prop.type}
                options={prop.options}
                value={prop.value}
                onChangeText={prop.onChangeText}
                placeholder={prop.placeholder}
                
            />
            
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