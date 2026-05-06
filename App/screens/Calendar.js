import React from 'react';
import { View, StyleSheet } from 'react-native';
import Calendar from '../Components/Calendar';

const CalendarApp = () => {
  return (
    <View style={styles.container}>
      <Calendar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default CalendarApp;