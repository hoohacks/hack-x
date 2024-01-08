import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, View, TouchableOpacity, Dimensions} from 'react-native';
import Box from './Box';
import { Color, Border, FontFamily, FontSize } from "../../../assets/style/GlobalStyles";

const Schedule = () => {
  const [starredEvents, setStarredEvents] = useState({});
  const [selectedDay, setSelectedDay] = useState('Saturday');

const events = [

// make sure that the event id is unique for each event

  { id: 'check-in-sat', day: 'Saturday', time: '9:00 AM - 9:30 AM', title: 'Check In', location: 'Rice Hall', required: true },
  { id: 'breakfast-sat', day: 'Saturday', time: '10:00 AM - 11:00 AM', title: 'Breakfast', location: 'Rice Hall' },
  { id: 'opening', day: 'Saturday', time: '10:30 AM - 11:00 AM', title: 'Opening Ceremony', location: 'Rice Hall' },
  { id: 'begin', day: 'Saturday', time: '12:00 PM - 1:00 AM', title: 'Hacking Begins', location: 'Rice Hall' },


  { id: 'breakfast-sun', day: 'Sunday', time: '9:00 AM - 10:00 AM', title: 'Breakfast 2', location: 'Rice Hall' },
  { id: 'presentation-sun', day: 'Sunday', time: '10:00 AM - 11:00 AM', title: 'Presentation', location: 'Rice Hall' },
  { id: 'bus-sun', day: 'Sunday', time: '11:00 AM - 1:00 PM', title: 'Bus Arrives', location: 'Rice Hall' }
];

  const onToggleStar = (id) => {
    setStarredEvents((prevStarredEvents) => ({
      ...prevStarredEvents,
      [id]: !prevStarredEvents[id],
    }));
  };

  const renderEventsForDay = (day) => (
    events
      .filter(event => event.day === day)
      .map(event => (
        <Box
          key={event.id}
          {...event}
          isStarred={starredEvents[event.id]}
          onToggleStar={() => onToggleStar(event.id)}
        />
      ))
  );

  const [screenWidth, setScreenWidth] = useState(Dimensions.get('window').width);

  useEffect(() => {
    const onChange = () => {
      setScreenWidth(Dimensions.get('window').width);
    };
    const subscription = Dimensions.addEventListener('change', onChange);

    return () => {
      subscription.remove();
    };

  }, []);


  return (
    <Text style={styles.comingSoon}>Coming Soon...</Text>

    //   <View style={{
    //     marginLeft: screenWidth > 768 ? 250 : 0,
    //   }}
    //   >
    // <View style={styles.container}>
    //   <View style={styles.dayTabs}>
    //     <TouchableOpacity
    //       style={[styles.dayTab, selectedDay === 'Saturday' && styles.dayTabActive]}
    //       onPress={() => setSelectedDay('Saturday')}
    //     >
    //       <Text style={styles.dayTabText}>Saturday</Text>
    //     </TouchableOpacity>
    //     <TouchableOpacity
    //       style={[styles.dayTab, selectedDay === 'Sunday' && styles.dayTabActive]}
    //       onPress={() => setSelectedDay('Sunday')}
    //     >
    //       <Text style={styles.dayTabText}>Sunday</Text>
    //     </TouchableOpacity>
    //   </View>
    //   <ScrollView>
    //     {renderEventsForDay(selectedDay)}
    //   </ScrollView>
    // </View>
    //   </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  }, 
  comingSoon: {
    fontWeight: "700",
    fontFamily: FontFamily.chakraPetchBold,
    fontSize: FontSize.size_5xl,
    textAlign: "center",
    color: Color.colorBlack,
    lineHeight: 22,
    position: "absolute",
    marginTop: 50,
    width: '100%', // Full width of the screen
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