import React from "react";
import { SafeAreaView, StyleSheet, Image, Button, TouchableOpacity, Text } from "react-native";

import Input from "../../components/Input";

import logo from '../../images/logo.png'

export default function SignUp({navigation}) {
    console.log("Exibindo SignUp");
    
    return (
        <SafeAreaView style={estilo.container}>
            <SafeAreaView>
                <Image source={logo}/>
            </SafeAreaView>

            <Input label="Usuário" placeholder="Digite o seu usuário" />
            <Input label="Email" placeholder="Digite o seu e-mail" />
            <Input label="Senha" placeholder="Digite a sua senha" protected />
            <Input label="Senha" placeholder="Confirme sua senha" protected />
            
            <TouchableOpacity style={estilo.button}>
                <Text style={estilo.labelbutton}>Registrar</Text>
            </TouchableOpacity>

            <SafeAreaView style={estilo.divnewaccount}>
                <Text style={{marginRight: 20}}>Já tem uma conta?</Text>
                <TouchableOpacity style={estilo.buttonnewaccount} onPress={() => navigation.navigate('login')}>
                    <Text>Conectar</Text>
                </TouchableOpacity>
            </SafeAreaView>
        </SafeAreaView>
    );
}

const estilo = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        backgroundColor: "#F5DEB3",
        paddingHorizontal: 100,
        paddingVertical: 10,
        marginTop: 30,
        borderRadius: 5
    },
    labelbutton: {
        fontSize: 16
    },
    divnewaccount: {
        marginTop: 40,
        flexDirection: "row",
    },
    buttonnewaccount: {
        backgroundColor: "#F5DEB3",
        paddingHorizontal: 20,
        borderRadius: 5
    }
});