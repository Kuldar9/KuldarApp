import React, { useContext } from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';
import { DonutChart } from 'react-native-circular-chart';
import { ThemeContext } from '../utils/themeProvider';

const DualCircularCharts = ({ cpuUsage, memoryUsage, cpuText, memoryText }) => {
  console.log('const DualCircularCharts, file: dualCircularCharts.js');
  const colors = useContext(ThemeContext);
  const screenWidth = Dimensions.get('window').width;
  const chartSizePercentage = 0.15; // Percentage of screen width for the chart size
  const containerSizePercentage = 0.5; // Percentage of screen width for the container size

  const styles = getStyles(screenWidth, chartSizePercentage, colors);
  console.log('previous done, loading view: dualCircularCharts.js');
  return (
      <View style={styles.container}>
        <View style={styles.chartBox}>
          <Text style={[styles.chartLabel, { color: colors.accent, paddingBottom: 16 }]}>{cpuText}</Text>
          <View style={styles.chartContainer}>
            <DonutChart
              data={[
                { name: 'Usage', value: cpuUsage, color: colors.accent },
                { name: 'Remaining', value: 101 - cpuUsage, color: 'transparent' },
              ]}
              strokeWidth={10}
              radius={screenWidth * chartSizePercentage / 2}
              containerWidth={screenWidth * containerSizePercentage}
              containerHeight={screenWidth * containerSizePercentage}
              type="round"
              startAngle={0}
              endAngle={360}
              animationType="slide"
            />
          </View>
        </View>

        <View style={styles.chartBox}>
          <Text style={[styles.chartLabel, { color: colors.secondaryText, paddingBottom: 16 }]}>{memoryText}</Text>
          <View style={styles.chartContainer}>
            <DonutChart
              data={[
                { name: 'Usage', value: memoryUsage, color: colors.secondaryText },
                { name: 'Remaining', value: 101 - memoryUsage, color: 'transparent' },
              ]}
              strokeWidth={10}
              radius={screenWidth * chartSizePercentage / 2}
              containerWidth={screenWidth * containerSizePercentage}
              containerHeight={screenWidth * containerSizePercentage}
              type="round"
              startAngle={0}
              endAngle={360}
              animationType="slide"
            />
          </View>
        </View>
      </View>
  );
};

const getStyles = (screenWidth, chartSizePercentage, colors) => StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around', // This distributes the children evenly
    alignItems: 'center',
  },
  chartBox: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 16,
    padding: 16,
    margin: 8,
    backgroundColor: colors.secondaryBackground, // This line sets the chart box background color
  },
  chartContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center', // Ensures the DonutChart is centered in the view
    width: screenWidth * chartSizePercentage,
    height: screenWidth * chartSizePercentage,
  },
  chartLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
    textAlign: 'center', // Center the label text
    color: colors.primaryText,
  },
  usageText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default DualCircularCharts;