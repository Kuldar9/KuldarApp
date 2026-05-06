// ForgotPassword.js
import React from 'react';
import { View, Text } from 'react-native';
import { useTheme } from '../Themes/theme';

const ForgotPasswordScreen = () => {
  const { colors } = useTheme();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background }}>
      <Text style={{ color: colors.text }}>ForgotPassword Screen</Text>
    </View>
  );
};

export default ForgotPasswordScreen;