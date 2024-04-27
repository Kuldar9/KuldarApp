import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Animated, Easing } from 'react-native';
import { PieChart } from 'react-native-svg';

const AnimatedPieChart = Animated.createAnimatedComponent(PieChart);

const AdvancedChartsComponent = ({ themeColors }) => {
  // Placeholder values for CPU and memory usage
  const [cpuUsage, setCpuUsage] = useState(70);
  const [memoryUsage, setMemoryUsage] = useState(70);

  // Animated values for animating chart slices
  const animatedCpuUsage = new Animated.Value(0);
  const animatedMemoryUsage = new Animated.Value(0);

  // Animation configuration
  const animationConfig = {
    toValue: 1,
    duration: 1000,
    easing: Easing.out(Easing.cubic),
    useNativeDriver: false,
  };

  // Function to update animated value and trigger animation
  const animateChart = (animatedValue, usage) => {
    animatedValue.setValue(0);
    Animated.timing(animatedValue, animationConfig).start(() => {
      animatedValue.setValue(usage / 100);
    });
  };

  // Update the animated values whenever CPU or memory usage changes
  useEffect(() => {
    animateChart(animatedCpuUsage, cpuUsage);
  }, [cpuUsage]);

  useEffect(() => {
    animateChart(animatedMemoryUsage, memoryUsage);
  }, [memoryUsage]);

  return (
    <View style={styles.container}>
      {/* CPU Usage Chart */}
      <View style={styles.chartContainer}>
        <AnimatedPieChart
          style={{ height: 200 }}
          data={[cpuUsage, 100 - cpuUsage]}
          innerRadius={70}
          outerRadius={80}
          padAngle={0.04}
          startAngle={-Math.PI * 0.5}
          endAngle={Math.PI * 1.5}
          animate={true}
          animationDuration={1000}
          animateWithPieRotation={false}
          colors={[themeColors.primary, themeColors.background]}
        />
        <Text style={[styles.label, { color: themeColors.primary }]}>CPU Usage</Text>
      </View>

      {/* Memory Usage Chart */}
      <View style={styles.chartContainer}>
        <AnimatedPieChart
          style={{ height: 200 }}
          data={[memoryUsage, 100 - memoryUsage]}
          innerRadius={70}
          outerRadius={80}
          padAngle={0.04}
          startAngle={-Math.PI * 0.5}
          endAngle={Math.PI * 1.5}
          animate={true}
          animationDuration={1000}
          animateWithPieRotation={false}
          colors={[themeColors.secondary, themeColors.background]}
        />
        <Text style={[styles.label, { color: themeColors.secondary }]}>Memory Usage</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    padding: 10,
  },
  chartContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AdvancedChartsComponent;