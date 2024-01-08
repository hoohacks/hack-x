import React, {useEffect, useState} from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import HomeIcon from '../assets/svg/home.web.svg';
import ScheduleIcon from '../assets/svg/schedule.web.svg';
import LeaderBoardIcon from '../assets/svg/leaderboard.web.svg';
import ProfileIcon from '../assets/svg/profile.web.svg';
import OwlIcon from '../assets/svg/hoohacks-owl-logo.svg'; // Replace with the actual path to your owl icon image
import SignOut from '../assets/svg/logout.svg';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as Font from 'expo-font';
import Schedule from "../app/screens/pages/Schedule";
import QRCode from '../app/screens/pages/QRCode';
import QRCodeIcon from '../assets/svg/qr_code.svg'
import { getAuth, signOut } from 'firebase/auth';

interface NavItemProps {
    icon: any;
    label: string;
    onPress: () => void;
    iconWidth?: number;
    iconHeight?: number;
    isActive: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, onPress, iconWidth, iconHeight, isActive }) => {

    const navigation = useNavigation();

    const handlePress = () => {
        if (onPress) {
            onPress();
        } else {
            navigation.navigate(label);
        }
    };

    // Define a consistent icon container size
    const iconContainerSize = Math.max(iconWidth ?? 0, iconHeight ?? 0, 30); // Use 30 or your largest icon size as a fallback

    const iconColor = isActive ? '#87A2FC' : '#121A6A'; // Active screen color vs inactive
    return (
        <TouchableOpacity style={styles.navItem} onPress={handlePress}>
            <View style={{ width: iconContainerSize, height: iconContainerSize, justifyContent: 'center', alignItems: 'center' }}>
                <Image
                    source={icon}
                    style={[
                        styles.icon,
                        { tintColor: iconColor }, // Set the icon color based on active status
                        iconWidth && { width: iconWidth },
                        iconHeight && { height: iconHeight }
                    ]}
                />
            </View>
            <Text style={styles.label}>{label}</Text>
        </TouchableOpacity>
    );
};

const NavItemBottom: React.FC<NavItemProps> = ({ icon, label, onPress, iconWidth, iconHeight, isActive }) => {

    const navigation = useNavigation();

    const handlePress = () => {
        if (onPress) {
            onPress();
        } else {
            navigation.navigate(label);
        }
    };

    // Define a consistent icon container size
    const iconContainerSize = Math.max(iconWidth ?? 0, iconHeight ?? 0, 30); // Use 30 or your largest icon size as a fallback

    const iconColor = isActive ? '#87A2FC' : '#121A6A'; // Active screen color vs inactive
    return (
        <TouchableOpacity style={styles.navItemBottom} onPress={handlePress}>
            <View style={{ width: iconContainerSize, height: iconContainerSize, justifyContent: 'center', alignItems: 'center' }}>
                <Image
                    source={icon}
                    style={[
                        styles.icon,
                        { tintColor: iconColor }, // Set the icon color based on active status
                        iconWidth && { width: iconWidth },
                        iconHeight && { height: iconHeight }
                    ]}
                />
            </View>
            <Text style={styles.label}>{label}</Text>
        </TouchableOpacity>
    );
};

const NavBar: React.FC = () => {

    const navigation = useNavigation();
    const [fontsLoaded, setFontsLoaded] = useState(false);
    const [screenWidth, setScreenWidth] = useState(Dimensions.get('window').width);

    const auth = getAuth();

    useEffect(() => {
        const loadFonts = async () => {
            try {
                await Font.loadAsync({
                    'ChakraPetch-Bold': require('../assets/Chakra_Petch/ChakraPetch-Bold.ttf'),
                    'ChakraPetch-Light': require('../assets/Chakra_Petch/ChakraPetch-Light.ttf'),
                    'ChakraPetch-Regular': require('../assets/Chakra_Petch/ChakraPetch-Regular.ttf'),
                });

                setFontsLoaded(true);
            } catch (error) {
                console.error('Error loading fonts:', error);
            }
        };

        loadFonts();

        const onChange = () => {
            setScreenWidth(Dimensions.get('window').width);
        };

        const subscription = Dimensions.addEventListener('change', onChange);

        // Return a cleanup function that removes the event listener
        return () => {
            subscription.remove();
        };

    }, []);

    const logOut = async () => {
        await signOut(auth);
        navigation.navigate('auth');
    };

    if (!fontsLoaded) {
        // You may want to return a loading indicator instead of null
        return null;
    }

    const route = useRoute();
    if (screenWidth <= 768) {
        return (
            <View style={styles.bottomNavBarContainer}>
                        <NavItemBottom icon={HomeIcon} onPress={() => navigation.navigate('Home')}
                                 isActive={route.name === 'Home'} iconWidth={20} iconHeight={20}/>
                        <NavItemBottom icon={ScheduleIcon} onPress={() => navigation.navigate('Schedule')}
                                 isActive={route.name === 'Schedule'} iconWidth={20} iconHeight={20}/>
                        <NavItemBottom icon={LeaderBoardIcon}
                                 onPress={() => navigation.navigate('Leaderboard')}
                                 isActive={route.name === 'Leaderboard'} iconWidth={20} iconHeight={20}/>
                        <NavItemBottom icon={ProfileIcon}  onPress={() => navigation.navigate('Profile')}
                                 isActive={route.name === 'Profile'} iconWidth={20} iconHeight={20}/>
                        <NavItemBottom icon={QRCodeIcon} onPress={() => navigation.navigate('QRCode')}
                                 isActive={route.name === 'QRCode'} iconWidth={20} iconHeight={20}/>
                        <NavItemBottom icon={SignOut} onPress={() => logOut()} iconWidth={20}
                                 iconHeight={20}/>
            </View>
        );
    }
    else {
        return (
            <View style={{
                marginRight: 250,
            }}>
            <View style={styles.container}>
                <View style={styles.sidebarContainer}>
                    <View style={styles.navBarContainer}>
                        <Image source={OwlIcon} style={styles.owlIcon}/>
                        <NavItem icon={HomeIcon} label="Home" onPress={() => navigation.navigate('Home')}
                                 isActive={route.name === 'Home'} iconWidth={20} iconHeight={20}/>
                        <NavItem icon={ScheduleIcon} label="Schedule" onPress={() => navigation.navigate('Schedule')}
                                 isActive={route.name === 'Schedule'} iconWidth={20} iconHeight={20}/>
                        <NavItem icon={LeaderBoardIcon} label="Leaderboard"
                                 onPress={() => navigation.navigate('Leaderboard')}
                                 isActive={route.name === 'Leaderboard'} iconWidth={20} iconHeight={20}/>
                        <NavItem icon={ProfileIcon} label="Profile" onPress={() => navigation.navigate('Profile')}
                                 isActive={route.name === 'Profile'} iconWidth={20} iconHeight={20}/>
                        <NavItem icon={QRCodeIcon} label="QRcode" onPress={() => navigation.navigate('QRCode')}
                                 isActive={route.name === 'QRCode'} iconWidth={20} iconHeight={20}/>
                        <NavItem icon={SignOut} label="Sign Out" onPress={() => logOut()} iconWidth={20}
                                 iconHeight={20}/>
                    </View>
                </View>
            </View>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    bottomNavBarContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around', // Evenly space out items
        alignItems: 'center', // Align items vertically in the center
        width: '100%', // Full width
        position: 'absolute', // Position at the bottom
        bottom: 0,
        backgroundColor: '#FFF', // White background
        zIndex: 1000,
    },
    navItemBottom: {
        alignItems: 'center', // Center align items vertically and horizontally
        paddingVertical: 15, // Adjust vertical padding
        // paddingLeft removed or reduced, as justifyContent will handle spacing
        // width removed or adjusted as necessary
        // Add other styling as needed
    },
    container: {
        width: 250,
        backgroundColor: '#FFF',
        position: 'fixed',
        height: '100vh',
        overflowY: 'hidden',
        visible: false,
    },
    sidebarContainer: {
        flex: 1,
        paddingTop: 60, // Reduced top padding
        backgroundColor: '#FFF', // Matches the background color of the navBarContainer
        alignItems: 'center', // Center children horizontally
        justifyContent: 'flex-start', // Align children to the start vertically
        elevation: 5, // Elevation for Android
    },
    navBarContainer: {
        marginTop: 20, // Add top margin to move the navbar container down
        backgroundColor: '#FFF',
        alignItems: 'flex-start',
        width: '70%', // Set width to less than 100% to allow space for the shadow
        borderRadius: 10, // Optional: if you want rounded corners
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        paddingBottom: 20, // Add padding at the bottom of the navbar container
    },
    navItem: {
        flexDirection: 'row',
        alignItems: 'center', // This will keep icon and text aligned on the same line
        paddingVertical: 20, // Adjust spacing between items as needed
        paddingLeft: 25, // Adjust the left padding as needed for all items
        width: '100%', // Ensure the nav items take full width
    },
    icon: {
        resizeMode: 'contain', // Ensures the icon scales within the container without distortion
        marginRight: 17, // Increase the space between the icon and the text
    },
    label: {
        fontSize: 16,
        fontFamily: 'ChakraPetch-Regular', // Use the font you loaded
        fontWeight: '500'
    },
    owlIcon: {
        width: 44, // Adjust width as needed
        height: 40, // Adjust height as needed
        marginVertical: 20, // Add vertical margin for the owl icon
        alignSelf: 'center',
    },
});


export default NavBar;
