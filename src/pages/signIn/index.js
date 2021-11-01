import React, {useState, useEffect} from "react";
import { CommonActions } from "@react-navigation/native";
import { SafeAreaView, StyleSheet, Image, Button, TouchableOpacity, Text, Alert, AsyncStorage } from "react-native";
import Spinner from 'react-native-loading-spinner-overlay';


import showAlert from "../../components/Alert";
import Input from "../../components/Input";
import { RemoveInappropriate } from "../funcs/filecorrector";
import { AuthUser } from "./signInAPI";
import getLocation from '../../services/getLocation';

import logo from '../../images/logo.png'

export default function SignIn({route, navigation}) {    
    let [nome, setName]= useState("");
    const [password, setPassword]= useState("");
    const [loading, setLoading] = useState(false);
    const [didMount, setDidMount] = useState(false); 
    const location = getLocation();

    useEffect(() => {
        setDidMount(true);
        return () => setDidMount(false);
    }, [])

    if(!didMount) {
        return null;
    }
    
    const startLoading = () => {
        setLoading(true);
    };
    const endLoading = () => {
        setLoading(false);
    }

    if(route.params != undefined) {
        const { user_name } = route.params;
        route.params = undefined;
        setName(user_name);
    }

    
    
    return (
        <SafeAreaView style={estilo.container}>
            <Spinner
                    visible={loading}
                    textStyle={estilo.spinnerTextStyle}
            />
            
            <SafeAreaView>
                <Image source={logo}/>
            </SafeAreaView>

            <Input label="Usuário" autoCorrect={false} autoCapitalize={'none'} value={nome} onChangeText={(text) => { setName(RemoveInappropriate(text)) }} placeholder="Digite o seu usuário" />
            <Input label="Senha" value={password} onChangeText={(text) => { setPassword(text) }} placeholder="Digite a sua senha" protected />
            
            <TouchableOpacity style={estilo.button} onPress={() => {
                if(nome == '' || password == '') {
                    return showAlert("Preenchimento obrigatório", "Você precisa preencher todos os campos");
                }

                startLoading();

                const login = AuthUser(nome, password);
                login.then((data) => {
                    if(data.data != undefined) {
                        if(data.data.length == 1) {
                            if(data.data[0].user_id) {

                                
                                
                                navigation.dispatch(
                                    CommonActions.reset({
                                        index: 0,
                                        routes: [
                                            {
                                                name: 'main',
                                                params: { 
                                                    user_id: data.data[0].user_id,
                                                    location: location
                                                }
                                            }
                                        ]
                                    })
                                )
                            }
                            else {
                                showAlert("Falha", "Não foi encontrado nenhuma conta com as credenciais informadas");
                            }
                        }
                        else {
                            showAlert("Falha", "Não foi encontrado nenhuma conta com as credenciais informadas");
                        }
                    }
                    else {
                        showAlert("Falha", "Não foi encontrado nenhuma conta com as credenciais informadas");
                    }

                    endLoading();
                }).catch((err) => {
                    console.log(err);

                    endLoading();
                })
            }}>
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
        alignItems: 'center',
        backgroundColor: '#e3e2dc'
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
    },
    spinnerTextStyle: {
        position: "absolute",
        zIndex: 1,
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#F5FCFF88",
    },
});