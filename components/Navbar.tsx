import React from 'react';
import { View, TouchableOpacity, StyleSheet, Image, Dimensions } from 'react-native';

// Import your icons
import homeIcon from '../assets/home-icon.png';
import scheduleIcon from '../assets/schedule-icon.png';
import leaderboardIcon from '../assets/leaderboard-icon.png';
import profileIcon from '../assets/profile-icon.png';
import qrCodeIcon from '../assets/qr-code-icon.png'; // Make sure you have a QR code icon asset

const { width } = Dimensions.get('window');
const qrButtonSize = 50; // Adjust as needed
const divotSize = 65; // The size of the circular divot, adjust as needed

const Navbar = ({ navigation }) => {

    const navigateToScreen = (screenName) => {
        navigation.navigate(screenName);
    };

    const Tab = ({ name, screenName }) => {
        return (
            <TouchableOpacity
                style={styles.tab}
                onPress={() => navigateToScreen(screenName)}
            >
                <Image
                    source={getIconSource(name)}
                    style={styles.icon}
                />
            </TouchableOpacity>
        );
    };

    const getIconSource = (name) => {
        switch (name) {
            case 'home':
                return homeIcon;
            case 'schedule':
                return scheduleIcon;
            case 'leaderboard':
                return leaderboardIcon;
            case 'profile':
                return profileIcon;
            default:
                return homeIcon;
        };
    };

    return (
        <View style={styles.container}>
            <View style={styles.divot} />
            <View style={styles.navbar}>
                <Tab name="home" screenName="Home" />
                <Tab name="schedule" screenName="Schedule" />
                <View style={{ width: qrButtonSize }} />
                <Tab name="leaderboard" screenName="Leaderboard" />
                <Tab name="profile" screenName="Profile" />
            </View>
            <TouchableOpacity
                style={styles.qrButton}
                onPress={() => {}} // Implement your QR code button action
            >
                <Image
                    source={qrCodeIcon}
                    style={styles.qrIcon}
                />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingTop: divotSize / 2, // Push content down so divot is half inside the container
        backgroundColor: '#121A6A',
        alignItems: 'center', // Center children horizontally
    },
    navbar: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingVertical: 10,
        paddingBottom: 50, // Adjusted to create space for divot
        height: divotSize / 2, // Adjust height to come up to center of QR button
    },
    divot: {
        position: 'absolute',
        top: '50%', // Centered vertically in navbar
        left: width / 2 - divotSize / 2, // Centered horizontally in navbar
        width: divotSize,
        height: divotSize,
        borderRadius: divotSize / 2,
        backgroundColor: '#FFFFFF', // Same as navbar to appear as a cut-out
        transform: [{ translateY: -divotSize / 2 }], // Adjust to align with navbar
    },
    qrButton: {
        position: 'absolute',
        top: '50%',
        left: width / 2 - qrButtonSize / 2,
        width: qrButtonSize,
        height: qrButtonSize,
        borderRadius: qrButtonSize / 2,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 3,
        shadowOffset: { width: 0, height: 2 },
        transform: [{ translateY: -qrButtonSize / 2 }], // Adjust to align properly
        borderWidth: 1, // Adjust as needed for border thickness
        borderColor: '#121A6A', // Border color set to #121A6A
    },
    tab: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    icon: {
        width: 20,
        height: 22,
        tintColor: '#FFFFFF',
    },
    qrButtonPlaceholder: {
        width: qrButtonSize,
        height: qrButtonSize,
    },
    qrIcon: {
        width: 25,
        height: 25,
    }
});

export default Navbar;
