import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Header = ({ themeColors }) => {
  return (
    <View style={[styles.container, { borderBottomColor: themeColors.borderColor }]}>
      <Text style={[styles.title, { color: themeColors.text }]}>Dashboard</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default Header;