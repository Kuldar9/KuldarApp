// developer.js
import React, { useState } from 'react';
import Console from './console';
import ScreenNavigator from '../navigation/screenNavigator';
import DeveloperModePopup from './UI/popup';

const Developer = () => {
  console.log('const Developer, file: developer.js');
  const [developerModePopupOpen, setDeveloperModePopupOpen] = useState(true);

  const closeDeveloperModePopup = () => {
    setDeveloperModePopupOpen(false);
  };
  
  // Generating dummy errors for showcase
  const generateDummyErrors = () => {
    console.log('const generateDummyErrors, file: developer.js');
    const errors = [];
    for (let i = 0; i < 5; i++) {
      errors.push(new Error(`Dummy Error ${i + 1}`));
    }
    return errors;
  };

  // Additional information to pass to ConsoleUI
  const additionalInfo = {
    developerInfo: 'This is additional information from Developer component.'
  };

  console.log('previous done, loading view, file: developer.js');
  return (
    <Console logs={generateDummyErrors().map((error, index) => ({ error }))} additionalInfo={additionalInfo}>
      <DeveloperModePopup isOpen={developerModePopupOpen} onClose={closeDeveloperModePopup} />
      <ScreenNavigator />
    </Console>
  );
};

export default Developer;