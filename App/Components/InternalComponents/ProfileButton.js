import React from 'react';
import { TouchableOpacity, Animated, Easing } from 'react-native';
import { useTheme } from '../../Themes/theme';

const ProfileButton = ({ onPress }) => {
  const animatedValue = new Animated.Value(1);
  const { colors } = useTheme(); // Access theme

  const handlePress = () => {
    onPress();
  };

  const animateScale = () => {
    Animated.timing(animatedValue, {
      toValue: 0.9, // Scale down
      duration: 200,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(() => {
      Animated.timing(animatedValue, {
        toValue: 1, // Scale back up
        duration: 200,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start();
    });
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      onPressIn={animateScale}
      onPressOut={() => animatedValue.setValue(1)}
    >
      <Animated.Image
        source={require('../../Assets/icons/profile-icon.gif')}
        style={{
          width: 60,
          height: 60,
          tintColor: colors.text, // Use theme color
          transform: [{ scale: animatedValue }],
        }}
      />
    </TouchableOpacity>
  );
};

export default ProfileButton;