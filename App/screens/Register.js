// Register.js
import React from 'react';
import { View, Button } from 'react-native';
import { useTheme } from '../Themes/ThemeProvider';

const RegisterScreen = ({ navigation }) => {
    const { buttonStyle, buttonTextStyle } = useTheme();
    
    return (
        <View>
            <Button
                title="Register"
                onPress={() => {
                    // Logic for handling registration
                }}
                style={buttonStyle}
                textStyle={buttonTextStyle}
            />
        </View>
    );
}

export default RegisterScreen;