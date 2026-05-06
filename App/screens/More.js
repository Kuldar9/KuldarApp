// More.js
import React from 'react';
import { View, StyleSheet, FlatList, Dimensions } from 'react-native';
import { useTheme } from '../Themes/theme';
import IconButton from '../Components/IconButton'; // Ensure the path is correct

const { width } = Dimensions.get('window'); // Get the device's width

const More = () => {
    const { colors } = useTheme();

    // Example buttons data
    const buttons = [
        {
            title: "Discord",
            onPress: () => alert('Discord integration will be developed'),
            image: require('../Assets/icons/discord-icon.png'),
        },
        {
            title: "Google",
            onPress: () => alert('Google account connected'),
            image: require('../Assets/icons/google-icon.png'),
        },
        {
            title: "Facebook",
            onPress: () => alert('Facebook account connected'),
            image: require('../Assets/icons/facebook-icon.png'),
        },
        {
          title: "...",
          onPress: () => alert('More will come soon'),
        },
        // Add more buttons as needed
    ];

    // Render function for each IconButton
    const renderIconButton = ({ item }) => (
        <IconButton
            title={item.title}
            onPress={item.onPress}
            iconSource={item.image}
        />
    );

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <FlatList
                data={buttons}
                renderItem={renderIconButton}
                keyExtractor={(item) => item.title}
                numColumns={3} // Number of columns for the grid
                columnWrapperStyle={styles.columnWrapper} // Style for spacing between buttons
                contentContainerStyle={styles.gridContainer} // Padding for the grid
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10, // Padding for the container
    },
    gridContainer: {
        paddingBottom: 20,
    },
    columnWrapper: {
        justifyContent: 'space-between', // Space out items in each row
    },
});

export default More;