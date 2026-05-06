import React, { useState } from 'react';
import { ImageBackground, StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import CustomButton from '../Components/InternalComponents/CustomButton';
import CustomTextInput from '../Components/InternalComponents/CustomTextInput';
import { useTheme } from '../Themes/theme';

const LoginScreen = ({ navigation }) => {
    const { backgroundImage, colors } = useTheme();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);

    const handleLogin = () => {
        console.log('Email:', email);
        console.log('Password:', password);
        console.log('Remember Me:', rememberMe);
        navigation.navigate('Home');
    };

    const inputs = [
        {
            title: 'Email',
            onChangeText: setEmail,
        },
        {
            title: 'Password',
            onChangeText: setPassword,
            secureTextEntry: true,
        },
    ];

    const styles = StyleSheet.create({
        background: {
            flex: 1,
            resizeMode: 'cover',
            justifyContent: 'center',
        },
        container: {
            flex: 1,
            paddingHorizontal: 20,
            alignItems: 'center',
            backgroundColor: colors.background,
            borderRadius: 15,
            padding: 20,
            shadowColor: '#000',
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
            marginTop: 20, // Adjusted to allow space for the GIF
        },
        gif: {
            width: '100%', // Full width for responsiveness
            height: 200, // Adjust height as needed
            resizeMode: 'contain', // Keep aspect ratio
            marginBottom: 20, // Space between GIF and inputs
        },
        forgotPassword: {
            textDecorationLine: 'underline',
            textAlign: 'center',
            marginBottom: 10,
            color: colors.primary,
        },
        rememberMeContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 10,
        },
        checkbox: {
            width: 20,
            height: 20,
            borderWidth: 2,
            borderRadius: 5,
            alignItems: 'center',
            justifyContent: 'center',
        },
        checked: {
            width: 10,
            height: 10,
            backgroundColor: colors.primary,
            borderRadius: 3,
        },
        rememberMeText: {
            marginLeft: 10,
            color: colors.text,
        },
        button: {
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: colors.background,
            borderWidth: 2,
            borderRadius: 15,
            paddingVertical: 10,
            paddingHorizontal: 20,
            marginHorizontal: 5,
            borderColor: colors.primary,
            marginTop: 20,
        },
        sectionTitle: {
            textAlign: 'center',
            fontSize: 24,
            fontWeight: 'bold',
            color: colors.text,
            marginBottom: 10,
        },
    });

    return (
        <ImageBackground source={backgroundImage} style={styles.background}>
            <View style={styles.container}>
                <Image 
                    source={require('../Assets/icons/profile-icon.gif')}
                    style={styles.gif}
                />
                <View style={styles.inputSection}>
                    <Text style={styles.sectionTitle}>Login</Text>
                    <View style={styles.inputsContainer}>
                        {inputs.map((input, index) => (
                            <View key={index} style={styles.inputContainer}>
                                <CustomTextInput
                                    title={input.title}
                                    onChangeText={input.onChangeText}
                                    buttonStyle={styles.textInput}
                                    textColor={colors.text}
                                />
                            </View>
                        ))}
                    </View>
                </View>
                <TouchableOpacity onPress={() => setRememberMe(!rememberMe)} style={styles.rememberMeContainer}>
                    <View style={[styles.checkbox, { borderColor: colors.text }]}>
                        {rememberMe && <View style={styles.checked} />}
                    </View>
                    <Text style={styles.rememberMeText}>Remember Me</Text>
                </TouchableOpacity>
                <CustomButton
                    title="Login"
                    onPress={handleLogin}
                    buttonStyle={styles.button}
                    textColor={colors.text}
                />
                <Text
                    style={styles.forgotPassword}
                    onPress={() => navigation.navigate('ForgotPassword')}
                >
                    Forgot Password?
                </Text>
                <Text
                    style={styles.registerLink}
                    onPress={() => navigation.navigate('Register')}
                >
                    Don't have an account? Register here
                </Text>
            </View>
        </ImageBackground>
    );
};

export default LoginScreen;
