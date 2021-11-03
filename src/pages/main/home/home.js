import React, { useState, useEffect } from "react";
import { Text, SafeAreaView, View, StyleSheet, StatusBar, Image, Dimensions, TouchableOpacity, ScrollView } from "react-native";
import {Picker} from '@react-native-picker/picker';
import Spinner from 'react-native-loading-spinner-overlay';



//Icones
import parcialmente_nublado from '../../../images/lista_esps/parcialmente_nublado.png'
//---

//NavBar
import NavBar from "../../../components/NavBarTop";
//---

import montanha from '../../../images/montanha.png';

import Mapa from '../../../components/Mapa';

import { LoadUserEsp, LoadRegESP } from "./homeAPI";
import VincularESP from "../../../components/VincularESP";

export default function Home({route, navigation}) {    
    const state = {
        user_id: route.params.user_id,
        location: route.params.location
    }
    
    const [InputVincular, setInputVincular] = useState(false);
    const [Containerbind, showBind] = useState(false);
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
        else {
            if(!InESPData) {
                reloadesp();
            }
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
            <NavBar />


            <VincularESP 
                visible={InputVincular}
                user_id={state.user_id}
                location={{
                    latitude: state.location.latitude,
                    longitude: state.location.longitude
                }}
                onCloseModal={() => {
                    setInputVincular(false);
                }}
                inicioLoading={() => {
                    startLoading();
                }}
                fimLoading={() => {
                    endLoading();
                }}
                onUpdateESP={async (user_id) => {
                    reloadesp(state.user_id);
                }}
            />

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
                                            }}
                                                key={data.data_registro}
                                                >
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

//Retorna o estado do dia de acordo com os dados enviados pelos sensores (ESP)
function GetStatusSensor(umidade, temperatura, lumens, pressao, altitude, chuva) {
    let tipoluz;
    /*
    Dados lumens:
        - 0.0001 - Noite sem lua, céu coberto (luz estelar)
        - 0.002 - Noite sem lua, céu descoberto com luminescencia atmosferica
        - 0.05 - 0.03 - Lua cheia em céu coberto
        - 3.4 - Límite escurot do crepúsculi cívil com céu coberto
        - 20~50 - Áreas publicas rodeadas por áreas escuras
        - 50 - Sala de estar familia
        - 80 - Iluminação de áreas de circulação de edificio de escritórios/WC
        - 100 - Dia escuro com céu completamente nublado
        - 150 - Train station plataforms
        - 320~500 - Iluminação de escritório
        - 400 - Nascer do por do sol, ou por-do-sol num dia claro
        - 1000 - Dia com céu encoberto
        - 10~25 - Luz do dia em dia ensolarado (sem luz solar direta)
        - 32~100 - Luz solar direta

    Valores de tipoluz:
        0 - Pouca luz
        1 - Luz artificial
        2 - Luz solar
    */
    
    if(lumens == 0.0001 || lumens == 0.002 || lumens == 3.4 || (lumens >= 20 || luz <= 50) || (lumens >= 0.03 && lumens <= 0.05) || lumens == 100 || lumens == 1000) {
        tipoluz = 0;
    }
    else if((lumens >= 32 && lumens <= 100)) {
        tipoluz = 2;
    }
    else {
        tipoluz = 1;
    }

    let tipochuva;
    /* Chuva
        < 1000 - Chuva intensa
        >= 1000 - Chuvisco
        > 4000 - Sem chuva
    */
}

function map(x, in_min, in_max, out_min, out_max) {
    return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
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
        marginBottom: 55
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
        borderBottomColor: '#9ea6a1',
        width: "95%",
    },
    area_image: {
        marginLeft: 10,
        justifyContent: 'center'
    },
    areaTitle: {
        marginLeft: 20,
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