import React, {useEffect, useState} from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import homeIcon from '../assets/svg/home.web.svg';
import scheduleIcon from '../assets/svg/schedule.web.svg';
import leaderboardIcon from '../assets/svg/leaderboard.web.svg';
import profileIcon from '../assets/svg/profile.web.svg';
import owlIcon from '../assets/svg/hoohacks-owl-logo.svg'; // Replace with the actual path to your owl icon image
import { useNavigation } from '@react-navigation/native';
import * as Font from 'expo-font';

interface NavItemProps {
    icon: any; // Use the appropriate type for your icons
    label: string;
    onPress: () => void;
    iconWidth?: number; // Optional width for the icon
    iconHeight?: number; // Optional height for the icon
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, onPress, iconWidth, iconHeight }) => {

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

    return (
        <TouchableOpacity style={styles.navItem} onPress={handlePress}>
            <View style={{ width: iconContainerSize, height: iconContainerSize, justifyContent: 'center', alignItems: 'center' }}>
                <Image
                    source={icon}
                    style={[
                        styles.icon,
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
    }, []);

    if (!fontsLoaded) {
        // You may want to return a loading indicator instead of null
        return null;
    }

    return (
        <View style={styles.sidebarContainer}> {/* New container for sidebar with drop shadow */}
            <View style={styles.navBarContainer}>
                <Image source={owlIcon} style={styles.owlIcon} /> {/* This line adds the owl icon */}
                <NavItem icon={homeIcon} label="Home" onPress={() => navigation.navigate('Home')}  iconWidth={20} iconHeight={20}/>
                <NavItem icon={scheduleIcon} label="Schedule" onPress={() => navigation.navigate('Schedule')}  iconWidth={20} iconHeight={20} />
                <NavItem icon={leaderboardIcon} label="HooCoins" onPress={() => navigation.navigate('Leaderboard')} iconWidth={16} iconHeight={20} />
                <NavItem icon={profileIcon} label="Profile" onPress={() => navigation.navigate('Profile')}  iconWidth={20} iconHeight={20}/>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
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
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        alignItems: 'flex-start', // Aligns items to the start (left) instead of center
        justifyContent: 'center',
        paddingTop: 20,
        width: '100%', // Ensure the container takes full width
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
