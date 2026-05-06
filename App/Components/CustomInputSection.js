import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import CustomTextInput from './InternalComponents/CustomTextInput';
import { useTheme } from '../Themes/theme';

const CustomInputSection = ({ title, inputs }) => {
    const { colors } = useTheme();

    const styles = StyleSheet.create({
        inputsContainer: {
            paddingHorizontal: 20,
            paddingBottom: 10,
            width: '100%',
            overflow: 'scroll',
        },
        sectionContainer: {
            width: '100%',
            paddingHorizontal: 20,
            paddingTop: 20,
            paddingBottom: 10,
            backgroundColor: colors.card, 
            marginBottom: 20,
            borderRadius: 15,
            overflow: 'hidden',
        },
        sectionTitle: {
            fontSize: 20,
            fontWeight: 'bold',
            marginBottom: 10,
            color: colors.text,
        },
        inputContainer: {
            marginBottom: 10,
        },
        textInput: {
            borderRadius: 25,
            paddingVertical: 12,
            paddingHorizontal: 24,
            borderWidth: 2,
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: 16,
            fontWeight: 'bold',
        },
    });

    return (
        <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>{title}</Text>
            <View style={styles.inputsContainer}>
                {inputs.map((input, index) => (
                    <View key={index} style={styles.inputContainer}>
                        <CustomTextInput
                            title={input.title}
                            onChangeText={input.onChangeText}
                            buttonStyle={[
                                styles.textInput,
                                { borderColor: input.borderColor || colors.secondary }
                            ]}
                            textColor={input.textColor || colors.text} // Default to theme's text color
                            borderColor={input.borderColor || colors.secondary} // Default to theme's border color
                        />
                    </View>
                ))}
            </View>
        </View>
    );
};

export default CustomInputSection;