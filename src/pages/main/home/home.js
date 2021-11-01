import React, { useState, useEffect } from "react";
import { Text, SafeAreaView, View, StyleSheet, StatusBar, Image, Dimensions, TouchableOpacity, Modal, Alert, ScrollView } from "react-native";
import {Picker} from '@react-native-picker/picker';
import { TextInput } from "react-native-gesture-handler";
import * as Location from 'expo-location';
import Spinner from 'react-native-loading-spinner-overlay';

//Icones
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons'; 
import parcialmente_nublado from '../../../images/lista_esps/parcialmente_nublado.png'
//---

import logo from '../../../images/logo.png';
import montanha from '../../../images/montanha.png';
import showAlert from "../../../components/Alert";

import Mapa from '../../../components/Mapa';

import { BindESP, LoadUserEsp, LoadRegESP } from "./homeAPI";

export default function Home({route, navigation}) {    
    const state = {
        user_id: route.params.user_id,
        location: route.params.location
    }
    
    const [InputVincular, setInputVincular] = useState(false);
    const [ESP_KEY, setESP_KEY] = useState("");
    const [Containerbind, showBind] = useState(false);
    const [bindLatitude, setBindLatitude] = useState(state.location.latitude);
    const [bindLongitude, setBindLongitude] = useState(state.location.longitude);
    const [pageLoaded, setLoaded] = useState(false);
    const [userESPs, setESP] = useState([]);
    const [espSelected, setEspSelect] = useState(-1);
    const [loading, setLoading] = useState(false);

    //Vars do ESP selecionado pelo usuário
    const [InESPData, setInESPData] = useState(false);
    const [arrayEspData, setarrayEspData] = useState([]);
    const [coordsESPSelect, setcoordsESPSelect] = useState({latitude: null, longitude: null});
    //----
    
    const startLoading = () => {
        setLoading(true);
    };
    const endLoading = () => {
        setLoading(false);
    }

    useEffect(() => {
        if(!pageLoaded) {
            reloadesp(state.user_id);
        }
    }, [])

    async function reloadesp(user_id) {
        startLoading();

        const data = await LoadUserEsp(state.user_id);

        if(data.data.length == 0) {
            showBind(true);
        }
        else {
            showBind(false);
            setESP(data.data);
        }
        setLoaded(true);
        
        endLoading();
    }

    async function loadESPReg(esp_id) { //Lista todos os registros desse ESP (Resposta: [ {data_registro: '01/11/2021', registros: 54}, {data_registro: '02/11/2021', registros: 32} ])
        startLoading();

        const data = await LoadRegESP(state.user_id, esp_id);
        const dados = data.data;

        if(dados.latitude != null && dados.longitude != null) {
            setcoordsESPSelect({
                latitude: dados.latitude,
                longitude: dados.longitude
            });
        }
        
        if(dados.registros.length) {
            setInESPData(true);
            setarrayEspData(dados.registros);
        }
        else {
            setInESPData(false);
        }
        
        endLoading();
    }
    
    return (
        <SafeAreaView style={estilo.container}>
            <Spinner
                    visible={loading}
                    textStyle={estilo.spinnerTextStyle}
            />
            
            <StatusBar backgroundColor="#cdd8d9" />
            
            <SafeAreaView style={estilo.navbar}>
                <SafeAreaView style={estilo.area_image}>
                    <Image source={logo} style={{width: 126/2, height: 79/2,}}/>
                </SafeAreaView>
                
                <SafeAreaView style={estilo.areaTitle}>
                    <Text style={estilo.title}>Vegeta</Text>
                </SafeAreaView>
            </SafeAreaView>


            <Modal
                animationType="slide"
                transparent={true}
                visible={InputVincular}
                onRequestClose={() => {
                    setInputVincular(false);
                }}>
                <SafeAreaView style={estilo.modalcss}>
                    <SafeAreaView style={estilo.boxmodal}>
                        <SafeAreaView style={{flexDirection:'row', backgroundColor: "#B2B2B2", borderTopStartRadius: 5, borderTopEndRadius: 5}}>
                            <Text style={{textAlign: 'left', padding: 6}}>
                                Cadastro de equipamentos
                            </Text>
                            <SafeAreaView style={{
                                flex: 1,
                                alignItems: 'flex-end',
                            }}>
                                <TouchableOpacity onPress={() => {
                                    setInputVincular(false);
                                }}>
                                    <Ionicons name="close-circle" size={30} color="#B22222" />
                                </TouchableOpacity>
                            </SafeAreaView>
                        </SafeAreaView>
                        <SafeAreaView>
                            <TextInput 
                                placeholder="Chave do ESP"
                                value={ESP_KEY}
                                onChangeText={(value) => {setESP_KEY(value)}}
                                style={{
                                    padding: 6,
                                    fontFamily: 'Rajdhani-Regular',
                                    textAlign: 'center',
                                    fontSize: 16
                                }}
                            />
                            
                            <SafeAreaView>
                                <Text style={{fontFamily: 'Rajdhani-Regular', fontSize: 18, textAlign: 'center', paddingVertical: 4, borderRadius: 5, backgroundColor: "#00000022"}}>Localização do ESP:</Text>
                                <Mapa 
                                latitude={bindLatitude}
                                longitude={bindLongitude} 
                                draggable={true}
                                onDragEnd={(event) => {
                                    setBindLatitude(event.nativeEvent.coordinate.latitude);
                                    setBindLongitude(event.nativeEvent.coordinate.longitude);
                                }}
                                />
                            </SafeAreaView>
                            <TouchableOpacity style={{
                                alignItems: 'center',
                            }}
                            onPress={async () => {
                                if(ESP_KEY == '') {
                                    return showAlert("Erro ao vincular ESP", "Você precisa digitar uma KEY valida");
                                }
                                else {
                                    startLoading();
                                    const bind = await BindESP(state.user_id, ESP_KEY, bindLatitude, bindLongitude);

                                    if(!bind.sucess) {
                                        if(bind.type == "esp_invalid") {
                                            showAlert("KEY inválida", "Você digitou uma KEY inválida!");
                                        }
                                        else if(bind.type == "esp_owner") {
                                            showAlert("Falha ao vincular", bind.message);
                                        }
                                    }
                                    else {
                                        await reloadesp(state.user_id);
                                        setInputVincular(false);
                                    }
                                    endLoading();
                                }
                            }}
                            >
                                <Text style={{
                                    padding: 5,
                                    backgroundColor: "#cdd8d9",
                                    borderRadius: 5,
                                    marginTop: 5,
                                    marginBottom: 5,
                                    fontFamily: 'Rajdhani-Regular',
                                    fontSize: 18,
                                    textAlign: 'center',
                                    paddingHorizontal: windowWidth*0.10
                                }}>Vincular</Text>
                            </TouchableOpacity>
                        </SafeAreaView>
                        
                    </SafeAreaView>
                </SafeAreaView>
            </Modal>

            
            {(pageLoaded && Containerbind) && <ScrollView>
                <SafeAreaView style={estilo.boxfundoWelcome}>
                    <SafeAreaView style={estilo.boxdentro}>
                        <Text style={{textAlign: 'center', fontSize: 20, fontFamily: 'Rajdhani-Regular'}}>Seja Bem Vindo!</Text>
                        <Text style={{textAlign: 'center', fontFamily: 'Rajdhani-Regular'}}>Ao projeto Vegeta, um app que visa a qualidade da saúde vegetal para um melhor proveito das plantações.</Text>
                    </SafeAreaView>
                </SafeAreaView>
                <SafeAreaView style={estilo.boxfundoVincular}>
                    <SafeAreaView style={estilo.vincularesp}>
                        <Image source={montanha} />
                        <Text style={{marginTop: 20, textAlign: 'center', fontSize: 14, fontFamily: 'Rajdhani-Regular'}}>Você ainda não tem nenhum dispositivo vinculado.</Text>
                        <TouchableOpacity style={estilo.buttonVincular} onPress={() => {
                            setESP_KEY("");
                            setBindLongitude(state.location.longitude);
                            setBindLatitude(state.location.latitude);
                            setInputVincular(true);
                        }}>
                            <Text style={estilo.vincularLabel}>Vincular</Text>
                        </TouchableOpacity>
                    </SafeAreaView>
                </SafeAreaView>
            </ScrollView>}
            {(pageLoaded && !Containerbind) && <ScrollView>
                <SafeAreaView style={estilo.containerpicker}>
                    <Text style={{marginBottom: 5, fontSize: 18, fontFamily:'Rajdhani-Regular'}}>Dispositivo</Text>
                    <SafeAreaView style={estilo.pickerselect}>
                        <Picker
                            selectedValue={espSelected}
                            onValueChange={async (itemValue, itemIndex) => {
                                setEspSelect(itemValue);
                                
                                await loadESPReg(itemValue);
                            }}
                            style={{
                                color: '#000000',
                                height: "5%",
                            }}
                            fontFamily='Rajdhani-Regular'
                        >
                            <Picker.Item label="Selecione o ESP" value={-1} style={{color: "#A3A3A3"}} enabled={false}/>
                            {userESPs.map((esp) => {return <Picker.Item label={esp.esp_nome} value={esp.esp_index} key={{latitude: esp.esp_latitude, longitude: esp.esp_longitude}}/>})}
                        </Picker>
                    </SafeAreaView>

                    {(espSelected != -1) && <SafeAreaView style={estilo.infoesps}>
                        <Text style={estilo.infoesps_title}>Exibindo informações do dispositivo</Text>
                        {(coordsESPSelect.latitude != null && coordsESPSelect.longitude != null) && <>
                            <SafeAreaView style={estilo.infomap}>
                                <View style={estilo.infomapinto}>
                                    <Text style={estilo.infomapinto_text}>Localização do dispositivo</Text>
                                    
                                    <Mapa 
                                    
                                            latitude={coordsESPSelect.latitude}
                                            longitude={coordsESPSelect.longitude} 
                                            height={250}
                                            width={250}
                                            />
                                </View>
                            </SafeAreaView>
                        </>}
                        <Text style={estilo.listaregistroslabel}>{InESPData ? ("Ultimos registros coletados:") : ("Não há nenhum registro para ser exibido")}</Text>
                        {InESPData && <>
                            <View style={estilo.fundoregistros}>
                                <View style={estilo.listaregistros}>

                                    {
                                        arrayEspData.map((data) => {
                                            return <View style={{
                                                marginVertical: 5,
                                                backgroundColor: "#FFFFFF66",
                                                borderRadius: 10,
                                                flex: 1,
                                                flexDirection: 'row'
                                            }}>
                                                <View style={{
                                                    flex: 1,
                                                    paddingTop: 5,
                                                    paddingBottom: 5,
                                                    paddingHorizontal: 8,
                                                    alignItems: 'flex-start',
                                                    justifyContent: 'center'
                                                }}>
                                                    <Text style={{fontSize: 12, fontFamily: 'Rajdhani-Regular'}}>{data.data_registro}</Text>
                                                    <Text style={{fontSize: 16, fontFamily: 'Rajdhani-Regular'}}>Ensolarado</Text>
                                                </View>
                                                <View style={{}}>
                                                    <View style={{
                                                        paddingTop: 5,
                                                        paddingBottom: 5,
                                                        paddingHorizontal: 10,
                                                        alignItems: 'flex-end',
                                                        flexDirection: 'row',
                                                        justifyContent: 'center'
                                                    }}>
                                                        <Text style={{
                                                            fontSize: 16, fontFamily: 'Rajdhani-Regular',
                                                            paddingHorizontal: 5
                                                        }}>{`${Math.round(data.media_temperatura)}ºC`}</Text>
                                                        <Image source={parcialmente_nublado} />
                                                    </View>
                                                </View>
                                            </View>
                                        })
                                    }
                                    
                                </View>
                            </View>
                        </>}
                    </SafeAreaView>}
                </SafeAreaView>
                <SafeAreaView>
                    
                </SafeAreaView>
                </ScrollView>
            }            
        </SafeAreaView>
    );
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const estilo = StyleSheet.create({
    listaregistroslabel: {
        fontFamily: 'Rajdhani-Regular',
        textAlign: 'center',
        paddingVertical: 10
    },
    fundoregistros: {
        alignItems: 'center',
        paddingBottom: 10,
    },
    listaregistros: {
        width: windowWidth*0.90
    },
    infomap: {
        alignItems: 'center',
        paddingBottom: 10,
        
    },
    infomapinto: {
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 5,
        backgroundColor: "#00000010",
        borderColor: "#00000033",
        paddingHorizontal: 10,
        paddingBottom: 10,
        width: windowWidth*0.70
    },
    infomapinto_text: {
        fontFamily: 'Rajdhani-Regular',
        fontSize: 16,
        padding: 5
    },
    infoesps_title: {
        marginTop: 5,
        paddingVertical: 10,
        fontFamily: 'Rajdhani-Regular',
        textAlign: 'center',
        fontSize: 16,
        
    },
    infoesps: {
        marginTop: 10,
        width: windowWidth*0.95,
        borderRadius: 8,
        backgroundColor: "#E4E4DE"
    },
    pickerselect: {
        borderRadius: 8,
        backgroundColor: "#E4E4DE",
        justifyContent: 'center',
        height: 40,
        width: windowWidth*0.95
    },
    containerpicker: {
        marginTop: 15,
        width: windowWidth,
        alignItems: 'center'
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
    pickercontainer: {
        width: windowWidth,
        height: windowHeight
    },
    listaESPs: {

    },
    container: {
        backgroundColor: "#cdd8d9",
        flex: 1,
        width: windowWidth,
        height: windowHeight
    },
    textbind: {
        fontSize: 16,
        fontFamily: 'Rajdhani-Regular',
        marginTop: 20,
        textAlign: 'center'
    },
    navbar: {
        flexDirection: "row",
        height: 60,
        padding: 5,
        left: 10,
        borderRadius: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#9ea6a1ff',
        width: "95%"
    },
    area_image: {
        marginLeft: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    areaTitle: {
        marginLeft: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        fontSize: 24,
        color: "#303333",
        fontFamily: 'Rajdhani-Regular'
    },
    boxfundoWelcome: {
        marginTop: 30,
        width: windowWidth,
        alignItems: 'center',
    },
    boxfundoVincular: {
        marginTop: 40,
        width: windowWidth,
        alignItems: 'center',
    },
    boxdentro: {
        alignItems: 'center',
        backgroundColor: "#e3e2dc",
        borderRadius: 5,
        padding: 15,
        width: windowWidth*0.85
    },
    vincularesp: {
        alignItems: 'center',
        backgroundColor: "#e3e2dc",
        borderRadius: 5,
        padding: 15,
        width: windowWidth*0.85
    },
    buttonVincular: {
        marginTop: 10,
        width: "100%",
        alignItems: 'flex-end'
    },
    vincularLabel: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        textAlign: 'center',
        backgroundColor: '#d7d1bd',
        borderRadius: 5,
        fontFamily: 'Rajdhani-Regular',
        fontSize: 16
    },
    modalcss: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    boxmodal: {
        borderRadius: 5,
        backgroundColor: "#FFFFFFFF",
        width: "86%",
    }
});