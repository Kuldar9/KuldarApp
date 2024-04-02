// CustomTextInput.js
import React, { useRef, useEffect, useState } from 'react';
import { TextInput, StyleSheet, Animated, Easing } from 'react-native';
import { useTheme } from '../../Themes/ThemeProvider';

const CustomTextInput = ({ title, onChangeText, buttonStyle, textColor, borderColor }) => {
    const { buttonStyles } = useTheme();
    const style = buttonStyles.transparent;
    const scaleAnim = useRef(new Animated.Value(0)).current;
    const opacityAnim = useRef(new Animated.Value(0)).current;
    const [isFocused, setIsFocused] = useState(false);

    useEffect(() => {
        startAnimation();
    }, []);

    const startAnimation = () => {
        Animated.timing(
            scaleAnim,
            {
                toValue: 1,
                duration: 800,
                easing: Easing.elastic(1),
                useNativeDriver: true,
            }
        ).start();

        Animated.timing(
            opacityAnim,
            {
                toValue: 1,
                duration: 500,
                delay: 300,
                easing: Easing.ease,
                useNativeDriver: true,
            }
        ).start();
    };

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = () => {
        setIsFocused(false);
    };

    return (
        <Animated.View style={{ transform: [{ scale: scaleAnim }], opacity: opacityAnim }}>
            <TextInput
                placeholder={title}
                placeholderTextColor={textColor || style.color}
                onChangeText={onChangeText}
                style={[styles.textInput, style, buttonStyle, { borderColor: isFocused ? borderColor : textColor }]} // Set border color based on focus
                onFocus={handleFocus}
                onBlur={handleBlur}
            />
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    textInput: {
        borderRadius: 25,
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
        fontSize: 16,
        fontWeight: 'bold',
        flexDirection: 'row', // Ensure text and image are displayed horizontally
    },
});

export default CustomTextInput;