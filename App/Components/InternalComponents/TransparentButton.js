import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Dimensions } from 'react-native';
import { useTheme } from '../../Themes/theme';

const { width } = Dimensions.get('window');

const TransparentButton = ({ title, onPress }) => {
  const { colors } = useTheme();

  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity onPress={onPress} style={styles.button}>
        <Text style={[styles.text, { color: colors.primary }]}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    margin: 5,
    maxWidth: width * 0.28,
  },
  button: {
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: 'transparent', // Change to transparent
    borderRadius: 15,
    paddingVertical: 10,
    paddingHorizontal: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  text: {
    fontSize: 14,
    textAlign: 'center',
  },
});

export default TransparentButton;