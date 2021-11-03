import React, {useState} from "react";
import { StyleSheet, Modal, SafeAreaView, Text, TouchableOpacity, Dimensions } from "react-native";

//Icons
import { Ionicons } from '@expo/vector-icons';
//---

import Mapa from "./Mapa";

//Funções de outros modulos

//ESP
import { BindESP } from "../pages/main/home/homeAPI";

//Components
import { TextInput } from "react-native-gesture-handler";
import showAlert from "../components/Alert";
//--

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function VincularESP(prop) {
    
    const [ESP_KEY, setESP_KEY] = useState("");
    const [bindLatitude, setBindLatitude] = useState(prop.location == null ? (0) : (prop.location.latitude));
    const [bindLongitude, setBindLongitude] = useState(prop.location == null ? (0) : (prop.location.longitude));
    
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={prop.visible}
            onRequestClose={() => {
                prop.onCloseModal();
                setESP_KEY("");
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
                                prop.onCloseModal();
                                setESP_KEY("");
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
                                prop.inicioLoading();
                                const bind = await BindESP(prop.user_id, ESP_KEY, bindLatitude, bindLongitude);
                                if(!bind.sucess) {
                                    if(bind.type == "esp_invalid") {
                                        showAlert("KEY inválida", "Você digitou uma KEY inválida!");
                                    }
                                    else if(bind.type == "esp_owner") {
                                        showAlert("Falha ao vincular", bind.message);
                                    }
                                }
                                else {
                                    if(prop.onUpdateESP != null) {
                                        await prop.onUpdateESP(prop.user_id);
                                        prop.onCloseModal();
                                        setESP_KEY("");
                                    }
                                }
                                prop.fimLoading();
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
    );
}

const estilo = StyleSheet.create({
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