import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Box from './Box';

const Schedule = () => {
  const [starredEvents, setStarredEvents] = useState({});
  const [selectedDay, setSelectedDay] = useState('Saturday');

  const events = [
    { id: 'check-in-sat', day: 'Saturday', time: '9:00 AM - 9:30 AM', title: 'Check In', location: 'Rice Hall', required: true },
    { id: 'breakfast-sat', day: 'Saturday', time: '10:00 AM - 11:00 AM', title: 'Breakfast', location: 'Rice Hall' },

    { id: 'breakfast-sun', day: 'Sunday', time: '9:00 AM - 10:00 AM', title: 'Breakfast 2', location: 'Rice Hall' },
    { id: 'presentation-sun', day: 'Sunday', time: '10:00 AM - 11:00 AM', title: 'Presentation', location: 'Rice Hall' },
    { id: 'presentation-sun', day: 'Sunday', time: '11:00 AM - 1:00 PM', title: 'Bus Arrives', location: 'Rice Hall' },

  ];

  const onToggleStar = (id) => {
    setStarredEvents((prevStarredEvents) => ({
      ...prevStarredEvents,
      [id]: !prevStarredEvents[id],
    }));
  };

const renderEventsForDay = () => (
    events
      .filter(event => event.day === selectedDay)
      .map(event => (
        <Box
          key={event.id}
          {...event}
          isStarred={starredEvents[event.id]}
          onToggleStar={() => onToggleStar(event.id)}
        />
      ))
  );



  return (
    <View style={styles.container}>
      <View style={styles.dayTabs}>
        <TouchableOpacity
          style={[styles.dayTab, selectedDay === 'Saturday' && styles.dayTabActive]}
          onPress={() => setSelectedDay('Saturday')}
        >
          <Text style={styles.dayTabText}>Saturday</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.dayTab, selectedDay === 'Sunday' && styles.dayTabActive]}
          onPress={() => setSelectedDay('Sunday')}
        >
          <Text style={styles.dayTabText}>Sunday</Text>
        </TouchableOpacity>
      </View>
      <ScrollView>
        {renderEventsForDay()}
      </ScrollView>
    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  dayTabs: {
    flexDirection: 'row',
    paddingTop: 10,
  },
  dayTab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  dayTabActive: {
    borderBottomColor: '#0000FF', // Active tab underline color
  },
  dayTabText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },

  timeHeaderSection: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 16,
    },
    dot: {
      width: 10,
      height: 10,
      borderRadius: 5,
      backgroundColor: 'blue',
      marginHorizontal: 16,
    },
    timeHeaderText: {
      fontWeight: 'bold',

    },
    timeSlot: {
      paddingLeft: 36,
    },



});

export default Schedule;
