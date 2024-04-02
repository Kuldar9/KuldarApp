// AppNavigator.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Test from '../Screens/Test';
/*
import WelcomeScreen from '../Screens/Welcome';
import LoginScreen from '../Screens/Login';
import RegisterScreen from '../Screens/Register';
import HomeScreen from '../Screens/Home';
import SupportScreen from '../Screens/Support';
import ChatBotScreen from '../Screens/ChatBot';
import TicketsScreen from '../Screens/Tickets';
import ProfileScreen from '../Screens/Profile';
import SettingsScreen from '../Screens/Settings';
//import CalendarScreen from '../Screens/Calendar';
//import MoreScreen from '../Screens/More';
import CustomHeader from '../Components/Header';
*/

const Stack = createStackNavigator();

const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="Test"
                screenOptions={{
                    headerShown: false, // Disable default header
                }}
            >
                <Stack.Screen name="Test" component={Test} options={{ title: 'Test' }} />
                {/*
                <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ title: 'Welcome' }} />
                <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Login' }} />
                <Stack.Screen name="Register" component={RegisterScreen} options={{ title: 'Register' }} />
                <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Home' }} />
                <Stack.Screen name="Support" component={SupportScreen} options={{ title: 'Support' }} />
                <Stack.Screen name="ChatBot" component={ChatBotScreen} options={{ title: 'ChatBot' }} />
                <Stack.Screen name="Calendar" component={CalendarScreen} options={{ title: 'Calendar' }} />
                <Stack.Screen name="More" component={MoreScreen} options={{ title: 'More' }} />
                <Stack.Screen name="Tickets" component={TicketsScreen} options={{ title: 'Tickets' }} />
                <Stack.Screen name="Profile" component={ProfileScreen} options={{ title: 'Profile' }} />
                <Stack.Screen name="Settings" component={SettingsScreen} options={{ title: 'Settings' }} />  
            */}   
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default AppNavigator;