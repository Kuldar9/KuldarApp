import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SettingScreen from '../../screens/settingsScreen';
import DashboardScreen from '../../screens/dashboardScreen';
import Header from '../dashboard/header';

const Stack = createStackNavigator();

const ScreenNavigator = () => {
  console.log('previous done, loading view, file: screenNavigator.js');
  return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            header: (props) => <Header {...props} />,
            headerShown: true,
          }}
        >
          <Stack.Screen name="Home" component={DashboardScreen} />
          <Stack.Screen name="Settings" component={SettingScreen} />
        </Stack.Navigator>
      </NavigationContainer>
  );
};

export default ScreenNavigator;