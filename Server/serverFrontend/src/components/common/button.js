// button.js
import React, { useContext, useRef } from 'react';
import { Pressable, Text, StyleSheet, Animated } from 'react-native';
import { ThemeContext } from '../utils/themeProvider';  // Adjust the import path if needed

const Button = ({ title, onPress, style, textStyle }) => {
  const colors = useContext(ThemeContext);

  const backgroundColor = colors.primaryText; // Updated to new naming convention
  const pressedBackgroundColor = colors.secondaryText; // Updated to new naming convention
  const textColor = colors.background; // Updated to new naming convention

  const scale = useRef(new Animated.Value(1)).current;
  const animateIn = () => Animated.spring(scale, { toValue: 0.95, useNativeDriver: true }).start();
  const animateOut = () => Animated.spring(scale, { toValue: 1, useNativeDriver: true }).start();

  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <Pressable
        style={({ pressed }) => [
          styles.button,
          { backgroundColor: pressed ? pressedBackgroundColor : backgroundColor, ...style },
        ]}
        onPress={onPress}
        onPressIn={animateIn}
        onPressOut={animateOut}
      >
        <Text style={[styles.buttonText, { color: textColor }, textStyle]}>{title}</Text>
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Button;