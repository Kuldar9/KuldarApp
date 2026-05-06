import React, { createContext, useState } from 'react';
import DeveloperModePopup from './UI/popup';
import Console from './console';

const DevMode = createContext(false);

export const DevModeProvider = ({ children, devMode }) => {
  const [isDevMode, setIsDevMode] = useState(devMode);
  const [developerModePopupOpen, setDeveloperModePopupOpen] = useState(true);

  const closeDeveloperModePopup = () => {
    setDeveloperModePopupOpen(false);
  };

  const generateDummyErrors = () => {
    console.log('const generateDummyErrors, file: developer.js');
    const errors = [];
    for (let i = 0; i < 5; i++) {
      errors.push(new Error(`Dummy Error ${i + 1}`));
    }
    return errors;
  };

  const additionalInfo = {
    developerInfo: 'This is additional information from Developer component.'
  };

  // Wrap children with Console and other components if devMode is on
  const wrappedChildren = isDevMode ? (
    <>
      <Console logs={generateDummyErrors().map((error, index) => ({ error }))} additionalInfo={additionalInfo}>
        <DeveloperModePopup isOpen={developerModePopupOpen} onClose={closeDeveloperModePopup} />
        {children}
      </Console>
    </>
  ) : (
    // Render children without Console and other components if devMode is off
    <>
      {children}
    </>
  );

  return (
    <DevMode.Provider value={{ devMode: isDevMode, setDevMode: setIsDevMode }}>
      {wrappedChildren}
    </DevMode.Provider>
  );
};

export default DevMode;