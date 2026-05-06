import React from 'react';
import { Pressable, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 
import { useTheme } from '../../Themes/theme'; 

const BackButton = () => {
  const navigation = useNavigation(); 
  const { colors } = useTheme(); 

  const handlePress = () => {
    navigation.goBack(); 
  };

  const styles = StyleSheet.create({
    button: {
      padding: 10,
    },
    image: {
      width: 40,
      height: 40,
      tintColor: colors.text, 
    },
  });

  return (
    <Pressable
      onPress={handlePress}
      style={({ pressed }) => [
        styles.button,
        {
          opacity: pressed ? 0.7 : 1, // Optional: adds visual feedback when pressed
        },
      ]}
    >
      <Image
        source={require('../../Assets/icons/back.gif')}
        style={styles.image}
      />
    </Pressable>
  );
};

export default BackButton;