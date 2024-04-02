// BackButton.js
import React from 'react';
import { TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook
import { useTheme } from '../../Themes/ThemeProvider'; // Import useTheme from ThemeProvider

const BackButton = () => {
  const navigation = useNavigation(); // Accessing navigation from useNavigation hook
  const { colors } = useTheme(); // Accessing colors from the theme

  // Function to handle press event
  const handlePress = () => {
    navigation.goBack(); // Navigate back
  };

  const styles = StyleSheet.create({
    button: {
      // Apply button styles
      padding: 10,
    },
    image: {
      // Apply image styles
      width: 40, // Set width
      height: 40, // Set height
      tintColor: colors.text, // Apply text color from theme
    },
  });

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={styles.button} // Apply button styles
    >
      <Image
        source={require('../../Assets/icons/back.gif')} // Use GIF source
        style={styles.image}
      />
    </TouchableOpacity>
  );
};

export default BackButton;