import React, {useState} from "react";
import { SafeAreaView, StyleSheet, Image, Button, TouchableOpacity, Text, ScrollView, Dimensions, Alert } from "react-native";

import showAlert from "../../components/Alert";
import Input from "../../components/Input";
import InputMask from "../../components/InputMask";
import Select from "../../components/Select";
import { SubscriptionNewUser } from "./signUpAPI";

import logo from '../../images/logo.png'

import GetCep from '../../services/cep';

export default function SignUp({navigation}) {
    
    const [nome, setNome] = useState("");
    const [sobrenome, setSobrenome] = useState("");
    const [data, setData] = useState("");
    const [sexo, setSexo] = useState("");
    const [cep, setCep] = useState("");
    const [rua, setRua] = useState("");
    const [bairro, setBairro] = useState("");
    const [cidade, setCidade] = useState("");
    const [UF, setUF] = useState("");
    const [login, setLogin] = useState("");
    const [senha, setSenha] = useState("");
    
    return (
        <ScrollView>
            <SafeAreaView style={estilo.container}>
                <SafeAreaView>
                    <Image source={logo}/>
                </SafeAreaView>

                <Input label="Nome" value={nome} onChangeText={(text) => { setNome(text) }} placeholder="Nome" />
                <Input label="Sobrenome" value={sobrenome} onChangeText={(text) => { setSobrenome(text) }} placeholder="Sobrenome" />
                <InputMask type={'datetime'} options={{format: 'DD/MM/YYYY'}} label="Data de nascimento" value={data} onChangeText={(text) => { setData(text) }} placeholder="DD/MM/YYYY" />
                <Select label="Genero" selectedValue={sexo} onValueChange={(value) => {setSexo(value)}} itensSelect={[{'Masculino': 'M'}, {'Feminino': 'F'}]} />
                <InputMask type={'zip-code'} label="CEP" value={cep} onChangeText={(text) => {
                    setCep(text);
                    if(text.length == 9) {
                        const addres = GetCep(text);
                        addres.then((teste) => {
                            console.log(teste);
                            setBairro(teste.bairro);
                            setCidade(teste.localidade);
                            setUF(teste.uf);
                            setRua(teste.logradouro);
                        })
                    }
                }} placeholder="CEP" />
                <Input label="Rua" value={rua} onChangeText={(text) => { setRua(text) }} placeholder="Rua" />
                <Input label="Bairro" value={bairro} onChangeText={(text) => { setBairro(text) }} placeholder="Bairro" />
                <Input label="Cidade" value={cidade} onChangeText={(text) => { setCidade(text) }} placeholder="Cidade" />
                <Input label="Estado" value={UF} onChangeText={(text) => { setUF(text) }} placeholder="Estado" />
                <Input label="Login" value={login} onChangeText={(text) => { setLogin(text) }} placeholder="Login" />
                <Input label="Senha" value={senha} onChangeText={(text) => { setSenha(text) }} placeholder="Senha" protected/>

                <TouchableOpacity style={estilo.button} onPress={() => {
                    if(nome == '' || sobrenome == '' || data == '' || sexo == '' || cep == '' || rua == '' || bairro == '' || cidade == '' || UF == '' || login == '' || senha == '') {
                        return showAlert("Preenchimento obrigatório", "Você precisa preencher todos os campos");
                    }
                    
                    const sucess = SubscriptionNewUser(nome, sobrenome, sexo, data, cep, rua, bairro, cidade, UF, login, senha);
                    
                    sucess.then((value) => {
                        if(value.sucess) {
                            console.log("Conta criada com sucesso");
                            navigation.navigate('login');

                            showAlert("Sucesso!", "A sua conta foi criada com sucesso!");
                        }
                        else {
                            showAlert("Não foi possível criar a conta", value.message);
                        }
                    })
                }}>
                    <Text style={estilo.labelbutton}>Registrar</Text>
                </TouchableOpacity>

                <SafeAreaView style={estilo.divnewaccount}>
                    <Text style={{marginRight: 20}}>Já tem uma conta?</Text>
                    <TouchableOpacity style={estilo.buttonnewaccount} onPress={() => navigation.navigate('login')}>
                        <Text>Conectar</Text>
                    </TouchableOpacity>
                </SafeAreaView>
            </SafeAreaView>
        </ScrollView>
    );
}

const windowHeight = Dimensions.get('window').height;

const estilo = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: windowHeight/10,
        marginBottom: windowHeight/10,
        justifyContent: 'center',
        alignItems: 'center',
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