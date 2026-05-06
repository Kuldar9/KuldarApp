import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import CustomButton from './InternalComponents/CustomButton';
import { useTheme } from '../Themes/theme';

const CustomButtonSection = ({ title, buttons }) => {
    const { colors } = useTheme();

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
            backgroundColor: colors.background, 
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
        button: {
            flexDirection: 'row', 
            alignItems: 'center',
            backgroundColor: colors.card,
            borderWidth: 2,
            borderRadius: 15,
            paddingVertical: 10,
            paddingHorizontal: 20,
            marginHorizontal: 5,
            borderColor: colors.primary, 
        },
    });

    return (
        <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>{title}</Text>
            <View style={styles.buttonsContainer}>
                {buttons.map((button, index) => (
                    <CustomButton
                        key={index}
                        title={button.title}
                        onPress={button.onPress}
                        buttonStyle={styles.button}
                        textColor={colors.text}
                        imageSource={button.image}
                    />
                ))}
            </View>
        </View>
    );
};

export default CustomButtonSection;