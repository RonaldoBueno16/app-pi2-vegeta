import React, {useState, useEffect} from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions } from 'react-native';

export default function Mapa(prop) {
    const [didMount, setDidMount] = useState(false); 
    
    useEffect(() => {
        setDidMount(true);
        return () => setDidMount(false);
    }, [])

    if(!didMount) {
        return null;
    }
    
    return (
        <View style={styles.container}>
            <MapView
                style={{
                    width: prop.width == undefined ? (Dimensions.get('window').width * 0.85) : (prop.width),
                    height: prop.height == undefined ? (Dimensions.get('window').height * 0.50) : (prop.height),
                }}
                region={{
                    latitude: prop.latitude,
                    longitude: prop.longitude,
                    latitudeDelta: 0.0143,
                    longitudeDelta: 0.0134
                }}
                >

                    <Marker 
                        coordinate={{latitude: prop.latitude, longitude: prop.longitude}} 
                        draggable={prop.draggable == undefined ? (false) : (prop.draggable)}
                        onDragEnd={prop.onDragEnd}
                        name="cavalo"
                        />
            </MapView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
});
