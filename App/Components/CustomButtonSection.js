// CustomButtonSection.js
import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import CustomButton from './InternalComponents/CustomButton';
import { useTheme } from '../Themes/ThemeProvider';

const CustomButtonSection = ({ title, buttons }) => {
    const { colors } = useTheme();

    // Define styles within the component using colors from useTheme
    const styles = StyleSheet.create({
        buttonsContainer: {
            flexDirection: 'row',
            paddingHorizontal: 20,
            paddingVertical: 10,
            width: '100%',
            overflow: 'scroll',
        },
        sectionContainer: {
            width: '100%',
            paddingHorizontal: 20,
            paddingTop: 20,
            paddingBottom: 10,
            backgroundColor: colors.button.transparent.background, // Use transparent button background color from the theme
            marginBottom: 20,
            borderRadius: 15,
            overflow: 'hidden',
        },
        sectionTitle: {
            fontSize: 20,
            fontWeight: 'bold',
            marginBottom: 10,
            color: colors.text, // Using colors from useTheme
        },
        button: {
            flexDirection: 'row', // Change to row to display text and image horizontally
            alignItems: 'center',
            backgroundColor: colors.button.transparent.background, // Use transparent button background color from the theme
            borderWidth: 2,
            borderRadius: 15,
            paddingVertical: 10,
            paddingHorizontal: 20,
            marginHorizontal: 5,
            borderColor: colors.primary, // Use primary color for button border
        },
    });

    return (
        <View style={styles.sectionContainer}>
            <Text style={[styles.sectionTitle]}>{title}</Text>
            <View style={styles.buttonsContainer}>
                {buttons.map((button, index) => (
                    <CustomButton
                        key={index}
                        title={button.title}
                        onPress={() => {}}
                        buttonStyle={styles.button}
                        // Set text color directly within the CustomButton component
                        textColor={colors.text}
                        imageSource={button.image}
                    />
                ))}
            </View>
        </View>
    );
};

export default CustomButtonSection;