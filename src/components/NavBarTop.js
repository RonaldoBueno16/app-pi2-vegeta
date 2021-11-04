import React from "react";
import { Text, SafeAreaView, View, Image, Dimensions, TouchableOpacity, StyleSheet} from "react-native";

import logo from '../images/logo.png';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function NavBar(props) {
    return (
        <SafeAreaView>
            <SafeAreaView style={{
                paddingVertical: 10
            }}>
                <View style={{width: windowWidth, alignItems: 'center'}}>
                    <View style={{
                        width: windowWidth*0.90,
                        borderBottomWidth: 2,
                        borderBottomColor: "#00000055",
                        paddingBottom: 10,
                        justifyContent: 'space-between',
                        flexDirection: 'row'}}>
                            
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <Image source={logo} style={{width: 126/2, height: 79/2}}/>
                            <Text style={{
                                fontFamily: 'Rajdhani-Regular',
                                fontSize: 32,
                                paddingHorizontal: 10
                            }}>Vegeta</Text>
                        </View>
                        
                    </View>
                </View>
            </SafeAreaView>
        </SafeAreaView>
    );
}