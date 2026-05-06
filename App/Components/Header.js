import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useTheme } from '../Themes/theme';
import BackButton from './InternalComponents/BackButton';
import ProfileButton from './InternalComponents/ProfileButton';
import ProfileMenu from './ProfileMenu';

const Header = ({
  navigation,
  showBackButton = true,
  showProfileButton = true,
  showHeaderText = true,
  customText = "Header Text", // Add this line to accept custom text
}) => {
  const { colors } = useTheme();
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const toggleProfileMenu = () => {
    setShowProfileMenu((prevState) => !prevState);
  };

  const renderBackButton = () => {
    if (showBackButton) {
      return <BackButton onPress={() => navigation.goBack()} />;
    }
    return null;
  };

  const renderProfileButton = () => {
    if (showProfileButton) {
      return <ProfileButton onPress={toggleProfileMenu} />;
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
      elevation: 10,
      backgroundColor: colors.transparent,
      borderRadius: 15,
      opacity: 0.8,
    },
    leftContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    rightContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    headerText: {
      color: colors.text,
      fontWeight: 'bold',
    },
  });

  return (
    <View>
      <View style={styles.container}>
        <View style={styles.leftContainer}>
          {renderBackButton()}
        </View>
        {showHeaderText && <Text style={styles.headerText}>{customText}</Text>}
        <View style={styles.rightContainer}>
          {renderProfileButton()}
        </View>
      </View>
      <ProfileMenu
        isVisible={showProfileMenu}
        onClose={() => setShowProfileMenu(false)}
        navigation={navigation}
      />
    </View>
  );
};

export default Header;