import React, {Component} from "react";
import { SafeAreaView, View, StyleSheet, Dimensions, Text, ScrollView, Alert } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Spinner from 'react-native-loading-spinner-overlay';

import NavBar from "../../../components/NavBarTop";
import moment from "moment";

//Icones
import { Octicons } from '@expo/vector-icons'; 
//-

//Funções da API
import {DesvincularESP} from "./dispositivoAPI";
//--

//Components
import VincularESP from "../../../components/VincularESP";

//Funcs
import { LoadUserEsp } from "../home/homeAPI";
import showAlert from "../../../components/Alert";
//--

export default class Dispositivos extends Component {
    constructor(props) {
        super(props);

        const params = props.route.params;
        
        this.state = {
            user_id: params.user_id,
            nome: params.nome,
            location: params.location,

            //APP
            arrayDataESP: [],
            refresh: false,
            loading: false,
            InputVincular: false
        }
    }

    async componentDidUpdate() {
        if(!this.state.refresh) {
            this.state.refresh = true;
            await this.reloadesp(this.state.user_id, true);
        }
        else {
            this.state.refresh = false;
        }
    }

    async componentDidMount() {
        this.startLoading();
        await this.reloadesp(this.state.user_id, true);
        this.endLoading();
    }

    ListaESPs() {
        const elements = this.state.arrayDataESP.map((esp) => {
            return (
                <View style={{
                    marginTop: 10,
                    paddingHorizontal: 6,
                    paddingVertical: 3,
                    backgroundColor: "#FFFFFF88",
                    borderRadius: 5,
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                }}
                    key={esp.esp_index.toString()}
                >
                    <View style={{
                        flexDirection: 'column'
                    }}>
                        <Text style={{
                            fontSize: 12,
                            fontFamily: 'Rajdhani-Bold',
                        }}>Vinculado em: {moment(new Date(esp.esp_vinculacao)).format("DD/MM/YYYY - HH:MM")}</Text>
                        <Text style={{
                            fontSize: 22,
                            fontFamily: 'Rajdhani-Bold',
                        }}>{esp.esp_nome}</Text>
                    </View>
                    <View style={{
                        justifyContent: 'center',
                        paddingHorizontal: 5
                    }}>
                        <TouchableOpacity onPress={async () => {
                            this.startLoading();
                            const data = await DesvincularESP(this.state.user_id, esp.esp_index)
                            if(data.sucess) {
                                showAlert("Sucesso", data.data.message);
                            }
                            else {
                                showAlert("Erro", data.message);
                            }

                            this.state.refresh = true;
                            await this.reloadesp(this.state.user_id, true);
                            this.endLoading();
                        }}>
                            <Octicons name="diff-removed" size={24} color="#B22222" />
                        </TouchableOpacity>
                    </View>
                </View>
            );
        })
        
        return elements;
    }

    //Loading
    startLoading(refresh = true) {
        if(refresh) {
            this.setState({loading: true});
        }
        else {
            this.state.loading = true;
        }
    }
    endLoading(refresh = true) {
        if(refresh) {
            this.setState({loading: false});
        }
        else {
            this.state.loading = false;
        }
    }
    isLoading() {
        return this.state.loading;
    }
    //--

    async reloadesp(user_id, refrash) {
        // this.startLoading();

        const data = await LoadUserEsp(this.state.user_id);
        if(refrash) {
            this.setState({arrayDataESP: data.data});
        }
        else {
            this.state.arrayDataESP = data.data;
        }

        // this.endLoading();
    }
    
    render() {
        return (
        <SafeAreaView style={estilo.container}>
            <NavBar />
            <Spinner
                visible={this.state.loading}
            />

            <VincularESP 
                visible={this.state.InputVincular}
                user_id={this.state.user_id}
                location={{
                    latitude: this.state.location.latitude,
                    longitude: this.state.location.longitude
                }}
                onCloseModal={() => {
                    this.setState({InputVincular: false});
                }}
                inicioLoading={() => {
                    this.startLoading();
                }}
                fimLoading={() => {
                    this.endLoading();
                }}
                onUpdateESP={async (user_id) => {
                    //reloadesp(user_id);
                }}
            />

            <ScrollView>
                <SafeAreaView style={estilo.conteudo}>
                    <View style={{
                        borderRadius: 5,
                        backgroundColor: "#E3E2DCFF",
                        alignItems: 'center',
                        paddingVertical: 10,
                        paddingHorizontal: 5,
                        marginBottom: 10
                    }}>
                        <Text style={{textAlign: 'center', fontSize: 20, fontFamily: 'Rajdhani-Bold', paddingBottom: 5}}>Olá {this.state.nome}!</Text>
                        <Text style={{textAlign: 'center', fontFamily: 'Rajdhani-SemiBold'}}>Estão listados aqui todos os dispositivos vinculados à sua conta. Aqui você pode vincular novos dispositivos e desvincular os que você não utiliza mais!</Text>
                    </View>
                    
                    <TouchableOpacity style={{
                        alignItems: 'flex-end'
                    }}
                        onPress={() => {
                            this.setState({InputVincular: true});
                        }}
                    >
                        <Text style={{
                            backgroundColor: "#D7D1BD",
                            paddingHorizontal: 5,
                            paddingVertical: 2,
                            borderRadius: 10
                        }}>Vincular novo dispositivo</Text>
                    </TouchableOpacity>

                    {this.state.arrayDataESP.length == 0 && 
                        <Text style={{
                            marginVertical: 10,
                            textAlign: 'center',
                            borderRadius: 100,
                            paddingVertical: 5,
                            fontFamily: 'Rajdhani-Regular',
                            fontSize: 16,
                        }}>Você não tem nenhum dispositivo para ser exibido</Text>
                    }
                    {this.state.arrayDataESP.length > 0 &&
                        this.ListaESPs()
                    }
                </SafeAreaView>
            </ScrollView>

            
        </SafeAreaView>
        )
    }
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const estilo = StyleSheet.create({
    container: {
        backgroundColor: "#cdd8d9",
        flex: 1,
        width: windowWidth,
        marginBottom: 55,
        alignItems: 'center'
    },
    conteudo: {
        width: windowWidth*0.9,
        borderRadius: 5,
        marginBottom: 10,
        padding: 5
    },
});