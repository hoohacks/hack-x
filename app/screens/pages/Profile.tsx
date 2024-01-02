import React, {useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, Image, TouchableOpacity } from 'react-native';
import pfp from '../../../assets/Profile.png'; // Importing the profile picture
import arrow from '../../../assets/arrow_back_ios_new.png'; // Importing the back arrow

import ProfileEditPage from './ProfileEditPage'; // Update the path accordingly


import { useNavigation } from '@react-navigation/native';
import { getAuth, signOut } from 'firebase/auth';

import * as Font from 'expo-font';


type Props = {};


const ProfilePage: React.FC<Props> = () => {
    const auth = getAuth();
    const navigation = useNavigation();
    
    const [fontsLoaded, setFontsLoaded] = useState(false);

   const userData = {
       name: "Varizzy Rizzy",
       email: "vrizz@gmail.com",
       hoocoins: "12",
       foodWave: "A",
   };


   const handleEditProfilePress = () => {
       console.log('Edit Profile Pressed');
       // go to EditProfile.tsx
       navigation.navigate('ProfileEditPage');
   };

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
       <View style={styles.container}>
           
           <View style={styles.header}>
               <Image
                   source={pfp}
                   style={styles.profileImage}
               />
               <View style={styles.userInfo}>
                   <View style={{flexDirection: 'row'}}><Text style={styles.title}>Name: </Text><Text style={styles.name}>{userData.name}</Text></View>
                   <View style={{flexDirection: 'row'}}><Text style={styles.title}>Email: </Text><Text style={styles.email}>{userData.email}</Text></View>
                   <View style={{flexDirection: 'row'}}><Text style={styles.title}>Hoocoins: </Text><Text style={styles.hoocoins}>{userData.hoocoins}</Text></View>
                   <View style={{flexDirection: 'row'}}><Text style={styles.title}>Food Wave: </Text><Text style={styles.foodWave}>{userData.foodWave}</Text></View>
               </View>
           </View>
           <TouchableOpacity style={styles.editButton} onPress={handleEditProfilePress}>
               <Text style={styles.editButtonText}>EDIT ACCOUNT</Text>
           </TouchableOpacity>

           <Button 
        title="SignOut"
        onPress={
          () => signOut(auth)
        }
      />
       </View>
   );
};


const styles = StyleSheet.create({
   container: {
       flex: 1,
       backgroundColor: '#FFFFFF',
       paddingTop: 50,
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
   title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#121A6A',
    fontFamily: 'ChakraPetch-Regular',
   },
   header: {
       width: '90%',
       backgroundColor: '#E5EEFF',
       borderRadius: 5,
       alignItems: 'center',
       justifyContent: 'center',
       paddingVertical: 20,
       flexDirection: 'row',
       alignSelf: 'center',
       shadowColor: '#000',
       shadowOffset: { width: 1, height: 2 },
       shadowOpacity: .6,
       shadowRadius: 2.5,
       elevation: 3,
   },
   profileImage: {
       width: 100,
       height: 100,
       borderRadius: 50,
       marginHorizontal: 20,
   },
   userInfo: {
       flex: 1,
   },
   name: {
       fontSize: 16,
       fontWeight: 'bold',
       color: '#121A6A',
       fontFamily: 'ChakraPetch-Bold',
   },
   email: {
       fontSize: 16,
       color: '#121A6A',
       fontFamily: 'ChakraPetch-Bold',
   },
   hoocoins: {
       fontSize: 16,
       color: '#121A6A',
       fontFamily: 'ChakraPetch-Bold',
   },
   foodWave: {
       fontSize: 16,
       color: '#121A6A',
       fontFamily: 'ChakraPetch-Bold',
   },
   editButton: {
       width: '90%',
       alignSelf: 'center',
       backgroundColor: '#FFFFFF',
       borderRadius: 5,
       paddingVertical: 10,
       paddingHorizontal: 20,
       marginTop: 20,
       shadowColor: '#000',
       shadowOffset: { width: 1, height: 3 },
       shadowOpacity: 0.6,
       shadowRadius: 2.5,
       elevation: 3,
   },
   editButtonText: {
       textAlign: 'center',
       color: '#121A6A',
       fontSize: 16,
       fontWeight: 'bold',
       fontFamily: 'ChakraPetch-Bold',

   },
});


export default ProfilePage;