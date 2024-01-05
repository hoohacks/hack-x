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
    <View style={styles.homescreenParticipants}>
      <View style={[styles.rectangleParent, styles.groupChildLayout]}>
        <TouchableOpacity onPress={NavApplication}>
          <View style={[styles.groupChild, styles.childPosition]} />
          <Text
            style={[styles.deadlineToRegister, styles.loremIpsumDolorFlexBox]}
          >
            Deadline to Register:
          </Text>
          <Text style={[styles.checkRegistration, styles.march12024Typo]}>
            Check Registration
          </Text>
          <Text style={[styles.march12024, styles.march12024Typo]}>
            March 1, 2024
          </Text>
          <Text
            style={[styles.loremIpsumDolor, styles.incomplete1Typo]}
          >{`Lorem ipsum dolor sit amet consectetur. Tellus ultrices tellus gravida blandit sociis integer a sed mauris. Ac nisi morbi donec donec nunc. Nunc ac quam integer in eget adipiscing. Quam metus nisi eget dolor vitae pharetra. `}</Text>
          <View style={[styles.incomplete, styles.incompleteLayout]}>
            <View style={[styles.incompleteChild, styles.incompleteLayout]} />
            <Text style={[styles.incomplete1, styles.incomplete1Typo]}>
              INCOMPLETE
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.heading}>
        <Text style={styles.welcomeToHoohacks}>Welcome to HooHacks!</Text>
        <Text style={[styles.timeTillHackathon, styles.incomplete1Typo]}>
          Time till hackathon:
        </Text>
        <View style={styles.timer}>
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
      <TouchableOpacity onPress={NavReferFriend}>
        <View style={[styles.referAFriend, styles.referLayout]}>
          <View style={[styles.referAFriendChild, styles.referLayout]} />
          <Text style={[styles.referAFriend1, styles.referAFriend1Clr]}>
            Refer a Friend!
          </Text>
          <Text style={[styles.getAdditionalHoocoins, styles.referAFriend1Clr]}>
            Get additional HooCoins!
          </Text>
          <Image
            style={[styles.vectorIcon, styles.iconLayout]}
            resizeMode="cover"
            source={require("../../../assets/Vector.jpg")}
          />
        </View>
      </TouchableOpacity>
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
  groupChildLayout: {
    height: 201,
    width: 353,
    position: "absolute",
  },
  button: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: 138,
    paddingVertical: 8,
    paddingHorizontal: 32,
    marginTop: 76,
    borderRadius: 28,
    borderColor: 'white',
    backgroundColor:Color.colorMidnightblue,
    borderWidth: 4,
    elevation: 3,
},
btntext:{
  color:'white'
},
  childPosition: {
    backgroundColor: Color.colorLavender,
    borderRadius: Border.br_3xs,
    top: 0,
    left: 0,
  },
  loremIpsumDolorFlexBox: {
    textAlign: "left",
    left: 21,
  },
  editButton: {
    width: "90%",
    alignSelf: "center",
    backgroundColor: "#FFFFFF",
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
  editButtonText: {
    textAlign: "center",
    color: "#121A6A",
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "ChakraPetch-Bold",
  },
  march12024Typo: {
    fontFamily: FontFamily.chakraPetchSemiBold,
    textAlign: "center",
    fontWeight: "600",
  },
  incomplete1Typo: {
    fontSize: FontSize.size_sm,
    lineHeight: 22,
    position: "absolute",
  },
  incompleteLayout: {
    height: 30,
    width: 123,
    top: 0,
    position: "absolute",
  },
  timerChildLayout: {
    width: 28,
    borderColor: Color.colorLightskyblue,
    borderWidth: 1,
    borderStyle: "solid",
    height: 36,
    borderRadius: Border.br_3xs,
    top: 0,
    position: "absolute",
  },
  textTypo1: {
    top: 7,
    fontSize: FontSize.size_5xl,
    textAlign: "center",
    color: Color.colorBlack,
    fontFamily: FontFamily.chakraPetchRegular,
    lineHeight: 22,
    position: "absolute",
  },
  textTypo: {
    top: 5,
    textAlign: "center",
    fontFamily: FontFamily.chakraPetchSemiBold,
    fontWeight: "600",
    fontSize: FontSize.size_xl,
    color: Color.colorBlack,
    position: "absolute",
  },
  timePosition: {
    top: "50%",
    width: "35.75%",
    marginTop: -27,
    height: 54,
    position: "absolute",
  },
  batteryPosition: {
    position: "absolute",
    left: "50%",
  },
  iconLayout: {
    maxHeight: "100%",
    position: "absolute",
  },
  referLayout: {
    height: 123,
    width: 353,
    position: "absolute",
  },
  referAFriend1Clr: {
    color: Color.colorMidnightblue,
    lineHeight: 22,
    position: "absolute",
  },
  navBarIcon: {
    objectFit: "contain",
    top: -4,
    transform: [
      {
        scale: 1.075,
      },
    ],
    height: "100%",
    left: 0,
    position: "absolute",
    width: "100%",
  },
  wrapperNavBar: {
    top: 745,
    height: 107,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 393,
    left: 0,
    position: "absolute",
  },
  groupChild: {
    height: 201,
    width: 353,
    position: "absolute",
  },
  deadlineToRegister: {
    width: 165,
    color: Color.colorBlack,
    fontFamily: FontFamily.chakraPetchRegular,
    lineHeight: 22,
    position: "absolute",
    fontSize: FontSize.size_base,
    top: 46,
  },
  checkRegistration: {
    top: 15,
    textAlign: "center",
    fontSize: FontSize.size_xl,
    fontFamily: FontFamily.chakraPetchSemiBold,
    color: Color.colorBlack,
    lineHeight: 22,
    position: "absolute",
    left: 21,
  },
  march12024: {
    left: 187,
    textAlign: "center",
    color: Color.colorBlack,
    lineHeight: 22,
    position: "absolute",
    fontSize: FontSize.size_base,
    top: 46,
  },
  loremIpsumDolor: {
    top: 76,
    fontFamily: FontFamily.robotoRegular,
    width: 311,
    textAlign: "left",
    left: 21,
    color: Color.colorBlack,
  },
  incompleteChild: {
    borderTopRightRadius: Border.br_3xs,
    borderBottomLeftRadius: Border.br_3xs,
    backgroundColor: "#c60000",
    left: 0,
  },
  incomplete1: {
    top: 4,
    left: 19,
    color: Color.colorWhite,
    textAlign: "center",
    fontFamily: FontFamily.chakraPetchSemiBold,
    fontWeight: "600",
  },
  incomplete: {
    left: 230,
  },
  rectangleParent: {
    top: 175,
    shadowOpacity: 1,
    elevation: 5,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowColor: "rgba(0, 0, 0, 0.25)",
    left: 20,
  },
  welcomeToHoohacks: {
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
  timeTillHackathon: {
    textAlign: "center",
    color: Color.colorBlack,
    fontFamily: FontFamily.chakraPetchRegular,
    top: 46,
    left: 0,
  },
  timerChild: {
    left: 0,
  },
  timerItem: {
    left: 32,
  },
  timerInner: {
    left: 73,
  },
  rectangleView: {
    left: 105,
  },
  text: {
    left: 64,
  },
  timerChild1: {
    left: 146,
  },
  timerChild2: {
    left: 178,
  },
  text1: {
    left: 137,
  },
  text2: {
    left: 7,
  },
  text3: {
    left: 39,
  },
  text4: {
    left: 154,
  },
  text5: {
    left: 185,
  },
  text6: {
    left: 80,
  },
  text7: {
    left: 112,
  },
  timer: {
    top: 39,
    left: 147,
    width: 206,
    height: 36,
    position: "absolute",
  },
  heading: {
    top: 78,
    height: 75,
    width: 353,
    left: 20,
    position: "absolute",
  },
  time1: {
    top: "33.96%",
    left: "36.96%",
    fontSize: FontSize.size_mid,
    fontFamily: FontFamily.sFPro,
    textAlign: "center",
    fontWeight: "600",
    color: Color.colorBlack,
    lineHeight: 22,
    position: "absolute",
  },
  time: {
    right: "64.25%",
    left: "0%",
  },
  border: {
    marginLeft: -13.66,
    top: "0%",
    bottom: "0%",
    borderRadius: Border.br_8xs_3,
    borderColor: Color.colorBlack,
    width: 25,
    opacity: 0.35,
    left: "50%",
    borderWidth: 1,
    borderStyle: "solid",
    height: "100%",
    position: "absolute",
  },
  capIcon: {
    height: "31.35%",
    marginLeft: 12.34,
    top: "36.78%",
    bottom: "31.87%",
    width: 1,
    opacity: 0.4,
    left: "50%",
  },
  capacity: {
    height: "69.23%",
    marginLeft: -11.66,
    top: "15.38%",
    bottom: "15.38%",
    borderRadius: Border.br_10xs_5,
    backgroundColor: Color.colorBlack,
    width: 21,
    left: "50%",
  },
  battery: {
    height: "24.07%",
    marginLeft: 10.75,
    top: "42.59%",
    bottom: "33.33%",
    width: 27,
    left: "50%",
  },
  wifiIcon: {
    height: "22.83%",
    marginLeft: -13.55,
    top: "43.77%",
    bottom: "33.4%",
    width: 17,
    left: "50%",
  },
  cellularConnectionIcon: {
    height: "22.64%",
    marginLeft: -40.25,
    top: "43.58%",
    bottom: "33.77%",
    width: 19,
    left: "50%",
  },
  levels: {
    right: "0%",
    left: "64.25%",
  },
  statusBar: {
    height: 54,
    top: 0,
    width: 393,
    left: 0,
    position: "absolute",
  },
  referAFriendChild: {
    backgroundColor: Color.colorLavender,
    borderRadius: Border.br_3xs,
    top: 0,
    left: 0,
  },
  referAFriend1: {
    top: 31,
    left: 22,
    textAlign: "center",
    fontFamily: FontFamily.chakraPetchSemiBold,
    fontWeight: "600",
    fontSize: FontSize.size_xl,
  },
  getAdditionalHoocoins: {
    top: 69,
    width: 181,
    textAlign: "left",
    left: 21,
    fontFamily: FontFamily.chakraPetchRegular,
    fontSize: FontSize.size_base,
  },
  vectorIcon: {
    height: "65.85%",
    width: "28.9%",
    top: "17.07%",
    right: "5.67%",
    bottom: "17.07%",
    left: "65.44%",
    maxWidth: "100%",
    overflow: "hidden",
  },
  referAFriend: {
    top: 392,
    shadowOpacity: 1,
    elevation: 5,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowColor: "rgba(0, 0, 0, 0.25)",
    left: 20,
  },
  homescreenParticipants: {
    backgroundColor: Color.colorWhite,
    flex: 1,
    height: 852,
    overflow: "hidden",
    width: "100%",
  },
});

export default Home;
