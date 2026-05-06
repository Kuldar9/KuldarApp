import React, { useEffect, useRef } from 'react';
import { TouchableOpacity, Text, StyleSheet, Animated, Easing, Image } from 'react-native';
import { useTheme } from '../../Themes/theme';

const CustomButton = ({ title, onPress, buttonStyle, textColor, imageSource }) => {
    const { colors } = useTheme(); // Access theme colors
    const scaleAnim = useRef(new Animated.Value(0)).current;
    const opacityAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        startAnimation();
    }, []);

    const startAnimation = () => {
        Animated.timing(scaleAnim, {
            toValue: 1,
            duration: 800,
            easing: Easing.elastic(1),
            useNativeDriver: true,
        }).start();

        Animated.timing(opacityAnim, {
            toValue: 1,
            duration: 500,
            delay: 300,
            easing: Easing.ease,
            useNativeDriver: true,
        }).start();
    };

    return (
        <Animated.View style={[{ transform: [{ scale: scaleAnim }], opacity: opacityAnim }, styles.buttonContainer]}>
            <TouchableOpacity onPress={onPress} style={[styles.button, buttonStyle]}>
                <Text style={[styles.text, { color: textColor || colors.text }]}>{title}</Text>
                {imageSource && (
                    <Image source={imageSource} style={styles.buttonImage} resizeMode="contain" />
                )}
            </TouchableOpacity>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    buttonContainer: {
        zIndex: 10,
    },
    button: {
        borderRadius: 25,
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderWidth: 2,
        borderColor: '#ccc',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
        flexDirection: 'row',
        elevation: 5, 
    },
    text: {
        fontSize: 16,
        fontWeight: 'bold',
        marginRight: 5,
    },
    buttonImage: {
        width: 60,
        height: 60,
    },
});

export default CustomButton;