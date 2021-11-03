import React, {Component} from "react";
import { SafeAreaView, View, StyleSheet, Dimensions, Text, ScrollView } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Spinner from 'react-native-loading-spinner-overlay';

import NavBar from "../../../components/NavBarTop";
import moment from "moment";

//Icones
import { Octicons } from '@expo/vector-icons'; 
//-

//Components
import VincularESP from "../../../components/VincularESP";

//Funcs
import { LoadUserEsp } from "../home/homeAPI";
import { Button } from "react-native-elements/dist/buttons/Button";
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
            loading: false,
            InputVincular: false
        }
    }

    componentDidUpdate() {
        // this.reloadesp(this.state.user_id);
    }

    componentDidMount() {
        this.reloadesp(this.state.user_id);
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
                        <TouchableOpacity onPress={() => {
                            startLoading();
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
    startLoading() {
        this.setState({loading: true});
    }
    endLoading() {
        this.setState({loading: false});
    }
    //--

    async reloadesp(user_id) {
        console.log("Buscando ESps");
        this.startLoading();

        const data = await LoadUserEsp(this.state.user_id);
        this.setState({arrayDataESP: data.data});

        this.endLoading();
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
                    startLoading();
                }}
                fimLoading={() => {
                    endLoading();
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