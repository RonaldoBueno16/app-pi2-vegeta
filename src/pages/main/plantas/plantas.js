import React, {Component} from "react";
import { StyleSheet, SafeAreaView, Text, View, Dimensions } from "react-native";

//Vars
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
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

    render() {
        return (
            <ScrollView>
                <SafeAreaView style={estilo.container}>
                    <NavBar />
                    <View style={{
                        alignItems: 'center'
                    }}>
                        <Text>Aqui ficará o relatório da saúde da plantação</Text>
                    </View>
                </SafeAreaView>
            </ScrollView>
        )
    }
}


const estilo = StyleSheet.create({
    container: {
        backgroundColor: "#cdd8d9",
        flex: 1,
        width: windowWidth,
        height: windowHeight, //Remover se não vai bugar (coloquei só para visualização)
        marginBottom: 55,
        paddingBottom: 10
    },
    
})