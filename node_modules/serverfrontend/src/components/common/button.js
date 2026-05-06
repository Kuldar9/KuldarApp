import React, { useContext, useRef } from 'react';
import { Pressable, Text, View, StyleSheet, Animated } from 'react-native';
import { ThemeContext } from '../utils/themeProvider'; // Adjust the import path if needed

const Button = ({ title, onPress, style, textStyle }) => {
  console.log('const Button, file: button.js');
  const colors = useContext(ThemeContext);
  const backgroundColor = colors.accent;
  const pressedBackgroundColor = colors.secondaryText;
  const textColor = colors.primaryText;
  const borderColor = colors.border;
  const backgroundOpacity = 0.25;

  const scale = useRef(new Animated.Value(1)).current;
  const animateIn = () =>
    Animated.spring(scale, { toValue: 0.95 }).start();
  const animateOut = () =>
    Animated.spring(scale, { toValue: 1 }).start();
  console.log('all done, continuing to loading view, file: button.js');
  return (
      <Animated.View style={{ transform: [{ scale }] }}>
        <Pressable
          style={({ pressed }) => [
            styles.button,
            {
              backgroundColor: pressed
                ? `${pressedBackgroundColor}${Math.round(255 * backgroundOpacity).toString(16)}` // Apply opacity to pressed background color
                : `${backgroundColor}${Math.round(255 * backgroundOpacity).toString(16)}`, // Apply opacity to background color
              borderColor: borderColor,
              ...style,
            },
          ]}
          onPress={onPress}
          onPressIn={animateIn}
          onPressOut={animateOut}
        >
          <View>
            <Text style={[styles.buttonText, { color: textColor }, textStyle]}>{title}</Text>
          </View>
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
    borderWidth: 1,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Button;