import React, { useState } from 'react';
import { View, StyleSheet, Animated, TouchableOpacity, Modal, TouchableWithoutFeedback, Text } from 'react-native'; 
import { useTheme } from '../Themes/theme';
import CustomButton from './InternalComponents/CustomButton'; 
import CustomInputSection from './CustomInputSection'; 
import { X } from 'lucide-react-native'; 
import moment from 'moment';

const EventModal = ({ isVisible, onClose, selectedDate, addEvent }) => {
  const { colors, dimensions } = useTheme(); // Get theme colors
  const { windowWidth, windowHeight } = dimensions;
  const [eventText, setEventText] = useState('');

  const handleEventNameChange = (text) => {
    setEventText(text);
  };

  const handleAddEvent = () => {
    if (eventText.trim() !== '' && selectedDate) {
      addEvent(selectedDate, eventText);
      setEventText('');
      onClose();
    }
  };

  const handlePressOutside = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  const menuWidth = windowWidth * 0.9;

  return (
    <Modal
      transparent
      visible={isVisible}
      animationType="slide"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={handlePressOutside}>
        <View style={styles.modalOverlay}>
          <Animated.View
            style={[styles.menu, { width: menuWidth, height: windowHeight * 0.8, backgroundColor: colors.card }]}>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <X color={colors.text} size={24} />
            </TouchableOpacity>
            <View style={styles.menuContent}>
              <Text style={[styles.title, { color: colors.text }]}>
                Add Event for {selectedDate ? selectedDate.format('MMMM Do YYYY') : 'Date Not Selected'}
              </Text>
              <CustomInputSection 
                title="Event Details"
                inputs={[
                  { 
                    title: 'Event Name', 
                    onChangeText: handleEventNameChange,
                    textColor: colors.text, // Use theme text color
                    borderColor: colors.primary, // Use theme border color
                  }
                ]}
              />
              <View style={styles.buttonContainer}>
                <CustomButton
                  title="Add Event"
                  onPress={handleAddEvent}
                  buttonStyle={styles.button}
                  textColor={colors.text}
                  borderColor={colors.primary}
                />
              </View>
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  menu: {
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 15,
  },
  menuContent: {
    marginTop: 60,
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginVertical: 10,
  },
  button: {
    marginVertical: 10,
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 24,
    width: '80%',
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 1,
  },
});

export default EventModal;
