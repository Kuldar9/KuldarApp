// OptionsList.js
import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Animated } from 'react-native';
import { useTheme } from '../../Themes/ThemeProvider';

const OptionsList = ({ showOptions, translateYAnim, navigateToScreen }) => {
    const { colors } = useTheme();

    const styles = StyleSheet.create({
        optionsContainer: {
            position: 'absolute',
            top: 40,
            right: 10,
            backgroundColor: colors.background, // Use background color from the theme
            borderRadius: 10, // Adjusted border radius for a rounder look
            elevation: 5,
            zIndex: 10,
            borderWidth: 1,
            borderColor: colors.primary, // Use primary color for border
            padding: 10,
            shadowColor: '#000',
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
        },
        option: {
            paddingVertical: 8,
            paddingHorizontal: 10,
        },
        optionText: {
            fontSize: 16,
            color: colors.text, // Use text color from the theme
        },
    });

    return (
        <Animated.View style={[styles.optionsContainer, { transform: [{ translateY: translateYAnim }] }]}>
            {showOptions && (
                <>
                    <TouchableOpacity style={styles.option} onPress={() => navigateToScreen('Profile')}>
                        <Text style={styles.optionText}>Profile</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.option} onPress={() => navigateToScreen('Settings')}>
                        <Text style={styles.optionText}>Settings</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.option} onPress={() => navigateToScreen('Login')}>
                        <Text style={[styles.optionText, { color: colors.primary }]}>Logout</Text> {/* Use primary color for Logout text */}
                    </TouchableOpacity>
                </>
            )}
        </Animated.View>
    );
};

export default OptionsList;