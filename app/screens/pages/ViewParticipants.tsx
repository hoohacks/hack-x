import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import * as Font from 'expo-font';
import arrow from "../../../assets/arrow_back_ios_new.png"; // Importing the back arrow
import { useNavigation } from "@react-navigation/native";

interface User {
    name: string;
    foodwave: string;
    accepted: boolean;
}

interface CardProps {
    rank: number;
    name: string;
    foodwave: number;
    accepted: boolean;
}

const users: User[] = [
    { name: 'Test Test', foodwave: 'A', accepted:true },
    
];

const Card: React.FC<CardProps> = ({ rank, name, foodwave, accepted }) => (
    <View style={styles.card}>
        <Text style={styles.cardTitle}>{`${rank}. ${name}`}</Text>
        <Text style={styles.cardSubtitle}>foodwave: {foodwave}</Text>
        <Text style={styles.cardSubtitle}>Accepted: {{accepted}?"Yes":"No"}</Text>

    </View>
);

const ViewParticipants: React.FC = () => {
    const [fontsLoaded, setFontsLoaded] = useState(false);
    const navigation = useNavigation();

    useEffect(() => {
        const loadFonts = async () => {
            try {
                await Font.loadAsync({
                    'ChakraPetch-Bold': require('../../../assets/Chakra_Petch/ChakraPetch-Bold.ttf'),
                    'ChakraPetch-Light': require('../../../assets/Chakra_Petch/ChakraPetch-Light.ttf'),
                    'ChakraPetch-Regular': require('../../../assets/Chakra_Petch/ChakraPetch-Regular.ttf'),
                });

                setFontsLoaded(true);
            } catch (error) {
                console.error('Error loading fonts:', error);
            }
        };

        loadFonts();
    }, []);

    if (!fontsLoaded) {
        return null;
    }
    const handleBack = () => {
        console.log("Edit Profile Pressed");
        // go to EditProfile.tsx
        navigation.navigate("Profile");
      };
    return (
    //     <View style={styles.container}>
    //     <TouchableOpacity
    //     style={styles.backButton}
    //     onPress={handleBack}
    //   >
    //     <Image source={arrow} style={styles.backArrow} />
    //   </TouchableOpacity>
        <ScrollView style={styles.container}>
            {users.map((user, index) => (
                <Card key={index} rank={index + 1} name={user.name} foodwave={user.foodwave} accepted={user.accepted} />
            ))}
        </ScrollView>
        // </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#f5f5f5',
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        marginBottom: 10,
        marginTop:10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.4,
        shadowRadius: 1,
        elevation: 3,
    },
    backButton: {
        position: "absolute",
        top: 10,
        left: 10,
        zIndex: 1,
      },
      backArrow: {
        width: 25,
        height: 25,
      },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
        fontFamily: 'ChakraPetch-Bold',
    },
    cardSubtitle: {
        fontSize: 14,
        color: 'grey',
        fontFamily: 'ChakraPetch-Regular',
    },
});

export default ViewParticipants;
