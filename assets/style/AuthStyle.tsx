import { StyleSheet, Platform } from "react-native";

export const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        gap: 8,
        ...Platform.select({
            web: {
                backgroundColor: '#fff'
            }, 
            default: { // mobile
                backgroundColor: '#121A6A'
            },
        })
    },
    userContainer: {
        width: 317,
        flexDirection: "row",
        alignSelf: "center",
        overflow: "hidden",
        gap: 8,
        justifyContent: "center"
    },
    input: {
        alignSelf: 'center',
        fontSize: 16,
        height: 52,
        width: 316,
        borderWidth: 1,
        borderRadius: 4,
        backfaceVisibility: "hidden",
        padding: 10,
        marginVertical: 8,
        ...Platform.select({
            web: {
                color: '#121A6A',
                backgroundColor: '#fff',
                borderColor: 'grey',
            }, 
            default: { // mobile
                color: '#fff',
                backgroundColor: 'rgba(255, 255, 255, 0.3)',
                borderColor: "#fff",
            },
        })
    },
    button: {
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 28,
        marginVertical: 16,
        elevation: 3,
        ...Platform.select({
            web: {
                backgroundColor: '#121A6A',
            },
            default: {
                borderColor: '#fff',
                borderWidth: 4,
            }
        })
    },
    button_text: {
        color: 'white',
        fontSize: 20,
    },
    link: {
        textDecorationLine: 'underline',
        fontSize: 12,
        ...Platform.select({
            web: {
                color: '#808080',
            },
            default: {
                color: '#fff',
            }
        })
    },
    logo: {
        alignSelf: "center",
    },
});