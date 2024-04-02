// ProfileButton.js
import React from 'react';
import { TouchableOpacity, Animated, Easing } from 'react-native';

const ProfileButton = ({ onPress }) => {
  // Animated value for controlling the scale effect
  const animatedValue = new Animated.Value(1);

  // Function to handle press event
  const handlePress = () => {
    // Call the onPress function
    onPress();
  };

  // Function to animate the scale effect
  const animateScale = () => {
    Animated.timing(animatedValue, {
      toValue: 1, 
      duration: 200, // Animation duration
      easing: Easing.linear, // Easing function
      useNativeDriver: true, // Use native driver for better performance
    }).start();
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      onPressIn={animateScale} // Call animateScale function when button is pressed
      onPressOut={() => animatedValue.setValue(1)} // Reset scale effect when button is released
    >
      <Animated.Image
        source={require('../../Assets/icons/profile-icon.gif')} // Use GIF source
        style={{
          width: 60, // Set width
          height: 60, // Set height
          transform: [{ scale: animatedValue }], // Apply scale transformation
        }}
      />
    </TouchableOpacity>
  );
};

export default ProfileButton;