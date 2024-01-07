import { View, Text, Button, Pressable } from "react-native"
import { getAuth, signOut } from "firebase/auth";
import { NavigationProp } from "@react-navigation/native";
import { useEffect } from "react";

// static
import { StyleSheet, Platform } from "react-native";
import * as Font from 'expo-font';

// svg
import Svg, { Path } from "react-native-svg";

interface RouterProps {
    navigation: NavigationProp<any, any>;
}

const Completion = ({ navigation }: RouterProps) => {

    const auth = getAuth();

    useEffect(() => {
        const loadFonts = async () => {
            try {
                await Font.loadAsync({
                    'ChakraPetch-Bold': require('../../../../assets/Chakra_Petch/ChakraPetch-Bold.ttf'),
                    'ChakraPetch-Light': require('../../../../assets/Chakra_Petch/ChakraPetch-Light.ttf'),
                    'ChakraPetch-Regular': require('../../../../assets/Chakra_Petch/ChakraPetch-Regular.ttf'),
                });
            } catch (error) {
                console.error('Error loading fonts:', error);
            }
        };
    
        loadFonts();
    }, []);

    return (
        <View style={styles.webContainer}>

            <Svg
                width={165}
                height={165}
            >
                <Path d="M75.2813 123.75L114.125 84.9062L104.156 74.9375L75.1094 103.984L60.6719 89.5469L50.875 99.3438L75.2813 123.75ZM41.25 151.25C37.4688 151.25 34.2318 149.904 31.5391 147.211C28.8464 144.518 27.5 141.281 27.5 137.5V27.5C27.5 23.7188 28.8464 20.4818 31.5391 17.7891C34.2318 15.0964 37.4688 13.75 41.25 13.75H96.25L137.5 55V137.5C137.5 141.281 136.154 144.518 133.461 147.211C130.768 149.904 127.531 151.25 123.75 151.25H41.25ZM89.375 61.875V27.5H41.25V137.5H123.75V61.875H89.375Z" fill="#44B74A"/>
            </Svg>
            <Text style={styles.title}>Application Submitted</Text>
            <Text style={styles.subTitle}>Your application is currently under review.</Text>

            <Text style={styles.text}>You are still able to make changes to the</Text>
            <Text style={styles.text}>information you provided.</Text>

            <Pressable
                onPress={
                    () => navigation.goBack()
                }
                style={styles.button}
            >
                <Text style={{color: "#fff"}}>UPDATE REGISTRATION</Text>
            </Pressable>
        </View>
    );
};

export default Completion;

export const styles = StyleSheet.create({
    webContainer: {
        alignSelf: 'stretch',
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        flex: 1,
        gap: 8,
        height: "100%",
        ...Platform.select({
            web: {
                width: "60%",
            },
            default: {
                width: 316,
            }
        })
    },
    changes: {
        width: 316,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 30,
        fontFamily: 'ChakraPetch-Bold',
    },
    subTitle: {
        fontSize: 16,
        fontFamily: 'ChakraPetch-Bold',
    },
    text: {
        alignSelf: 'center',
        fontSize: 16,
        fontFamily: 'ChakraPetch-Regular',
    },
    button: {
            alignSelf: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            width: 316,
            paddingVertical: 8,
            paddingHorizontal: 22,
            borderRadius: 3,
            marginVertical: 16,
            elevation: 3,
            ...Platform.select({
                web: {
                    backgroundColor: '#2196F3',
                },
                default: {
                    borderColor: '#fff',
                    borderWidth: 4,
                }
            })
    },
});

