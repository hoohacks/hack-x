import { createUserWithEmailAndPassword, sendEmailVerification, getAuth, sendSignInLinkToEmail } from "firebase/auth";
import { useState } from "react";
import { ActivityIndicator, Button, KeyboardAvoidingView, TextInput, Text, View, Pressable } from "react-native";
import { FIREBASE_AUTH } from "../../../firebase/FirebaseConfig";
import { NavigationProp } from "@react-navigation/native";

import { styles } from "../../../assets/style/SignUpStyle";

// Logo 
import Logo from "../../../assets/svg/Logo.svg";
// import { FIREBASE_ADMIN_AUTH, ADMIN_PASSWORD } from "../../FirebaseAdminConfig";

interface RouterProps {
    navigation: NavigationProp<any, any>;
}

const SignUp = ({ navigation }: RouterProps) => {

    // email format 
    const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    const [email, setEmail] = useState('');
    const [isValidEmail, setIsValidEmail] = useState(true);
    const [password, setPassword] = useState('');
    const [passwordCheck, setPasswordCheck] = useState('');
    const [samePassword, setSamePassword] = useState(true);
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
        <View
            style={styles.container}
        >
            <KeyboardAvoidingView behavior="padding">
                <Logo
                    style={styles.logo}
                    width={126}
                    height={110}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    placeholderTextColor="#fff"
                    autoCapitalize="none"
                    onChangeText={(text) => setEmail(text)}
                    onEndEditing={() => setIsValidEmail(mailformat.test(email))}
                />
                {!isValidEmail ? (
                    <Text
                        style={{
                            color: "red",
                        }}
                    >Invalid E-mail format</Text>
                ) : (
                    <></>
                )}
                <TextInput
                    style={styles.input}
                    secureTextEntry={true}
                    placeholder="Password"
                    placeholderTextColor="#fff"
                    autoCapitalize="none"
                    onChangeText={(text) => setPassword(text)}
                />
                <TextInput
                    style={styles.input}
                    secureTextEntry={true}
                    placeholder="Confirm Password"
                    placeholderTextColor="#fff"
                    autoCapitalize="none"
                    onChangeText={(text) => setPasswordCheck(text)}
                    onEndEditing={() => setSamePassword(password === passwordCheck)}
                />
                {!samePassword ? (
                    <Text
                        style={{
                            color: "red"
                        }}
                    >Passwords do not match</Text>
                ) : (
                    <></>
                )}

                {loading ? (
                    <ActivityIndicator size="large" color="#0000ff" />
                ) : (
                    <>
                        <Pressable
                            style={styles.button}
                            onPress={() => signUp()}
                        >
                            <Text
                                style={styles.button_text}
                            >Create Account</Text>
                        </Pressable>
                        <View
                            style={{
                                alignSelf: "center",
                                padding: 15,
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 12,
                                    color: "#fff",
                                }}
                            >
                                Already have an account?
                                <Text>{' '}</Text>
                                <Text
                                    style={styles.link_text}
                                    onPress={() => navigation.navigate("Login")}
                                >
                                    Sign in!
                                </Text>
                            </Text>
                        </View>
                    </>
                )}
            </KeyboardAvoidingView>
        </View>
    );
};

export default SignUp;
