import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import * as Font from 'expo-font';
import { Color, Border, FontFamily, FontSize } from "./GlobalStyles";

interface User {
    name: string;
    hoocoins: number;
}

interface CardProps {
    rank: number;
    name: string;
    hoocoins: number;
}

const users: User[] = [
    { name: 'Varizzy Rizzy', hoocoins: 100 },
    { name: 'Varizzy Rizzy', hoocoins: 95 },
    { name: 'Varizzy Rizzy', hoocoins: 85 },
    { name: 'Varizzy Rizzy', hoocoins: 75 },
    { name: 'Varizzy Rizzy', hoocoins: 65 },
    { name: 'Varizzy Rizzy', hoocoins: 55 },
    { name: 'Varizzy Rizzy', hoocoins: 45 },
    { name: 'Varizzy Rizzy', hoocoins: 35 },
    { name: 'Varizzy Rizzy', hoocoins: 25 },
    { name: 'Varizzy Rizzy', hoocoins: 15 },
    { name: 'Varizzy Rizzy', hoocoins: 10 },
    { name: 'Varizzy Rizzy', hoocoins: 5 },
    { name: 'Varizzy Rizzy', hoocoins: 4 },
    { name: 'Varizzy Rizzy', hoocoins: 3 },
    { name: 'Varizzy Rizzy', hoocoins: 2 },
    { name: 'Varizzy Rizzy', hoocoins: 1 },
];

const Card: React.FC<CardProps> = ({ rank, name, hoocoins }) => (
    <View style={styles.card}>
        <Text style={styles.cardTitle}>{`${rank}. ${name}`}</Text>
        <Text style={styles.cardSubtitle}>{hoocoins} HooCoins</Text>
    </View>
);

const Leaderboard: React.FC = () => {
    const [fontsLoaded, setFontsLoaded] = useState(false);

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

    return (
        <Text style={styles.comingSoon}>Coming Soon...</Text>

        // <ScrollView style={styles.container}>
        //     {users.map((user, index) => (
        //         <Card key={index} rank={index + 1} name={user.name} hoocoins={user.hoocoins} />
        //     ))}
        // </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#f5f5f5',
    }, 
    comingSoon: {
        fontWeight: "700",
        fontFamily: FontFamily.chakraPetchBold,
        fontSize: FontSize.size_5xl,
        textAlign: "center",
        color: Color.colorBlack,
        lineHeight: 22,
        top: 10,
        left: 0,
        position: "absolute",
      },
    card: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.4,
        shadowRadius: 1,
        elevation: 3,
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

export default Leaderboard;
