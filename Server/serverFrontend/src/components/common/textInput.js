import React, { useContext, useRef } from 'react';
import { TextInput as RNTextInput, StyleSheet, Animated } from 'react-native';
import { ThemeContext } from '../utils/themeProvider';

const TextInput = (props) => {
  console.log('const TextInput file: textInput.js');
  const colors = useContext(ThemeContext);

  const borderColorDefault = colors.secondaryText;
  const borderColorFocus = colors.accent;
  const borderColorAnim = useRef(new Animated.Value(0)).current;

  const handleFocus = () => {
    Animated.timing(borderColorAnim, {
      toValue: 1,
      duration: 300,
    }).start();
  };
  
  const handleBlur = () => {
    Animated.timing(borderColorAnim, {
      toValue: 0,
      duration: 300,
    }).start();
  };

  const borderColor = borderColorAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [borderColorDefault, borderColorFocus]
  });
  console.log('previous done, loading view, file: textInput.js');
  return (
    <Animated.View style={[styles.inputContainer, { borderColor }]}>
      <RNTextInput
        {...props}
        style={[styles.input, {
          color: colors.primaryText,
          backgroundColor: colors.secondaryBackground,
        }]}
        placeholderTextColor={colors.secondaryText}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    borderRadius: 10,
    padding: 0, 
    marginBottom: 16,
  },
  input: {
    fontSize: 18,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 10,
  },
});

export default TextInput;