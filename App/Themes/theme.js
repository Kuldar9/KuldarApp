import React, { useContext, createContext, useState, useEffect } from 'react';
import { useColorScheme, Dimensions } from 'react-native';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const colorScheme = useColorScheme();
  const [themeMode, setThemeMode] = useState(colorScheme);
  const [dimensions, setDimensions] = useState({
    windowWidth: Dimensions.get('window').width,
    windowHeight: Dimensions.get('window').height,
  });

  useEffect(() => {
    setThemeMode(colorScheme);
  }, [colorScheme]);

  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        windowWidth: Dimensions.get('window').width,
        windowHeight: Dimensions.get('window').height,
      });
    };

    Dimensions.addEventListener('change', updateDimensions);

    // Cleanup listener on unmount
    return () => {
      Dimensions.removeEventListener('change', updateDimensions);
    };
  }, []);

  const toggleTheme = () => {
    setThemeMode(prevMode => (prevMode === 'light' ? 'dark' : 'light'));
  };

  const theme = themeMode === 'dark' ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ ...theme, dimensions, themeMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a theme.js');
  }
  return context;
};

const lightTheme = {
  colors: {
    primary: '#007AFF',
    secondary: '#5856D6',
    background: '#F2F2F7',
    card: '#FFFFFF',
    text: '#000000',
    subText: '#8E8E93',
    border: '#C7C7CC',
    notification: '#FF3B30',
    success: '#34C759',
    warning: '#FFCC00',
    error: '#FF3B30',
    container: '#FFFFFF',
    buttonBackground: '#007AFF',
    buttonText: '#FFFFFF',
    inputBackground: '#FFFFFF',
    inputText: '#000000',
    inputPlaceholder: '#C7C7CC',
    transparent: 'transparent',
  },
};

const darkTheme = {
  colors: {
    primary: '#0A84FF',
    secondary: '#5E5CE6',
    background: '#000000',
    card: '#1C1C1E',
    text: '#FFFFFF',
    subText: '#8E8E93',
    border: '#38383A',
    notification: '#FF453A',
    success: '#32D74B',
    warning: '#FFD60A',
    error: '#FF453A',
    container: '#1C1C1E',
    buttonBackground: '#0A84FF',
    buttonText: '#FFFFFF',
    inputBackground: '#1C1C1E',
    inputText: '#FFFFFF',
    inputPlaceholder: '#8E8E93',
    transparent: 'transparent',
  },
};

export default {
  light: lightTheme,
  dark: darkTheme,
};