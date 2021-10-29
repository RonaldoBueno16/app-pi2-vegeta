import React, {useState} from "react";
import { SafeAreaView, StyleSheet, Image, Button, TouchableOpacity, Text } from "react-native";

import Input from "../../components/Input";
import { RemoveInappropriate } from "../funcs/filecorrector";

import logo from '../../images/logo.png'

export default function SignIn({route, navigation}) {    
    let [nome, setName]= useState("");
    const [password, setPassword]= useState("");

    if(route.params != undefined) {
        const { user_name } = route.params;
        nome = user_name;
        route.params = undefined;
    }

    return (
        <SafeAreaView style={estilo.container}>
            <SafeAreaView>
                <Image source={logo}/>
            </SafeAreaView>

            <Input label="Usuário" autoCorrect={false} autoCapitalize={'none'} value={nome} onChangeText={(text) => { setName(RemoveInappropriate(text)) }} placeholder="Digite o seu usuário" />
            <Input label="Senha" value={password} onChangeText={(text) => { setPassword(text) }} placeholder="Digite a sua senha" protected />
            
            <TouchableOpacity style={estilo.button} onPress={() => {}}>
                <Text style={estilo.labelbutton}>Conectar</Text>
            </TouchableOpacity>

            <SafeAreaView style={estilo.divnewaccount}>
                <Text style={{marginRight: 20}}>Não tem uma conta?</Text>
                <TouchableOpacity style={estilo.buttonnewaccount} onPress={() => {navigation.navigate('register')}}>
                    <Text>Criar</Text>
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