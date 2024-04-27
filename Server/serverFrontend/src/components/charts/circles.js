import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Animated, Easing } from 'react-native';

const AdvancedCirclesComponent = ({ themeColors }) => {
  // Placeholder values for CPU and memory usage
  const [cpuUsage, setCpuUsage] = useState(70);
  const [memoryUsage, setMemoryUsage] = useState(70);

  // Animated values for scaling the circles
  const cpuScale = new Animated.Value(cpuUsage);
  const memoryScale = new Animated.Value(memoryUsage);

  // Animation configuration
  const animationConfig = {
    duration: 500,
    easing: Easing.linear,
    useNativeDriver: true,
  };

  // Function to update animated value and trigger animation
  const updateValueAndAnimate = (value, animatedValue) => {
    animatedValue.setValue(value);
    Animated.timing(animatedValue, animationConfig).start();
  };

  // Update the animated values whenever CPU or memory usage changes
  useEffect(() => {
    updateValueAndAnimate(cpuUsage, cpuScale);
  }, [cpuUsage]);

  useEffect(() => {
    updateValueAndAnimate(memoryUsage, memoryScale);
  }, [memoryUsage]);

  return (
    <View style={styles.container}>
      {/* CPU Usage Circle */}
      <View style={styles.circleContainer}>
        <Animated.View
          style={[styles.circle, { backgroundColor: themeColors.primary, transform: [{ scale: cpuScale }] }]}
        />
        <Text style={[styles.label, { color: themeColors.primary }]}>CPU Usage</Text>
      </View>

      {/* Memory Usage Circle */}
      <View style={styles.circleContainer}>
        <Animated.View
          style={[styles.circle, { backgroundColor: themeColors.secondary, transform: [{ scale: memoryScale }] }]}
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
  circleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  label: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AdvancedCirclesComponent;