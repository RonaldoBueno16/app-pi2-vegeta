import React, {useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MyStack from './src/routes';

import AppLoading from 'expo-app-loading';
import useFonts from './src/hooks/useFonts';

export default function App() {
    const [fontsLoaded, setFontsLoaded] = useState(false);

    const LoadFonts = async () => {
        await useFonts();
    };

    if(!fontsLoaded) {
        return <AppLoading 
            startAsync={LoadFonts}
            onFinish={() => setFontsLoaded(true)}
            onError={(error) => console.log("Erro a carregar a fonte:" + error)}
        />
    }
    
    return (
        <NavigationContainer>
            <MyStack />
        </NavigationContainer>
    );
}