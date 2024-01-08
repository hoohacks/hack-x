import * as React from "react";
import {
  Image,
  StyleSheet,
  View,
  Text,
  Pressable,
  Button, Dimensions,
} from "react-native";
import { Color, Border, FontFamily, FontSize } from "../../../assets/style/GlobalStyles";
import CountDown from "react-native-countdown-component";
import { useNavigation } from "@react-navigation/native";
import { User, getAuth } from "firebase/auth";
import { FIREBASE_AUTH, FIRESTORE_DB } from "../../../firebase/FirebaseConfig";
import { doc, runTransaction } from "@firebase/firestore";
import { useEffect, useState } from "react";
import * as Font from "expo-font";

const Home = () => {
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


  const navigation = useNavigation();
  const calculateTime = () => {
    const today = new Date();
    var endDate = new Date("2024-03-23T09:00:00");
    const num = Number(
      Math.round(Math.abs(today.getTime() - endDate.getTime()) / 1000)
    );
    return num;
  };
  const sec = calculateTime();
  const NavApplication = () => {
    navigation.navigate("Application");
  };
  const NavViewPart = () => {
    navigation.navigate("ParticipantView");
  };

  // authentication
  const auth = getAuth();
  const [user, setUser] = React.useState<User | null>(null);

  // user information
  const [status, setStatus] = React.useState("");
  const [btnTitle, setBtnTitle] = React.useState("");
  React.useEffect(() => {

    setTimeout(() => {
      setUser(FIREBASE_AUTH.currentUser);

      const fetchData = async () => {
        try {
          await runTransaction(FIRESTORE_DB, async (transaction) => {
            const userDoc = await transaction.get(doc(FIRESTORE_DB, "users", FIREBASE_AUTH.currentUser?.uid));
            if (!userDoc.exists()) {
              alert("User does not exist!");
              return;
            }
            console.log(userDoc.data().applicationComplete);
            if (userDoc.data().applicationComplete) {
              setStatus("submitted");
              setBtnTitle("Check Application")
            } else {
              setStatus("incomplete")
              setBtnTitle("Apply")
            }
          });
          console.log("User transaction successfully committed!");
        } catch (e) {
          alert("Transaction failed: " + e);
        }
      }

      fetchData();
    })
  }, []);

  const responsiveStyles = StyleSheet.create({
    header: {
      padding: screenWidth > 768 ? '1rem' : '0.5rem',
    },
    card: {
      margin: screenWidth > 768 ? '0.5rem' : '0.30rem',
      padding: screenWidth > 768 ? '0.75rem' : '0.5rem', // Reduce padding on smaller screens
      width: screenWidth > 768 ? 400 : screenWidth > 480 ? screenWidth - 50 : screenWidth - 30, // More dynamic width adjustment
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      borderRadius: 10,
      backgroundColor: 'white'
    },
    cards_view: {
      flexDirection: screenWidth > 1085 ? 'row' : 'column',
    },
    cardTitle: {
      fontSize: screenWidth > 600 ? '1.5rem' : '1.4rem', // Scale down font size
      fontFamily: FontFamily.chakraPetchBold,
    },
    cardText: {
      fontSize: screenWidth > 600 ? '1rem' : '0.9rem', // Scale down font size
      fontFamily: FontFamily.chakraPetchRegular,
    },
    vectorIcon: {
      height: "75%",
      width: "75%",
      maxWidth: "100%",
      maxHeight: "100%",
    },
    countdownContainer: {
      alignSelf: 'flex-start', // Aligns the container to the start of the flex-direction
      marginTop: 10, // Adjust this value as needed
      flexDirection: 'column', // Aligns children (Text and CountDown) in a column
    },
  });

  return (
    <View style={{
      marginLeft: screenWidth > 768 ? 250 : 0,
    }}
    >
      <View style={styles.body, responsiveStyles}>
        <View style={styles.header, responsiveStyles.header}>
          <Text style={styles.title}>Welcome to HooHacks!</Text>
          <Text style={styles.countdownText}>
            Countdown to HooHacks:
          </Text>
          <View style={responsiveStyles.countdownContainer}>
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
            /></View>
        </View>

        <View style={responsiveStyles.cards_view}>
          {/* <Pressable onPress={NavApplication}> */}
          <View style={styles.registration_card, responsiveStyles.card}>
            <View style={styles.card_header}>
              <Button style={responsiveStyles.cardTitle} title={btnTitle} color="#121A6A" onPress={NavApplication}>
              </Button>
              {/* status of their application and CONFIRMATiON TO DO */}
              {status === "incomplete" && (
                <Text style={styles.app_status_incomplete}>
                  INCOMPLETE
                </Text>
              )}
              {status === "submitted" && (
                <Text style={styles.app_status_submitted}>
                  AWAITING APPROVAL
                </Text>
              )}
            </View>

            <View style={styles.space} />

            <Text><Text style={responsiveStyles.cardText}>Application Deadline: </Text><Text style={[styles.card_text, styles.bold_text]}>February 28, 2024</Text></Text>
            <Text><Text style={responsiveStyles.cardText}>Confirmation Deadline: </Text><Text style={[styles.card_text, styles.bold_text]}>March 1, 2024</Text></Text>

            <View style={styles.space} />

            <Text style={responsiveStyles.cardText}>
              You must fill out an application, and if it is accepted, fill out a confirmation to guarantee your spot!
            </Text>

            <View style={styles.space} />

            <Text style={[styles.card_text, styles.italic_text, responsiveStyles.cardText]}>
              We will start accepting applications during mid to late February.
            </Text>
          </View>
          {/* </Pressable> */}

          <View style={styles.refer_card, responsiveStyles.card}>
            <View style={styles.card_header}>
              <Text style={styles.card_title, responsiveStyles.cardTitle}>
                Refer a Friend!
              </Text>

              <Image
                style={[responsiveStyles.vectorIcon]}
                resizeMode="contain"
                source={require("../../../assets/Vector.jpg")}
              />
            </View>

            <View style={styles.space} />

            <Text style={responsiveStyles.cardText}>
              If you refer a friend, you will get additional HooCoins, which will be used to win raffle prizes during the event!
              Please forward your HooCoin ID to your friend for their application: <Text style={styles.bold_text}>{user?.uid}</Text>
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
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
  appBtn: {
    padding: '0.5rem',
    fontFamily: FontFamily.chakraPetchRegular,
    textAlign: 'center',
    textAlignVertical: 'center',
    justifyContent: 'flex-end'
  },
  header: {
    padding: '1rem',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%' // add width 
  },
  card_header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%' // add width 
  },
  bold_text: {
    fontWeight: 'bold',
  },
  italic_text: {
    fontStyle: 'italic',
  },
  app_status_incomplete: {
    padding: '0.5rem',
    backgroundColor: 'red',
    color: 'white',
    fontFamily: FontFamily.chakraPetchRegular,
    textAlign: 'center',
    textAlignVertical: 'center'
  },
  app_status_submitted: {
    padding: '0.5rem',
    backgroundColor: '#E7B400',
    color: 'white',
    fontFamily: FontFamily.chakraPetchRegular,
    textAlign: 'center',
    textAlignVertical: 'center'
  },
  registration_card: {
    margin: '0.5rem',
    padding: '0.75rem',
    width: 400,
    height: 225,
    boxShadow: "10px 10px 17px -12px rgba(0,0,0,0.75)",
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    backgroundColor: 'white'
  },
  refer_card: {
    margin: '0.5rem',
    padding: '0.75rem',
    width: 400,
    height: 225,
    boxShadow: "10px 10px 17px -12px rgba(0,0,0,0.75)",
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    backgroundColor: 'white'
  },
  space: {
    width: '.5rem', // or whatever size you need
    height: '.5rem',
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
    backgroundColor: Color.colorMidnightblue,
    elevation: 3,
  },
  btntext: {
    color: 'white',
    textAlign: 'center',
    fontSize: '1rem',
    fontFamily: FontFamily.chakraPetchRegular,
  },
})

export default Home;
