// dashboardScreen.js
console.log('Executing file: dashboardScreen.js');
import React, { useContext } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { ThemeContext } from '../components/utils/themeProvider';
import DualChartComponent from '../components/charts/dualCharts'; 
import DualCircularCharts from '../components/charts/dualCircularCharts';

const DashboardScreen = ({ cpuUsage, memoryUsage }) => {
  console.log('const DashboardScreen, file: dashboardScreen.js');
  const colors = useContext(ThemeContext);

  // More structured sample data for the charts
  const sampleData1 = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [{
      data: [20, 45, 28, 80, 99, 43],
      color: (opacity = 1) => `rgba(255, 99, 132, ${opacity})`, // Red line color
      strokeWidth: 2
    }]
  };

  const sampleData2 = {
    labels: ['July', 'August', 'September', 'October', 'November', 'December'],
    datasets: [{
      data: [65, 59, 80, 81, 56, 55],
      color: (opacity = 1) => `rgba(54, 162, 235, ${opacity})`, // Blue line color
      strokeWidth: 2
    }]
  };

  console.log('previous done, loading view, file: dashboardScreen.js');
  return (
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, backgroundColor: colors.background }}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
      >
        <View style={[styles.container, { minHeight: '100%' }]}>
          <View style={styles.chartContainer}>
            <DualChartComponent
              data1={sampleData1}
              data2={sampleData2}
            />
          </View>
          <View style={styles.chartContainer}>
            <DualCircularCharts
              cpuUsage={50}
              memoryUsage={80}
              cpuText="CPU Usage"
              memoryText="Memory Usage"
            />
          </View>
        </View>
      </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chartContainer: {
    marginBottom: 20,
  },
});

export default DashboardScreen;