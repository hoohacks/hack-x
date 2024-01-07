import { StyleSheet, Platform } from "react-native";
import * as Font from 'expo-font';
import { useEffect } from "react";

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
    title: {
        fontSize: 30,
    }
});