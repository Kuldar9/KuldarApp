// Support.js
import React from 'react';
import { View, Text } from 'react-native';
import { useTheme } from '../Themes/ThemeProvider';

const SupportScreen = () => {
  const { colors } = useTheme();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background }}>
      <Text style={{ color: colors.text }}>Support Screen</Text>
    </View>
  );
};

export default SupportScreen;