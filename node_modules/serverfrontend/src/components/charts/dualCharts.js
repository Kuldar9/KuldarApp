// dualCharts.js
import React, { useContext } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit'; // Assuming installed
import { ThemeContext } from '../utils/themeProvider'; // Adjust path as needed

const screenWidth = Dimensions.get('window').width; // Full width for the ScrollView

const DualChartComponent = ({ data1 = sampleData1, data2 = sampleData2 }) => {
  console.log('const DualChartComponent, file: dualCharts.js');
  const theme = useContext(ThemeContext);

  const chartConfig = {
    backgroundGradientFrom: theme.secondaryBackground,
    backgroundGradientTo: theme.secondaryBackground,
    color: (opacity = 1) => theme.accent, // Line color set to accent color from theme
    labelColor: (opacity = 1) => theme.primaryText, // Label color set to primary text color from theme
    strokeWidth: 2,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '6',
      strokeWidth: '2',
      stroke: theme.accent, // Dot border color set to accent color from theme
    },
  };

  const [selectedChartIndex, setSelectedChartIndex] = React.useState(null);

  const handleTouchStart = (chartIndex) => {
    console.log('const handleTouchStart, file: dualCharts.js');
    setSelectedChartIndex(chartIndex); // Set the touched chart as selected
  };

  const handleTouchMove = (event, chartIndex) => {
    console.log('const handleTouchMove, file: dualCharts.js');
    if (chartIndex !== selectedChartIndex) return; // Ignore touch move if not on selected chart

    const { locationX, locationY } = event.nativeEvent;
    const chartData = data1[chartIndex] || data2[chartIndex]; // Get data for the selected chart

    // Implement logic to highlight data point closest to touch position (example)
    const closestDataIndex = getClosestDataIndex(locationX, locationY, chartData.points);
    if (closestDataIndex !== null) {
      // Highlight the closest data point visually (replace with your styling approach)
      chartData.points[closestDataIndex].color = 'red'; // Example highlighting
    }
  };

  const getClosestDataIndex = (touchX, touchY, dataPoints) => {
    console.log('const getClosestDataIndex, file: dualCharts.js');
    let closestIndex = null;
    let minDistance = Infinity;

    dataPoints.forEach((dataPoint, index) => {
      const distance = Math.sqrt(Math.pow(touchX - dataPoint.x, 2) + Math.pow(touchY - dataPoint.y, 2));
      if (distance < minDistance) {
        closestIndex = index;
        minDistance = distance;
      }
    });

    return closestIndex;
  };
  
  console.log('chartConfig done, moving to loading view, file: dualCharts.js');

  return (
    <View style={styles.container}>
      <View style={styles.chartContainer}>
        <Text>Bezier Line Chart 1</Text>
        <LineChart
          data={data1}
          width={screenWidth / 2 - 16}
          height={220}
          chartConfig={chartConfig}
          bezier
          style={styles.chartStyle}
          onTouchStart={() => handleTouchStart(0)} // Call with chart index (0 for chart 1)
          onTouchMove={(event) => handleTouchMove(event, 0)} // Pass event and chart index
        />
      </View>
      {/* Similar approach for chart 2 */}
      <View style={styles.chartContainer}>
        <Text>Bezier Line Chart 2</Text>
        <LineChart
          data={data2}
          width={screenWidth / 2 - 16}
          height={220}
          chartConfig={chartConfig}
          bezier
          style={styles.chartStyle}
          onTouchStart={() => handleTouchStart(1)} // Call with chart index (1 for chart 2)
          onTouchMove={(event) => handleTouchMove(event, 1)} // Pass event and chart index
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    alignItems: 'center',
    backgroundColor: '#00000000', // Transparent background to take color from ThemeProvider
  },
  chartContainer: {
    margin: 8, // Add margin for spacing between charts
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chartStyle: {
    marginVertical: 8,
    borderRadius: 16,
  },
});

export default DualChartComponent;