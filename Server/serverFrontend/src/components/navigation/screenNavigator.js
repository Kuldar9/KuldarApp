import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ThemeProvider from '../utils/themeProvider';
import SettingScreen from '../../screens/settingsScreen';

const Stack = createStackNavigator();

const ScreenNavigator = () => {
  return (
    <ThemeProvider darkMode={true}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Dashboard"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Dashboard" component={SettingScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}

export default ScreenNavigator;
