import React from 'react';
import { View, StyleSheet, Animated, TouchableOpacity, Modal, TouchableWithoutFeedback } from 'react-native';
import { useTheme } from '../Themes/theme';
import CustomButton from './InternalComponents/CustomButton';
import { X } from 'lucide-react-native';

const ProfileMenu = ({ isVisible, onClose, navigation }) => {
  const { colors, dimensions } = useTheme();
  const { windowWidth, windowHeight } = dimensions;

  const menuWidth = windowWidth * 0.6;

  const handlePressOutside = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <Modal
      transparent
      visible={isVisible}
      animationType="none"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={handlePressOutside}>
        <View style={styles.modalOverlay}>
          <Animated.View
            style={[
              styles.menu,
              { width: menuWidth, height: windowHeight, backgroundColor: colors.card },
            ]}
          >
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <X color={colors.text} size={24} />
            </TouchableOpacity>
            <View style={styles.menuContent}>
              <CustomButton
                title="Profile"
                onPress={() => navigation.navigate('Profile')}
                buttonStyle={styles.button}
                textColor={colors.text}
              />
              <CustomButton
                title="Settings"
                onPress={() => navigation.navigate('Settings')}
                buttonStyle={styles.button}
                textColor={colors.text}
              />
              <CustomButton
                title="Logout"
                onPress={() => navigation.navigate('Login')}
                buttonStyle={styles.button}
                textColor={colors.primary}
              />
            </View>
          </Animated.View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
  menu: {
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: -2, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 15,
  },
  menuContent: {
    marginTop: 60, // This pushes the buttons down, away from the X button
  },
  button: {
    marginVertical: 10,
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 1,
  },
});

export default ProfileMenu;