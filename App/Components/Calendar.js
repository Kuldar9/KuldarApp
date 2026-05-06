import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import moment from 'moment';
import { useTheme } from '../Themes/theme';
import EventModal from './EventModal'; 

const Calendar = () => {
  const { colors } = useTheme();
  const [currentMonth, setCurrentMonth] = useState(moment());
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [events, setEvents] = useState({});

  // Get today's date for comparison
  const today = moment();

  const daysInMonth = () => {
    const startOfMonth = currentMonth.clone().startOf('month');
    const endOfMonth = currentMonth.clone().endOf('month');
    const days = [];
    for (let day = startOfMonth; day.isBefore(endOfMonth) || day.isSame(endOfMonth, 'day'); day.add(1, 'day')) {
      days.push(day.clone());
    }
    return days;
  };

  const addEvent = (date, eventText) => {
    if (!date || !moment.isMoment(date)) {
      console.error("Invalid date:", date);
      return;
    }
    const formattedDate = date.format('YYYY-MM-DD');
    setEvents((prevEvents) => {
      const updatedEvents = { ...prevEvents };
      if (!updatedEvents[formattedDate]) {
        updatedEvents[formattedDate] = [];
      }
      updatedEvents[formattedDate].push(eventText);
      return updatedEvents;
    });
  };

  const renderDay = (day) => {
    const isToday = day.isSame(today, 'day'); // Check if the current day is today

    return (
      <TouchableOpacity 
        style={[
          styles.dayContainer, 
          { 
            backgroundColor: colors.card,
            borderColor: isToday ? colors.primary : '#E0E0E0', // Highlight today's border color
          }
        ]} 
        onPress={() => {
          setSelectedDate(day.clone()); 
          setModalVisible(true);
        }}
      >
        <Text style={{ 
          color: isToday ? colors.primary : colors.text, // Change text color for today's date
          fontWeight: isToday ? 'bold' : 'normal', // Make today's date bold
        }}>
          {day.date()}
        </Text>
        {events[day.format('YYYY-MM-DD')] && events[day.format('YYYY-MM-DD')].map((event, index) => (
          <Text key={index} style={{ color: colors.subText, fontSize: 12 }}>
            {event}
          </Text>
        ))}
      </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.monthText, { color: colors.text }]}>
        {currentMonth.format('MMMM YYYY')}
      </Text>
      <View style={styles.navigation}>
        <TouchableOpacity onPress={() => setCurrentMonth(currentMonth.clone().subtract(1, 'month'))}>
          <Text style={{ color: colors.primary }}>Previous</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setCurrentMonth(currentMonth.clone().add(1, 'month'))}>
          <Text style={{ color: colors.primary }}>Next</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={daysInMonth()}
        renderItem={({ item }) => renderDay(item)}
        keyExtractor={item => item.format('YYYY-MM-DD')}
        numColumns={7}
      />
      <EventModal 
        isVisible={modalVisible} 
        onClose={() => setModalVisible(false)} 
        selectedDate={selectedDate} 
        addEvent={addEvent} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  monthText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 16,
  },
  dayContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 80,
    borderWidth: 1,
    margin: 2,
    borderRadius: 8,
  },
});

export default Calendar;