import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import IconButton from '../common/iconButton';
import { ThemeContext } from '../utils/themeProvider';

const Header = ({ navigation }) => {
    const { secondaryBackground, primaryText, border } = useContext(ThemeContext);

    const handleNavigation = (routeName) => {
        navigation.navigate(routeName);
    };
    console.log('previous done, loading view, file: textInput.js');
    return (
        <View style={[styles.container, { backgroundColor: secondaryBackground, borderBottomColor: border }]}>
            <Text style={[styles.title, { color: primaryText }]}>Dashboard</Text>
            <View style={styles.buttonsContainer}>
                <IconButton iconName="home-outline" onPress={() => handleNavigation('Home')} />
                <IconButton iconName="terminal-outline" onPress={() => handleNavigation('Console')} />
                <IconButton iconName="settings-outline" onPress={() => handleNavigation('Settings')} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    buttonsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});

export default Header;