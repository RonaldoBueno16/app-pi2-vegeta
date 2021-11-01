import React, {useState, useEffect} from 'react';
import * as Location from 'expo-location';

export default function getLocation() {
    const [location, setLocation] = useState(null);

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if(status !== 'granted') {
                setLocation(null);
            }
            else {
                let location = await Location.getCurrentPositionAsync({});
                setLocation(location);
            }
        })();
    }, [])

    return location;
}