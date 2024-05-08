// themeProvider.js
import React, { useState, createContext, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';

export const ThemeContext = createContext();

const themeLight = {
  background: '#F5F5F5',
  secondaryBackground: '#E0E0E0',
  primaryText: '#333333',
  secondaryText: '#555555',
  accent: '#005A9E',
  border: '#BDBDBD',
};

const themeDark = {
  background: '#333333',
  secondaryBackground: '#555555',
  primaryText: '#E0E0E0',
  secondaryText: '#F5F5F5',
  accent: '#BDBDBD',
  border: '#005A9E',
};

const ThemeProvider = ({ children, darkMode }) => {
  console.log('const ThemeProvider, file: themeProvider.js');
  const [colors, setColors] = useState(darkMode ? themeDark : themeLight);

  useEffect(() => {
    setColors(darkMode ? themeDark : themeLight);
  }, [darkMode]);
  console.log('previous done, loading view, file: themeProvider.js');
  return (
      <ThemeContext.Provider value={colors}>
        <View style={[styles.container, { backgroundColor: colors.background }]}>
          {children}
        </View>
      </ThemeContext.Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ThemeProvider;