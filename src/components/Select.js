import React from "react";
import { SafeAreaView, View, StyleSheet, Text, Picker, Dimensions } from "react-native";

export default function Select(prop) {
    return (
        <SafeAreaView>
            <Text style={estilo.label}>{prop.label}</Text>
            <View style={estilo.picker}>
                <Picker
                    key={prop.label}
                    selectedValue={prop.selectedValue}
                    onValueChange={prop.onValueChange}>
                    {pickItens(prop.itensSelect)}    
                </Picker>
            </View>

            
        </SafeAreaView>
    )
}

const pickItens = (list) => {
    return list.map(value => {
        return (<Picker.Item label={Object.keys(value)[0]} value={value[Object.keys(value)]}/>);
    })
}

const windowWidth = Dimensions.get('window').width;

const estilo = StyleSheet.create({
    label: {
        marginTop: 10,
        width: windowWidth*0.75
    },
    picker: {
        width: windowWidth*0.75,
        height: 35,
        justifyContent: 'center',
        textAlign: 'center',
        borderRadius: 1,
        borderWidth: 0.1,
        marginTop: 5
    }
});