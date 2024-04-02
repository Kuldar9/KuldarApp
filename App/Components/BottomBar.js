// BottomBar.js
import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import { useTheme } from '../Themes/ThemeProvider'; 
import { useNavigation } from '@react-navigation/native';

const BottomBar = ({ activeButton, onPress }) => { 
  const navigation = useNavigation();
  const { colors } = useTheme(); // Accessing colors from the theme

  // Define styles within the component
  const styles = StyleSheet.create({
    container: {
      backgroundColor: colors.button.transparent.background, // Match the background color of the header
      borderRadius: 15, // Rounded corners
      opacity: 0.8, // Semi-transparent
    },
    bottomContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
      paddingBottom: 20,
    },
    button: {
      flex: 1,
      borderRadius: 20,
      paddingVertical: 10,
      alignItems: 'center',
      justifyContent: 'center',
      marginHorizontal: 5,
    },
    activeButton: {
      backgroundColor: colors.secondary, // Using secondary color for active buttons
    },
    inactiveButton: {
      backgroundColor: 'transparent',
    },
    buttonImage: {
      width: 50,
      height: 50,
      marginBottom: 5,
    },
    text: {
      fontSize: 16,
      fontWeight: 'bold',
      color: colors.text, // Using text color from theme
    },
  });

  // Define button data with names and corresponding GIFs
  const buttons = [
    { name: 'Home', gif: require('../Assets/icons/home.gif') },
    { name: 'Chatbot', gif: require('../Assets/icons/messages-icon.gif') },
    { name: 'Calendar', gif: require('../Assets/icons/calendar.gif') },
    { name: 'More', gif: require('../Assets/icons/more.gif') },
    // Add more buttons as needed
  ];

  return (
    <View style={styles.container}>
      <View style={styles.bottomContainer}>
        {buttons.map((button, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => onPress(index)}
            style={[
              styles.button,
              activeButton === index ? styles.activeButton : styles.inactiveButton,
            ]}
          >
            <Image source={button.gif} style={styles.buttonImage} />
            <Text style={styles.text}>{button.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default BottomBar;