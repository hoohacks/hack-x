import * as React from "react";
import { Image, StyleSheet, View, Text, TouchableOpacity, Button } from "react-native";
import { Color, Border, FontFamily, FontSize } from "./GlobalStyles";
import CountDown from 'react-native-countdown-component';
import { useNavigation } from "@react-navigation/native";
const Home = () => {
  const navigation = useNavigation();
  const calculateTime = ()=>{
    const today = new Date();
    var endDate = new Date('2024-03-23T09:00:00');
    const num = Number(Math.round(Math.abs((today.getTime() - endDate.getTime()))/1000));
    console.log(typeof(num))
    return num;
  
  }
const sec = calculateTime();
const NavReferFriend = () => {
  navigation.navigate("ReferFriend");
}
const NavViewPart = () => {
  navigation.navigate("ViewParticipants");
}
  return (
    <View>
        <Text style={styles.title}>HooHacks Dashboard</Text>
        <Text style={styles.boldtext}>Application Deadline: March 1, 2024</Text>
        <Text style={styles.text}>You must fill out an application, and if it is accepted, fill out a confirmation to guarantee your spot!</Text>
        <Text style={styles.italictext}>We will begin accepting applications in late February/early March!</Text>
  
        <View style={styles.space} /> 

        <View>
          <Text style={styles.boldtext}>Check Registration Status: </Text>
          <Text style={[styles.text, styles.red]}>INCOMPLETE</Text>
        </View>

        <View style={styles.space} /> 

        <View>
          <Text style={styles.text}>
            Time till hackathon:
          </Text>
          <CountDown
          size={16}
          until={sec}
          onFinish={() => alert('Finished')}
          digitStyle={{backgroundColor: '#FFF', borderWidth: 2, borderColor: '#B1CCFF'}}
          digitTxtStyle={{color: '#000000'}}
          timeLabelStyle={{color: 'black', fontWeight: 'bold'}}
          separatorStyle={{color: '#B1CCFF'}}
          timeToShow={['D','H', 'M', 'S']}
          timeLabels={{d: 'Days', h: 'Hours', m: 'Minutes', s: 'Seconds'}}
          showSeparator
        />
      </View>

      <View style={styles.space} /> 

      <View>
        <TouchableOpacity onPress={NavReferFriend}>
            <Text style={styles.text}>
              Refer a Friend!
            </Text>
            <Text style={styles.text}>
              Get additional HooCoins!
            </Text>
            <Image
              resizeMode="cover"
              source={require("../../../assets/Vector.jpg")}
            />
        </TouchableOpacity>
        {/* <TouchableOpacity style={styles.editButton} onPress={NavViewPart}>
                <Text style={styles.editButtonText}>View Participants</Text>
            </TouchableOpacity> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontFamily: FontFamily.chakraPetchBold,
    fontSize: '5rem',
    textAlign: 'center',
  },
  text: {
    fontFamily: FontFamily.chakraPetchRegular,
    fontSize: '1.5rem',
    textAlign: 'center',
  },
  boldtext: {
    fontFamily: FontFamily.chakraPetchRegular,
    fontSize: '1.5rem',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  italictext: {
    fontFamily: FontFamily.chakraPetchRegular,
    fontSize: '1.25rem',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  red: {
    color: 'red',
  },
  space: {
    width: 20, // or whatever size you need
    height: 20,
  },
});

export default Home;
