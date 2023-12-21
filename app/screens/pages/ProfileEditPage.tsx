import React, {useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput } from 'react-native';
import pfp from '../../../assets/Profile.png'; // Importing the profile picture
import arrow from '../../../assets/arrow_back_ios_new.png'; // Importing the back arrow

import * as Font from 'expo-font';


type Props = {};


const ProfileEditPage: React.FC<Props> = () => {

    const [firstName, onChangeName] = React.useState("");
    const [lastName, onChangeLastName] = React.useState("");
    const [school, onChangeSchool] = React.useState("");

    // font stuff

    const [fontsLoaded, setFontsLoaded] = useState(false);

    useEffect(() => {
        const loadFonts = async () => {
        try {
            await Font.loadAsync({
            'ChakraPetch-Bold': require('../../assets/Chakra_Petch/ChakraPetch-Bold.ttf'),
            'ChakraPetch-Light': require('../../assets/Chakra_Petch/ChakraPetch-Light.ttf'),
            'ChakraPetch-Regular': require('../../assets/Chakra_Petch/ChakraPetch-Regular.ttf'),
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
       <View style={styles.container}>
            <Image source={pfp} style={styles.profileImage}/>
            <TextInput
                style={styles.input}
                onChangeText={onChangeName}
                placeholder="First Name"
                value={firstName}
            />
            <TextInput
                style={styles.input}
                onChangeText={onChangeLastName}
                placeholder="Last Name"
                value={lastName}
            />
            <TextInput
                style={styles.input}
                onChangeText={onChangeSchool}
                placeholder="School"
                value={school}
            />
       </View>
   );
};


const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor:' #FFFFFF',
        paddingTop: 50,
        flex: 1,
    },
    profileImage:{
        width: 200,
        height: 200,
    },
    input: {
        height: 60,
        width: 330,
        margin: 12,
        borderWidth:1,
        padding: 10,
        borderColor: 'slategray',
        borderRadius: 5,
    },
    backButton: {
        position: 'absolute',
        top: 10,
        left: 10,
        zIndex: 1,
    },
    backArrow: {
        width: 25,
        height: 25,
    },
});


export default ProfileEditPage;



/*            <TouchableOpacity style={styles.backButton}>
               <Image
                   source={arrow}
                   style={styles.backArrow}
               />
           </TouchableOpacity>*/