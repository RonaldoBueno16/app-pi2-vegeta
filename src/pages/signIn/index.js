import React, {useState, useEffect} from "react";
import { CommonActions } from "@react-navigation/native";
import { SafeAreaView, StyleSheet, Image, Button, TouchableOpacity, Text, Alert,Dimensions } from "react-native";
import Spinner from 'react-native-loading-spinner-overlay';

import { CheckBox } from "react-native-elements";

import showAlert from "../../components/Alert";
import Input from "../../components/Input";
import { RemoveInappropriate } from "../funcs/filecorrector";
import { AuthUser } from "./signInAPI";
import getLocation from '../../services/getLocation';

import AsyncStorage from "@react-native-async-storage/async-storage";

import logo from '../../images/logo.png'

export default function SignIn({route, navigation}) {    
    let [nome, setName]= useState("");
    const [password, setPassword]= useState("");
    const [loading, setLoading] = useState(false);
    const [didMount, setDidMount] = useState(false); 
    const location = getLocation();

    const [isSelected, setSelection] = useState(false);

    useEffect(() => {
        AddStorageData();
        setDidMount(true);
        return () => {
            setDidMount(false)
        };
    }, [])

    async function AddStorageData() {
        if(!didMount) {
            const saveCredentials = await AsyncStorage.getItem('@save_credentials');
            if(saveCredentials != null) {
                setSelection(saveCredentials);
                const storageNickName = await AsyncStorage.getItem('@last_username');
                const storagePassword = await AsyncStorage.getItem('@last_password');
        
                if(storageNickName != null) {
                    setName(storageNickName);
                    setPassword(storagePassword);
                }
            }
        }
    }

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
            <CheckBox 
                title="Salvar as credenciais"
                checkedIcon="check-square"
                uncheckedIcon="minus-square"
                checkedColor="green"
                uncheckedColor="red"
                checked={isSelected}
                onPress={() => {
                    setSelection(!isSelected);
                    AsyncStorage.setItem('@save_credentials', isSelected.toString());
                }}
                containerStyle={{
                    borderWidth: 0,
                    backgroundColor: null,
                    width: Dimensions.get('window').width*0.8,
                    alignItems: 'flex-end'
                }}
                textStyle={{
                    fontFamily: 'Rajdhani-Regular',
                    fontWeight: '100'
                }}
                iconRight
            />
            
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
                                AsyncStorage.setItem('@last_username', nome);
                                AsyncStorage.setItem('@last_password', password);
                                
                                navigation.dispatch(
                                    CommonActions.reset({
                                        index: 0,
                                        routes: [
                                            {
                                                name: 'main',
                                                params: { 
                                                    nome: `${data.data[0].user_name} ${data.data[0].user_sobrenome}`,
                                                    nascimento: data.data[0].user_nascimento,
                                                    user_id: data.data[0].user_id,
                                                    address: {
                                                        bairro: data.data[0].user_bairro,
                                                        cep: data.data[0].user_cep,
                                                        cidade: data.data[0].user_cidade,
                                                        uf: data.data[0].user_uf
                                                    },
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
        marginTop: 10,
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