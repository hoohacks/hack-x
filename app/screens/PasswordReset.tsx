import { sendPasswordResetEmail } from "firebase/auth";
import { useState } from "react";
import { ActivityIndicator, Button, KeyboardAvoidingView, StyleSheet, TextInput, View } from "react-native";
import { FIREBASE_AUTH } from "../../FirebaseConfig";
import {NavigationProp} from "@react-navigation/native";

interface RouterProps {
    navigation: NavigationProp<any, any>;
}

const PasswordReset = ({ navigation }: RouterProps) => {

    const mailFormat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

    const [email, setEmail] = useState('');
    const [isValidEmail, setIsValidEmail] = useState(false);
    const [loading, setLoading] = useState(false);

    const auth = FIREBASE_AUTH;

    const passwordReset = async () => {
        if (!isValidEmail) {
            alert("Please enter a valid email.");
        }
        else {
            setLoading(true);
            try {
                const response = await sendPasswordResetEmail(auth, email);
                console.log(response);
            } catch (error) {
                console.log(error);
                alert("Password reset failed.");
            } finally {
                setLoading(false);
                alert("Password reset email sent.");
                navigation.navigate('Login');
            }
        }
    }

    return (
        <View style={styles.container}>
            <KeyboardAvoidingView behavior="padding">
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    autoCapitalize="none"
                    onChangeText={(text) => { setEmail(text); setIsValidEmail(mailFormat.test(email))}}
                />

                {loading ? (
                    <ActivityIndicator size="large" color="#0000ff" />
                ) : (
                    <>
                        <Button title="Reset" onPress={() => passwordReset()} />
                        <Button title="Cancel" onPress={() => navigation.navigate('Login')} />
                    </>
                )}
            </KeyboardAvoidingView>
        </View>
    );
};

export default PasswordReset;

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
        flex: 1,
        justifyContent: 'center'
    },
    input: {
        marginVertical: 4,
        height: 50,
        borderWidth: 1,
        borderRadius: 4,
        padding: 10,
        backgroundColor: '#fff'
    }
});
