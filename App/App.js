import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ChatBot from './screens/ChatBot';

const Stack = createStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Chat">
                <Stack.Screen name="Chat" component={ChatBot} options={{ title: 'Chat' }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}