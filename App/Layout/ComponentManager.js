// ComponentManager.js
import React from 'react';

const ComponentManager = ({ children, layoutSettings }) => {
    // Extract layout settings
    const {
showBottomBarSection,
showCustomButtonSectionSection,
showCustomInputSectionSection,
showHeaderSection,
showPaginationDotsSection,
showWelcomeSectionSection,
} = layoutSettings;
// Adjust layout based on settings
    const adjustedChildren = React.Children.map(children, child => {
if (!showBottomBarSection && childName === 'BottomBar') {
return null;
}
if (!showCustomButtonSectionSection && childName === 'CustomButtonSection') {
return null;
}
if (!showCustomInputSectionSection && childName === 'CustomInputSection') {
return null;
}
if (!showHeaderSection && childName === 'Header') {
return null;
}
if (!showPaginationDotsSection && childName === 'PaginationDots') {
return null;
}
if (!showWelcomeSectionSection && childName === 'WelcomeSection') {
return null;
}
return child;
});

    return <>{adjustedChildren}</>;
};

export default ComponentManager;

// Ruined it with AutoLayoutUpdater, didn't get it to work properly yet.