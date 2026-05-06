import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import IconButton from '../../common/iconButton';
import { ThemeContext } from '../../utils/themeProvider';

const Header = ({ onClose }) => {
    console.log('const Header, file: consoleHeader.js');
    const { secondaryBackground, primaryText, border } = useContext(ThemeContext);
    console.log('previous done, loading view, file: consoleHeader.js');
    return (
        <View style={[styles.container, { backgroundColor: secondaryBackground, borderBottomColor: border }]}>
            <Text style={[styles.title, { color: primaryText }]}>Debug Console</Text>
            <View style={styles.buttonsContainer}>
                <IconButton iconName="arrow-back-outline" onPress={onClose} />
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