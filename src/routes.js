import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import signIn from './pages/signIn';
import signUp from './pages/signUp';
import main from './pages/main';

const Stack = createNativeStackNavigator();

export default function MyStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="login"  component={signIn} options={{headerShown: false}}/>
            <Stack.Screen name="register"  component={signUp} options={{headerShown: false}}/>
            <Stack.Screen name="main"  component={main} options={{headerShown: false}} />
        </Stack.Navigator>
    );
}