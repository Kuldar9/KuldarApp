// CustomButton.js
import React, { useEffect, useRef } from 'react';
import { TouchableOpacity, Text, StyleSheet, Animated, Easing, Image } from 'react-native';
import { useTheme } from '../../Themes/ThemeProvider';

const CustomButton = ({ title, onPress, buttonStyle, textColor, imageSource }) => {
    const { buttonStyles, useGifs } = useTheme();
    const style = buttonStyles.transparent;
    const scaleAnim = useRef(new Animated.Value(0)).current; // Initial scale 0
    const opacityAnim = useRef(new Animated.Value(0)).current; // Initial opacity 0

    useEffect(() => {
        // Trigger animation when component mounts
        startAnimation();
    }, []);

    const startAnimation = () => {
        // Scale animation
        Animated.timing(
            scaleAnim,
            {
                toValue: 1, // Set to 1 for full size
                duration: 800, // Duration in milliseconds
                easing: Easing.elastic(1), // Elastic animation
                useNativeDriver: true, // Use native driver for better performance
            }
        ).start();

        // Opacity animation
        Animated.timing(
            opacityAnim,
            {
                toValue: 1, // Fade in
                duration: 500, // Duration in milliseconds
                delay: 300, // Delay to start after scaling animation
                easing: Easing.ease, // Ease animation
                useNativeDriver: true, // Use native driver for better performance
            }
        ).start();
    };

    return (
        <Animated.View style={{ transform: [{ scale: scaleAnim }], opacity: opacityAnim }}>
            <TouchableOpacity onPress={onPress} style={[styles.button, style, buttonStyle]}>
                {/* Always render both text and image */}
                <Text style={[styles.text, { color: textColor || style.color }]}>{title}</Text>
                {imageSource && !useGifs && (
                    <Image source={imageSource} style={styles.buttonImage} resizeMode="contain" />
                )}
            </TouchableOpacity>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    button: {
        borderRadius: 25,
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
        flexDirection: 'row', // Ensures that text and image are displayed horizontally
    },
    text: {
        fontSize: 16,
        fontWeight: 'bold',
        marginRight: 5, // Added margin to separate text from image
    },
    buttonImage: {
        width: 60,
        height: 60,
    },
});

export default CustomButton;