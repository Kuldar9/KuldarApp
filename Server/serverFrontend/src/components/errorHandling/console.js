import React, { useState, useEffect } from 'react';
import { Modal, Platform } from 'react-native';
import ConsoleUI from './UI/consoleUI';

const Console = ({ children, logs }) => { // Accept logs prop
  console.log('const Console in file: console.js');
  const [isVisible, setIsVisible] = useState(false);
  const [keySequence, setKeySequence] = useState('');

  const correctSequence = ['KeyA', 'KeyB', 'KeyC'];

  // Handle key press events
  const handleKeyDown = (event) => {
    console.log('const handleKeyDown in file: console.js');
    const { code } = event;
    setKeySequence((prevKeySequence) => {
      console.log('const setKeySequence in file: console.js');
      const newSequence = [...prevKeySequence, code].slice(-correctSequence.length);
      if (newSequence.join('') === correctSequence.join('')) {
        setIsVisible(true);
        return []; // Reset the sequence
      }
      return newSequence;
    });
  };

  // Add event listener for key press
  useEffect(() => {
    console.log('useEffect, file: console.js');
    if (Platform.OS === 'web') {
      window.addEventListener('keydown', handleKeyDown);
    }

    // Clean up event listener
    return () => {
      if (Platform.OS === 'web') {
        window.removeEventListener('keydown', handleKeyDown);
      }
    };
  }, []);
  console.log('previous done, loading view, file: console.js');
  // Render the UI
  return (
    <>
      {children}
      {isVisible && (
        <Modal
          animationType="slide"
          transparent={false}
          visible={isVisible}
          onRequestClose={() => setIsVisible(false)}
        >
          <ConsoleUI onClose={() => setIsVisible(false)} logs={logs} /> {/* Pass logs to ConsoleUI */}
        </Modal>
      )}
    </>
  );
};

export default Console;