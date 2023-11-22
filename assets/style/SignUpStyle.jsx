import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
    container: {
        backgroundColor: '#121A6A',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    input: {
        alignSelf: 'center',
        color: '#fff',
        fontSize: 16,
        marginVertical: 8,
        height: 56,
        width: 316,
        borderWidth: 1,
        borderRadius: 4,
        borderColor: "#fff",
        backfaceVisibility: "hidden",
        padding: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
    },
    button: {
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        width: 207,
        paddingVertical: 8,
        paddingHorizontal: 16,
        marginTop: 76,
        borderRadius: 28,
        borderColor: 'white',
        borderWidth: 4,
        elevation: 3,
    },
    button_text: {
        color: 'white',
        fontSize: 20,
    },
    link_text: {
        color: 'white',
        textDecorationLine: 'underline',
    },
    logo: {
        alignSelf: "center",
        marginBottom: 56,
    },
});