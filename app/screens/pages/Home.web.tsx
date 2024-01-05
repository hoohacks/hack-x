import * as React from "react";
import {
  Image,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Button,
} from "react-native";
import { Color, Border, FontFamily, FontSize } from "./GlobalStyles";
import CountDown from "react-native-countdown-component";
import { useNavigation } from "@react-navigation/native";
import { getAuth, signOut } from "firebase/auth";

const Home = () => {
  const navigation = useNavigation();
  const calculateTime = () => {
    const today = new Date();
    var endDate = new Date("2024-03-23T09:00:00");
    const num = Number(
      Math.round(Math.abs(today.getTime() - endDate.getTime()) / 1000)
    );
    console.log(typeof num);
    return num;
  };
  const sec = calculateTime();
  const NavReferFriend = () => {
    navigation.navigate("ReferFriend");
  };
  const NavApplication = () => {
    navigation.navigate("Application");
  };
  const NavViewPart = () => {
    navigation.navigate("ViewParticipants");
  };
  const auth = getAuth();

  return (
    <View style={styles.body}>
      <View style={styles.header}>
        <Text style={styles.title}>Welcome to HooHacks!</Text>
        <View >
          <Text style={styles.countdownText}>
            Countdown to HooHacks:
          </Text>
          <CountDown
            size={16}
            until={sec}
            onFinish={() => alert("Finished")}
            digitStyle={{
              backgroundColor: "#FFF",
              borderWidth: 2,
              borderColor: "#B1CCFF",
            }}
            digitTxtStyle={{ color: "#000000" }}
            timeLabelStyle={{ color: "black", fontWeight: "bold" }}
            separatorStyle={{ color: "#B1CCFF" }}
            timeToShow={["D", "H", "M", "S"]}
            timeLabels={{ d: "Days", h: "Hours", m: "Minutes", s: "Seconds" }}
            showSeparator
          />
        </View>
      </View>

      <View style={styles.cards_view}>
        <TouchableOpacity onPress={NavApplication}>
          <View style={styles.registration_card}>
            <View style={styles.card_header}>
              <Text style={styles.card_title}>
                Check Application
              </Text>
              <Text style={styles.app_status}>
                INCOMPLETE
              </Text>
            </View>

            <View style={styles.space} />

            <Text><Text style={styles.card_text}>Application Deadline: </Text><Text style={[styles.card_text, styles.bold_text]}>February 28, 2024</Text></Text>
            <Text><Text style={styles.card_text}>Confirmation Deadline: </Text><Text style={[styles.card_text, styles.bold_text]}>March 1, 2024</Text></Text>

            <View style={styles.space} />

            <Text style={styles.card_text}>
              You must fill out an application, and if it is accepted, fill out a confirmation to guarantee your spot!
            </Text>

            <View style={styles.space} />

            <Text style={[styles.card_text, styles.italic_text]}>
              We will start accepting applications during mid to late February.
            </Text>
          </View>
        </TouchableOpacity>
 
        <TouchableOpacity onPress={NavReferFriend}>
          <View style={styles.refer_card}>
            <View style={styles.card_header}>
              <Text style={styles.card_title}>
                Refer a Friend!
              </Text>

              <Image
                style={[styles.vectorIcon]}
                resizeMode="contain"
                source={require("../../../assets/Vector.jpg")}
            />
            </View>

            <View style={styles.space} />

            <Text style={styles.card_text}>
              If you refer a friend, you will get additional HooCoins, which will be used to win raffle prizes during the event!
            </Text>
          </View>
        </TouchableOpacity>

      </View>
      
      
      {/* <TouchableOpacity style={styles.editButton} onPress={NavViewPart}>
               <Text style={styles.editButtonText}>View Participants</Text>
           </TouchableOpacity> */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => signOut(auth)}
      >
        <Text style={styles.btntext}>Signout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  body:{
    flexDirection: 'column',
  },
  title: {
    fontFamily: FontFamily.chakraPetchBold,
    fontSize: '3rem',
    textAlign: 'left',
  },
  countdownText: {
    fontFamily: FontFamily.chakraPetchRegular,
    fontSize: '1.5rem',
  },
  header: {
    padding: '1rem',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width:'100%' // add width 
  },
  card_header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width:'100%' // add width 
  },
  cards_view: {
    flexDirection: 'row',
  },
  card_title: {
    fontFamily: FontFamily.chakraPetchBold,
    fontSize: '1.5rem'
  },
  card_text: {
    fontSize: '1rem',
  },
  bold_text: {
    fontWeight: 'bold',
  },
  italic_text:{
    fontStyle: 'italic',
  },
  app_status: {
    padding: '0.5rem',
    backgroundColor: 'red',
    color: 'white',
    fontFamily: FontFamily.chakraPetchRegular,
    textAlign: 'center',
    textAlignVertical: 'center'
  },
  registration_card:{
    margin: '0.5rem',
    padding: '0.75rem',
    width: 400,
    height: 225,
    boxShadow: "10px 10px 17px -12px rgba(0,0,0,0.75)",
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius : 10,
    borderBottomRightRadius: 10,
    backgroundColor: 'white'
  },
  refer_card:{
    margin: '0.5rem',
    padding: '0.75rem',
    width: 400,
    height: 225,
    boxShadow: "10px 10px 17px -12px rgba(0,0,0,0.75)",
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius : 10,
    borderBottomRightRadius: 10,
    backgroundColor: 'white'
  },
  space: {
    width: '.5rem', // or whatever size you need
    height: '.5rem',
  },
  vectorIcon: {
    height: "75%",
    width: "75%",
    maxWidth: "100%",
    maxHeight: "100%",
  },
  button: {
    margin: '0.5rem',
    padding: '0.2rem',
    textAlign: 'center',
    alignContent: 'center',
    alignItems: 'center',
    height: 30,
    width: 100,
    borderRadius: 28,
    backgroundColor:Color.colorMidnightblue,
    elevation: 3,
  },
  btntext:{
    color:'white',
    textAlign:'center',
    fontSize: '1rem',
    fontFamily: FontFamily.chakraPetchRegular,
  },
})

export default Home;
