import React, { useState } from 'react';
import { View, StyleSheet, Text, Animated, Easing } from 'react-native';
import { useTheme } from '../Themes/ThemeProvider';
import BackButton from './InternalComponents/BackButton';
import ProfileButton from './InternalComponents/ProfileButton';
import OptionsList from './InternalComponents/OptionsList';

const Header = ({ navigation, showBackButton = true, showProfileButton = true, showHeaderText = true, showOptionsList = true }) => {
    const { colors } = useTheme();
    const [showOptions, setShowOptions] = useState(false);
    const translateYAnim = useState(new Animated.Value(-100))[0];

    const toggleOptions = () => {
        setShowOptions(prevState => !prevState);
        Animated.timing(
            translateYAnim,
            {
                toValue: showOptions ? -100 : 0,
                duration: 300,
                easing: Easing.ease,
                useNativeDriver: true,
            }
        ).start();
    };

    const renderBackButton = () => {
        if (showBackButton) {
            return <BackButton onPress={() => navigation.goBack()} />;
        }
        return null;
    };

    const renderProfileButton = () => {
        if (showProfileButton) {
            return <ProfileButton onPress={toggleOptions} />;
        }
        return null;
    };

    const renderOptionsList = () => {
        if (showOptionsList) {
            return (
                <OptionsList
                    showOptions={showOptions}
                    translateYAnim={translateYAnim}
                    navigateToScreen={(screen) => {
                        navigation.navigate(screen);
                        setShowOptions(false);
                    }}
                />
            );
        }
        return null;
    };

    const styles = StyleSheet.create({
        container: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: 20,
            paddingVertical: 10,
            shadowColor: '#000',
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
            backgroundColor: colors.button.transparent.background,
            borderRadius: 15, // Rounded corners
            opacity: 0.8, // Semi-transparent
        },
        leftContainer: {
            flexDirection: 'row',
            alignItems: 'center',
        },
        rightContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            position: 'relative',
        },
    });

    return (
        <View style={styles.container}>
            <View style={styles.leftContainer}>
                {renderBackButton()}
            </View>
            {showHeaderText && <Text style={{ color: colors.text }}>Header Text</Text>}
            <View style={styles.rightContainer}>
                {renderProfileButton()}
                {renderOptionsList()}
            </View>
        </View>
    );
};

export default Header;