import React from 'react';
import { View, Button } from 'react-native';

const Sidebar = ({ navigation, themeColors }) => {
  const handleNavigation = (routeName) => {
    navigation.navigate(routeName);
  };

  return (
    <View style={{ backgroundColor: themeColors.background, borderColor: themeColors.borderColor, borderRightWidth: 1, paddingVertical: 10, paddingHorizontal: 5 }}>
      <View style={{ justifyContent: 'center', alignItems: 'flex-start' }}>
        <View style={{ marginVertical: 5 }}>
          <Button title="Home" color={themeColors.primary} onPress={() => handleNavigation('Home')} />
        </View>
        <View style={{ marginVertical: 5 }}>
          <Button title="Dashboard" color={themeColors.secondary} onPress={() => handleNavigation('Dashboard')} />
        </View>
        {/* Add more buttons for navigation with different colors */}
      </View>
    </View>
  );
};

export default Sidebar;