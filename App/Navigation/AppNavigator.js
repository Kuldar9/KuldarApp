// AppNavigator.js
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ThemeProvider, useTheme } from '../Themes/theme';
import WelcomeScreen from '../Screens/Welcome';
import LoginScreen from '../Screens/Login';
import RegisterScreen from '../Screens/Register';
import ForgotPasswordScreen from '../Screens/ForgotPassword';
import HomeScreen from '../Screens/Home';
import SupportScreen from '../Screens/Support';
import CalendarScreen from '../Screens/Calendar';
import ChatBotScreen from '../Screens/ChatBot';
import TicketsScreen from '../Screens/Tickets';
import ProfileScreen from '../Screens/Profile';
import ProfileEditScreen from '../Screens/ProfileEdit'; // Import the Profile Edit Screen
import SettingsScreen from '../Screens/Settings';
import MoreScreen from '../Screens/More';
import Header from '../Components/Header';
import BottomBar from '../Components/BottomBar';

const Stack = createStackNavigator();

const AppContent = () => {
  const { colors, themeMode } = useTheme();
  const [activeTab, setActiveTab] = useState(0);

  const handleBottomBarPress = (index, navigation) => {
    setActiveTab(index);
    switch (index) {
      case 0:
        navigation.navigate('Home');
        break;
      case 1:
        navigation.navigate('ChatBot');
        break;
      case 2:
        navigation.navigate('Calendar');
        break;
      case 3:
        navigation.navigate('More');
        break;
      default:
        navigation.navigate('Home');
    }
  };

  // Configuration for Header and BottomBar options per screen
  const screenOptions = {
    Welcome: { showHeader: false, showBottomBar: false, headerText: "Welcome" },
    Login: { showHeader: true, showBottomBar: false, showBackButton: true, showProfileButton: false, showHeaderText: false, headerText: "Login" },
    Register: { showHeader: true, showBottomBar: false, showBackButton: true, showProfileButton: false, showHeaderText: true, headerText: "Register" },
    ForgotPassword: { showHeader: true, showBottomBar: false, showBackButton: true, showProfileButton: false, showHeaderText: true, headerText: "Forgot Password" },
    Home: { showHeader: true, showBottomBar: true, showBackButton: true, showProfileButton: true, showHeaderText: true, headerText: "Home" },
    Support: { showHeader: true, showBottomBar: true, showBackButton: true, showProfileButton: true, showHeaderText: true, headerText: "Support" },
    ChatBot: { showHeader: true, showBottomBar: true, showBackButton: true, showProfileButton: true, showHeaderText: true, headerText: "Chat with us" },
    Profile: { showHeader: true, showBottomBar: true, showBackButton: true, showProfileButton: true, showHeaderText: true, headerText: "Profile" },
    ProfileEdit: { showHeader: true, showBottomBar: true, showBackButton: true, showProfileButton: true, showHeaderText: true, headerText: "Edit Profile" }, // Add ProfileEdit screen option
    Tickets: { showHeader: true, showBottomBar: false, showBackButton: true, showProfileButton: false, showHeaderText: true, headerText: "Tickets" },
    Settings: { showHeader: true, showBottomBar: true, showBackButton: true, showProfileButton: true, showHeaderText: true, headerText: "Settings" },
    More: { showHeader: true, showBottomBar: true, showBackButton: true, showProfileButton: true, showHeaderText: true, headerText: "Integrations" },
    Calendar: { showHeader: true, showBottomBar: true, showBackButton: true, showProfileButton: true, showHeaderText: false, headerText: "Calendar" },
  };

  const renderScreen = (Component, screenName) => {
    const { showHeader, showBottomBar, showBackButton, showProfileButton, showHeaderText, headerText } = screenOptions[screenName];

    return (props) => (
      <View style={{ flex: 1 }}>
        {showHeader && (
          <Header
            {...props}
            showBackButton={showBackButton}
            showProfileButton={showProfileButton}
            showHeaderText={showHeaderText}
            customText={headerText} // Pass the custom header text here
          />
        )}
        <Component {...props} />
        {showBottomBar && (
          <BottomBar
            activeButton={activeTab}
            onPress={(index) => handleBottomBarPress(index, props.navigation)}
          />
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <NavigationContainer
        theme={{
          colors: {
            ...colors,
            background: colors.background,
            card: colors.card,
            text: colors.text,
            border: colors.border,
          },
          dark: themeMode === 'dark',
        }}
      >
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Welcome">
          <Stack.Screen
            name="Welcome"
            children={renderScreen(WelcomeScreen, 'Welcome')}
          />
          <Stack.Screen
            name="Login"
            children={renderScreen(LoginScreen, 'Login')}
          />
          <Stack.Screen
            name="Register"
            children={renderScreen(RegisterScreen, 'Register')}
          />
          <Stack.Screen
            name="ForgotPassword"
            children={renderScreen(ForgotPasswordScreen, 'ForgotPassword')}
          />
          <Stack.Screen
            name="Home"
            children={renderScreen(HomeScreen, 'Home')}
          />
          <Stack.Screen
            name="Support"
            children={renderScreen(SupportScreen, 'Support')}
          />
          <Stack.Screen
            name="Calendar"
            children={renderScreen(CalendarScreen, 'Calendar')}
          />
          <Stack.Screen
            name="ChatBot"
            children={renderScreen(ChatBotScreen, 'ChatBot')}
          />
          <Stack.Screen
            name="Profile"
            children={renderScreen(ProfileScreen, 'Profile')}
          />
          <Stack.Screen
            name="ProfileEdit"
            children={renderScreen(ProfileEditScreen, 'ProfileEdit')} // Add ProfileEditScreen here
          />
          <Stack.Screen
            name="Tickets"
            children={renderScreen(TicketsScreen, 'Tickets')}
          />
          <Stack.Screen
            name="Settings"
            children={renderScreen(SettingsScreen, 'Settings')}
          />
          <Stack.Screen
            name="More"
            children={renderScreen(MoreScreen, 'More')}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between', // Ensure BottomBar sticks to the bottom
  },
});

const AppNavigator = () => {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
};

export default AppNavigator;
