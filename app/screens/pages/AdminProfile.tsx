import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  Button,
} from "react-native";

import * as Font from "expo-font";
import { useNavigation } from "@react-navigation/native";
import { Color, FontFamily, FontSize } from "./GlobalStyles";

type Props = {};

const AdminProfile = () => {
  const navigation = useNavigation();

  return (
    

    <View style={styles.logoContainer}>
      <View style={styles.heading}>
        <Text style={styles.helloAdmin}>Hello, Admin!</Text>
      </View>
      
      {/* Image component */}
      <Image
        source={require("../../../assets/favicon.png")}
        style={styles.logoImage}
      />

      {/* Button components */}
      <View style={styles.buttonContainer}>
        {/* participants buttonm, but needs to navigate to participants page when ready */}
        <TouchableOpacity style={styles.ParticipantsButton} onPress={() => navigation.navigate('Schedule')}>
          <Text style={styles.ButtonText}>Participants</Text>
        </TouchableOpacity>
        {/* schedule button */}
        <TouchableOpacity style={styles.ScheduleButton} onPress={() => navigation.navigate('Schedule')}>
          <Text style={styles.ButtonText}>Schedule</Text>
        </TouchableOpacity>
        {/* statistics button, but needs to navigate to statistics page when ready */}
        <TouchableOpacity style={styles.StatisticsButton} onPress={() => navigation.navigate('Schedule')}>
          <Text style={styles.ButtonText}>Statistics</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  ParticipantsButton: {
    width: 200,
    alignSelf: "center",
    backgroundColor: "#020f4f",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 3 },
    shadowOpacity: 0.6,
    shadowRadius: 2.5,
    elevation: 3,
  },

  ScheduleButton: {
    width: 200,
    alignSelf: "center",
    backgroundColor: "#0723ad",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 3 },
    shadowOpacity: 0.6,
    shadowRadius: 2.5,
    elevation: 3,
  },

  StatisticsButton: {
    width: 200,
    alignSelf: "center",
    backgroundColor: "#5c76f7",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 3 },
    shadowOpacity: 0.6,
    shadowRadius: 2.5,
    elevation: 3,
  },
  
  ButtonText: {
    textAlign: "center",
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "ChakraPetch-Bold",
  },
  logoContainer: {
    alignItems: "center",
    paddingTop: 100,
    flex: 1,
  },
  buttonContainer: {
    alignItems: "center",
    backgroundColor: " #FFFFFF",
    paddingTop: 50,
    flex: 1,
  },
  logoImage: {
    width: 200,
    height: 200,
  },
  helloAdmin: {
    fontWeight: "700",
    fontFamily: FontFamily.chakraPetchBold,
    fontSize: FontSize.size_5xl,
    textAlign: "center",
    color: Color.colorBlack,
    lineHeight: 22,
    top: 0,
    left: 0,
    position: "absolute",
  },
  heading: {
    top: 40,
    height: 75,
    width: 353,
    left: 20,
    position: "absolute",
  },
});

export default AdminProfile;
