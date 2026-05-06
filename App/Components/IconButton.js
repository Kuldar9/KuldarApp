// IconButton.js
import React from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity, Dimensions } from 'react-native';
import { useTheme } from '../Themes/theme'; // Adjust the path based on your theme location

const { width } = Dimensions.get('window'); // Get the device's width

const IconButton = ({ title, onPress, iconSource }) => {
    const { colors } = useTheme(); // Access current theme colors

    return (
        <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={onPress} style={styles.button}>
                {iconSource && (
                    <Image source={iconSource} style={styles.icon} resizeMode="contain" />
                )}
                <Text style={[styles.text, { color: colors.text }]}>{title}</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    buttonContainer: {
        flex: 1, // Allow buttons to expand in the grid layout
        margin: 5, // Space around buttons
        maxWidth: width * 0.28, // Control the width of each button (about 3 buttons per row)
        // Adjust maxWidth according to your needs
    },
    button: {
        flexDirection: 'column', // Change to column to place the icon above the text
        alignItems: 'center', // Center items horizontally
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderColor: '#ccc', // Default border color
        borderRadius: 15, // Rounded corners
        paddingVertical: 10,
        paddingHorizontal: 20,
        elevation: 5, // Shadow for Android
        shadowColor: '#000', // Shadow color for iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    icon: {
        width: 30,
        height: 30,
        marginBottom: 5,
    },
    text: {
        fontSize: 14,
        textAlign: 'center',
    },
});

export default IconButton;