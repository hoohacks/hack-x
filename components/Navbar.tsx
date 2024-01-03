import React from 'react';
import { View, TouchableOpacity, StyleSheet, Image, Dimensions } from 'react-native';
import { SvgXml } from 'react-native-svg';

// Import your icons
import homeIcon from '../assets/svg/home.svg';
import scheduleIcon from '../assets/svg/schedule.svg';
import leaderboardIcon from '../assets/svg/leaderboard.svg';
import profileIcon from '../assets/svg/profile.svg';
import QrCodeIcon from '../assets/svg/qr_code.svg';

const { width } = Dimensions.get('window');
const qrButtonSize = 60; // Adjust as needed
const divotSize = 70; // The size of the circular divot, adjust as needed

const Navbar = ({ navigation }) => {
    const navigateToScreen = (screenName) => {
        navigation.navigate(screenName);
    };

    const Tab = ({ IconComponent, screenName }) => {
        return (
            <TouchableOpacity
                style={styles.tab}
                onPress={() => navigateToScreen(screenName)}
            >
                <IconComponent width={20} height={20} />
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.divot} />
            <View style={styles.navbar}>
                <Tab IconComponent={homeIcon} screenName="Home" />
                <Tab IconComponent={scheduleIcon} screenName="Schedule" />
                <View style={{ width: qrButtonSize }} />
                <Tab IconComponent={leaderboardIcon} screenName="Leaderboard" />
                <Tab IconComponent={profileIcon} screenName="Profile" />
            </View>
            <TouchableOpacity
                style={styles.qrButton}
                onPress={() => {}} // Implement your QR code button action
            >
                <QrCodeIcon width={25} height={25} />
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
        paddingBottom: 45, // Adjusted to create space for divot
        height: divotSize / 2, // Adjust height to come up to center of QR button
    },
    divot: {
        position: 'absolute',
        top: '10%', // Adjust this value as needed to reduce the depth of the divot
        left: width / 2 - divotSize / 2,
        width: divotSize,
        height: divotSize,
        borderRadius: divotSize / 2,
        backgroundColor: '#FFFFFF',
        transform: [{ translateY: -divotSize / 2 }],
    },
    qrButton: {
        position: 'absolute',
        top: '5%', // Adjust this value to raise the QR code button
        left: width / 2 - qrButtonSize / 2,
        width: qrButtonSize,
        height: qrButtonSize,
        borderRadius: qrButtonSize / 2,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 3,
        shadowOffset: { width: 0, height: 2 },
        transform: [{ translateY: -qrButtonSize / 2 }],
        borderWidth: 1,
        borderColor: '#121A6A',
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
