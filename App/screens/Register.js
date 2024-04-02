// Register.js
import React from 'react';
import { View, Button } from 'react-native';
import { useTheme } from '../Themes/ThemeProvider';

const RegisterScreen = ({ navigation }) => {
    const { buttonStyle, buttonTextStyle } = useTheme();
    
    return (
        <View>
            {/* Add your register screen UI elements here */}
            <Button
                title="Register"
                onPress={() => {
                    // Logic for handling registration
                }}
                style={buttonStyle}
                textStyle={buttonTextStyle}
            />
            {/* Add other buttons or UI elements as needed */}
        </View>
    );
}

export default RegisterScreen;