import React from 'react';
import { ImageBackground, StyleSheet, View } from 'react-native';
import { useTheme } from '../Themes/ThemeProvider';
import CustomHeader from '../Components/Header';
import CustomButtonSection from '../Components/CustomButtonSection';
import BottomBar from '../Components/BottomBar';

// Define userButtons
const userButtons = [
    { title: 'Need Help?', image: require('../Assets/icons/help-icon.gif') },
    { title: 'Support', image: require('../Assets/icons/support-icon.gif') },
    { title: 'Settings', image: require('../Assets/icons/settings-icon.gif') },
    { title: 'Profile', image: require('../Assets/icons/profile-icon.gif') },
    { title: 'Messages', image: require('../Assets/icons/messages-icon.gif') },
    { title: 'Notifications', image: require('../Assets/icons/notification-icon.gif') },
    // Add more buttons as needed
];

// Define adminButtons
const adminButtons = [
    { title: 'Manage Roles', image: require('../Assets/icons/roles-icon.gif') },
    { title: 'Staff Setup', image: require('../Assets/icons/staff-icon.gif') },
    { title: 'Analytics', image: require('../Assets/icons/analytics-icon.gif') },
    { title: 'Tickets', image: require('../Assets/icons/tickets-icon.gif') },
    // Add more buttons as needed
];

const HomeScreen = () => {
    const { backgroundImage } = useTheme();

    return (
        <ImageBackground source={backgroundImage} style={styles.background}>
            <CustomHeader title="Home" />
            <View style={styles.container}>
                <CustomButtonSection title="User Section" buttons={userButtons} />
                <CustomButtonSection title="Admin Section" buttons={adminButtons} />
            </View>
            <BottomBar/>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default HomeScreen;