import React, {useState} from 'react';
import { View, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

import homeIcon from '../assets/svg/home.svg';
import scheduleIcon from '../assets/svg/schedule.svg';
import leaderboardIcon from '../assets/svg/leaderboard.svg';
import profileIcon from '../assets/svg/profile.svg';
import QrCodeIcon from '../assets/svg/qr_code.svg';
import NavBarBackground from '../assets/svg/navbar.svg';
const { width } = Dimensions.get('window');
const qrButtonSize = 70; // Adjust as needed
import QRCode from '../app/screens/pages/QRCode';

const Navbar = ({ navigation }) => {
    const [activeTab, setActiveTab] = useState('Home'); // Default active tab

    const navigateToScreen = (screenName) => {
        setActiveTab(screenName); // Update active tab state
        navigation.navigate(screenName);
    };

    const Tab = ({ IconComponent, screenName }) => {
        const isActive = activeTab === screenName;
        const fillColor = isActive ? "#87A2FC" : "#FFFFFF"; // Active color or white
        return (
            <TouchableOpacity
                style={styles.tab}
                onPress={() => navigateToScreen(screenName)}
            >
                <IconComponent width={20} height={20} fill={fillColor} />
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            <NavBarBackground width={393} height={80} style={styles.svgBackground} />
            <View style={styles.navbar}>
                <Tab IconComponent={homeIcon} screenName="Home" />
                <Tab IconComponent={scheduleIcon} screenName="Schedule" />
                <Tab IconComponent={leaderboardIcon} screenName="Leaderboard" />
                <Tab IconComponent={profileIcon} screenName="Profile" />
            </View>
            <TouchableOpacity
                style={styles.qrButton}
                onPress={() => {navigation.navigate(QRCode)}} // Implement your QR code button action
            >
                <QrCodeIcon width={25} height={25} />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center', // Center children horizontally
        backgroundColor: 'transparent',
    },
    svgBackground: {
        position: 'absolute', // Position it behind all other content
        top: 0, // Align to the top of the container
        width: '100%', // Set the width to fill the container
    },
    navbar: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'flex-end', // Align items to the bottom
        paddingVertical: 40,
        paddingBottom: 35,
        height: 80, // Adjust as needed
    },
    qrButton: {
        position: 'absolute',
        top: '-3%', // Adjust this value to raise the QR code button
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
