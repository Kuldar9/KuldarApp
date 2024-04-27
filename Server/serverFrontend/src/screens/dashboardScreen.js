import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import Header from '../components/dashboard/header';
import Sidebar from '../components/dashboard/sidebar';
import AdvancedChartsComponent from '../components/charts/charts';
import AdvancedCirclesComponent from '../components/charts/circles';
import { ThemeContext } from '../components/navigation/screenNavigator';

const DashboardScreen = () => {
  const themeColors = useContext(ThemeContext); // Get theme colors from context

  return (
    <View style={[styles.container, { backgroundColor: themeColors.background }]}>
      <Header themeColors={themeColors} />
      <View style={styles.contentContainer}>
        <Sidebar themeColors={themeColors} />
        <View style={styles.mainContent}>
          <AdvancedChartsComponent themeColors={themeColors} />
          <AdvancedCirclesComponent themeColors={themeColors} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  mainContent: {
    flex: 1,
    flexDirection: 'column',
  },
});

export default DashboardScreen;