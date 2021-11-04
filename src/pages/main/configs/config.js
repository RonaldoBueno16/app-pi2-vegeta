import React, {Component} from "react";
import { StyleSheet, SafeAreaView, Text, Dimensions, View, TouchableOpacity } from "react-native";

//Vars
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
//--

//Icons
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
//--

//Components
import NavBar from "../../../components/NavBarTop";
import { ScrollView } from "react-native-gesture-handler";
//--

export default class Config extends Component {
    constructor(props) {
        super(props);

        const params = props.route.params;

        this.state = {
            user_id: params.user_id,
            nome: params.nome,
            address: params.address
        }
    }

    addNewConfig(prop) {
        return (
            <TouchableOpacity
                onPress={prop.onClick}
            >
                <View style={{
                    backgroundColor: "#FFFFFF66",
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderRadius: 5,
                    marginBottom: 5
                }}>
                    <Text style={{
                        padding: 10,
                        fontSize: 16
                    }}>{prop.text}</Text>
                    <MaterialIcons name="navigate-next" size={32} color="black" />
                </View>
            </TouchableOpacity>
        );
    }

    render() {
        return (
            <SafeAreaView style={estilo.container}>
                <NavBar />
                <ScrollView>
                    <View style={{
                        alignItems: 'center'
                    }}>
                        <View style={estilo.areauser}>
                            <View style={estilo.imageuser}>
                                <AntDesign name="user" size={128} color="black"/>
                            </View>
                            <View style={estilo.infouser}>
                                <Text style={estilo.textinfo}>{this.state.nome}</Text>
                            </View>
                        </View>
                        <View style={estilo.configarea}>
                            <this.addNewConfig text="Minha conta" onClick={() => {
                                console.log("Cliquei opção 1");
                            }}/>
                            <this.addNewConfig text="Notificações" onClick={() => {
                                
                            }}/>
                            <this.addNewConfig text="Configurar dispositivos" onClick={() => {
                                
                            }}/>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        )
    }
}


const estilo = StyleSheet.create({
    container: {
        backgroundColor: "#cdd8d9",
        flex: 1,
        width: windowWidth,
        marginBottom: 55,
        alignItems: 'center'
    },
    areauser: {
        borderBottomWidth: 1,
        borderBottomColor: "#00000020",
        width: windowWidth,
        alignItems: 'center',
        paddingBottom: 10
    },
    imageuser: {
        backgroundColor: "#FFFFFF55",
        padding: 10,
        borderRadius: 100
    },
    infouser: {

    },
    textinfo: {
        fontFamily: 'Rajdhani-Regular',
        fontSize: 24,
        paddingTop: 10
    },
    configarea: {
        width: windowWidth*0.9,
        paddingTop: 10
    }
})