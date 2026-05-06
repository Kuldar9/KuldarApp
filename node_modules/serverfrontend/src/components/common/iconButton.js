import React, { useContext, useRef } from 'react';
import { Pressable, StyleSheet, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemeContext } from '../utils/themeProvider';

const IconButton = ({ iconName, onPress }) => {
    console.log('const IconButton, file: iconButton.js');
    const colors = useContext(ThemeContext);

    const iconColor = colors.primaryText;
    const iconSize = 24;
    const backgroundOpacity = 0.25;

    const scale = useRef(new Animated.Value(1)).current;

    const animateIn = () =>
        Animated.timing(scale, { toValue: 0.95, duration: 200, useNativeDriver: true }).start();

    const animateOut = () =>
        Animated.timing(scale, { toValue: 1, duration: 200, useNativeDriver: true }).start();

    const handlePressIn = () => {
        animateIn();
    };

    const handlePressOut = () => {
        animateOut();
    };
    console.log('previous done, loading view, file: iconButton.js');
    return (
        <Animated.View style={{ transform: [{ scale }] }}>
            <Pressable
                style={({ pressed }) => [
                    styles.button,
                    {
                        backgroundColor: pressed
                            ? `${colors.secondaryText}${Math.round(255 * backgroundOpacity).toString(16)}`
                            : 'transparent',
                    },
                ]}
                onPress={onPress}
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
            >
                <Ionicons name={iconName} size={iconSize} color={iconColor} />
            </Pressable>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    button: {
        padding: 10,
        borderRadius: 50,
    },
});

export default IconButton;