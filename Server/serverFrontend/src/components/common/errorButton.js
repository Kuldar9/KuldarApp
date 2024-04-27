// errorButton.js
import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Platform } from 'react-native';

const ErrorButton = ({ title, onPress }) => {
  return (
    <TouchableOpacity
      style={[styles.button, Platform.OS === 'ios' ? styles.buttonIOS : styles.buttonAndroid]}
      onPress={onPress}
    >
      <Text style={[styles.buttonText, Platform.OS === 'ios' ? styles.buttonTextIOS : styles.buttonTextAndroid]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 10,
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center', 
  },
  buttonIOS: {
    backgroundColor: '#ff6666',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  buttonAndroid: {
    backgroundColor: '#ff6666',
    elevation: 4,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonTextIOS: {
    color: '#ffcccc',
  },
  buttonTextAndroid: {
    color: '#ffcccc',
  },
});

export default ErrorButton;