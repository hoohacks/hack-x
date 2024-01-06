import { StyleSheet, Platform } from "react-native";

export const styles = StyleSheet.create({
    webContainer: {
        alignSelf: 'stretch',
        backgroundColor: '#fff',
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
    subHeader: {
        fontSize: 24,
        color: "#121A6A",
        alignSelf: "flex-start",
    },
    picker: {
        width: "100%",
        backgroundColor: "#fff",
        height: 52,
        marginVertical: 8,
    },
    input: {
        alignSelf: 'center',
        fontSize: 16,
        height: 52,
        borderWidth: 1,
        borderRadius: 4,
        backfaceVisibility: "hidden",
        padding: 10,
        marginVertical: 8,
        ...Platform.select({
            web: {
                width: '100%',
                color: '#121A6A',
                backgroundColor: '#fff',
                borderColor: 'grey',
            }, 
            default: { // mobile
                width: 316,
                color: '#fff',
                backgroundColor: 'rgba(255, 255, 255, 0.3)',
                borderColor: "#fff",
            },
        })
    },
    link: {
        color: '#121A6A',
        textDecorationLine: "underline",
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
    resume_button: {
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 4,
        width: "100%",
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
    required: {
        color: 'red',
    },
    containerCheckBox: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },
    checkbox: {
        color:'#121A6A', 
    }
});