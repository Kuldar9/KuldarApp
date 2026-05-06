// FallbackUI.js
console.log('Executing file: fallbackUI.js');
import React from 'react';
import { View, Text } from 'react-native';

const FallbackUI = () => (
  <View>
    <Text>An unexpected error occurred. Please try again later.</Text>
  </View>
);

export default FallbackUI;