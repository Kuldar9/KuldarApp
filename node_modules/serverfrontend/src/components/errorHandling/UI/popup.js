import React, { useContext } from 'react';
import { View, Text, StyleSheet, Modal, Pressable } from 'react-native';
import { ThemeContext } from '../../utils/themeProvider';

const DeveloperModePopup = ({ isOpen, onClose }) => {
  console.log('const DeveloperModePopup, file: popup.js');
  const theme = useContext(ThemeContext);
  console.log('previous done, loading view, file: popup.js');
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isOpen}
      onRequestClose={onClose}
    >
      <Pressable onPress={onClose} style={styles.pressable}>
        <View style={styles.modalBackground}>
          <View style={[styles.modalContainer, { backgroundColor: theme.secondaryBackground }]}>
            <Text style={[styles.title, { color: theme.primaryText }]}>Developer Mode is On</Text>
            <Text style={[styles.instructions, { color: theme.secondaryText }]}>
              Enable it with: <Text style={{ fontWeight: 'bold' }}>A + B + C</Text>
            </Text>
          </View>
        </View>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  pressable: {
    flex: 1,
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // semi-transparent background
  },
  modalContainer: {
    width: '50%',
    borderRadius: 10,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  instructions: {
    fontSize: 16,
    marginBottom: 20,
  },
});

export default DeveloperModePopup;