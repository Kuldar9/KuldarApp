// UniversalLayout.js
import React from 'react';
import ComponentManager from './ComponentManager';
import BottomBar from '../Components/BottomBar';
import CustomButtonSection from '../Components/CustomButtonSection';
import CustomInputSection from '../Components/CustomInputSection';
import Header from '../Components/Header';
import PaginationDots from '../Components/PaginationDots';
import WelcomeSection from '../Components/WelcomeSection';

const UniversalLayout = ({ layoutSettings }) => {
    return (
        <ComponentManager layoutSettings={layoutSettings}>
            {layoutSettings.showHeader && <Header />}
            {layoutSettings.showCustomButtonSection && <CustomButtonSection />}
            {layoutSettings.showCustomInputSection && <CustomInputSection />}
            {layoutSettings.showBottomBar && <BottomBar />}
            {layoutSettings.showPaginationDots && <PaginationDots />}
            {layoutSettings.showLoginSection && <LoginSection />}
            {layoutSettings.showWelcomeSection && <WelcomeSection />}
        </ComponentManager>
    );
};

export default UniversalLayout;