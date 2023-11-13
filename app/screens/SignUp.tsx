import { createUserWithEmailAndPassword, sendEmailVerification, getAuth, sendSignInLinkToEmail } from "firebase/auth";
import { useState } from "react";
import { ActivityIndicator, Button, KeyboardAvoidingView, StyleSheet, TextInput, Text, View } from "react-native";
import { FIREBASE_AUTH } from "../../FirebaseConfig";
// import { FIREBASE_ADMIN_AUTH, ADMIN_PASSWORD } from "../../FirebaseAdminConfig";

const SignUp = () => {

    // email format 
    const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    const [email, setEmail] = useState('');
    const [isValidEmail, setIsValidEmail] = useState(true);
    const [password, setPassword] = useState('');
    const [adminPassword, setAdminPassword] = useState('');
    const [loading, setLoading] = useState(false);

    // authentication package from firebase
    const auth = FIREBASE_AUTH;

    // sign-in handler
    const signUp = async () => {
        // if (ADMIN_PASSWORD !== adminPassword) {
        //     alert("Admin password is incorrect");
        //     return;
        // }
        setLoading(true);
        try {
            const response = await createUserWithEmailAndPassword(auth, email, password);
            // await FIREBASE_ADMIN_AUTH.setCustomUserClaims(response.user.uid, {admin: true});
            // await sendEmailVerification(response.user);
            
            // sends email verification to user
            await sendEmailVerification(response.user);

            console.log(response);
        } catch (error) {
            console.log(error);
            alert("Sign up failed: ");
        } finally {
            setLoading(false);
        }
    }

    return (
        <View style={styles.container}>
            <KeyboardAvoidingView behavior="padding">
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    autoCapitalize="none"
                    onChangeText={(text) => { setEmail(text); setIsValidEmail(mailformat.test(email))}}
                />
                {/* {!isValidEmail ? (
                    <Text>This is not valid</Text>
                ) : (
                    <></>
                )}; */}
                <TextInput
                    style={styles.input}
                    secureTextEntry={true}
                    placeholder="Password"
                    autoCapitalize="none"
                    onChangeText={(text) => setPassword(text)}
                />
                {/* <TextInput
                    style={styles.input}
                    secureTextEntry={true}
                    placeholder="Admin Password"
                    autoCapitalize="none"
                    onChangeText={(text) => setAdminPassword(text)}
                /> */}

                {loading ? (
                    <ActivityIndicator size="large" color="#0000ff" />
                ) : (
                    <>
                        <Button title="SignUp" onPress={() => signUp()} />
                    </>
                )}
            </KeyboardAvoidingView>
        </View>
    );
};

export default SignUp;

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
