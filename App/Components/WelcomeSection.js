// WelcomeSection.js
import React, { useEffect, useRef } from 'react';
import { StyleSheet, Text, Animated, Image, Easing } from 'react-native';
import { useTheme } from '../Themes/ThemeProvider'; // Import useTheme hook

const WelcomeSection = ({ title, description, image }) => {
    const { colors, dimensions } = useTheme(); // Use colors and dimensions from theme
    const fadeInAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(
            fadeInAnim,
            {
                toValue: 1,
                duration: 1000,
                easing: Easing.ease,
                useNativeDriver: true,
            }
        ).start();
    }, [fadeInAnim]);

    const styles = StyleSheet.create({
        section: {
            backgroundColor: colors.background,
            borderRadius: 15,
            padding: 20,
            marginBottom: 20,
            width: dimensions.windowWidth - 32, // Accessing windowWidth from dimensions
            marginHorizontal: 16,
            shadowColor: '#000',
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
            alignItems: 'center',
            opacity: fadeInAnim, // Using animated opacity
        },
        title: {
            fontSize: 24,
            fontWeight: 'bold',
            marginBottom: 10,
            color: colors.text,
        },
        description: {
            fontSize: 16,
            marginBottom: 15,
            color: colors.secondary,
        },
        image: {
            width: 150,
            height: 150,
            marginBottom: 20,
        },
    });

    return (
        <Animated.View style={styles.section}>
            <Image source={image} style={styles.image} />
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.description}>{description}</Text>
        </Animated.View>
    );
};

export default WelcomeSection;