import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const Box = ({ id, time, title, location, required, isStarred, onToggleStar }) => {
  return (
    <View style={styles.box}>
      <View style={styles.timeLine}></View>
      <View style={styles.content}>
        <Text style={styles.time}>{time}</Text>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.location}>{location}</Text>
        {required && <Text style={styles.required}>Required</Text>}
      </View>
      <TouchableOpacity onPress={() => onToggleStar(id)} style={styles.starButton}>
        <Text style={styles.star}>{isStarred ? '★' : '☆'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginVertical: 4,
    marginLeft: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  timeLine: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 13,
    width: 2,
    backgroundColor: 'blue',
  },
  content: {
    flex: 1,
    paddingLeft: 20,
  },
  time: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginTop: 4,
  },
  location: {
    fontSize: 16,
    color: '#666666',
    marginTop: 4,
  },
  required: {
    color: 'red',
    fontSize: 16,
    marginTop: 4,
  },
  starButton: {

    padding: 10,
  },
  star: {

    fontSize: 20,
    color: '#FFD700',
  },

});

export default Box;
