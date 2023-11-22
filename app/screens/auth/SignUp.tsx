import { withExpoSnack } from "nativewind/dist/expo-snack";
import { createUserWithEmailAndPassword, sendEmailVerification, getAuth, sendSignInLinkToEmail } from "firebase/auth";
import { useState } from "react";
import { ActivityIndicator, Button, KeyboardAvoidingView, TextInput, Text, View, Pressable } from "react-native";
import { FIREBASE_AUTH } from "../../../firebase/FirebaseConfig";
import { NavigationProp } from "@react-navigation/native";

// import { styles } from "../../../assets/style/SignUpStyle";

// Logo 
import Logo from "../../../assets/svg/Logo.svg";
import { styled } from "nativewind";
// import { FIREBASE_ADMIN_AUTH, ADMIN_PASSWORD } from "../../FirebaseAdminConfig";

interface RouterProps {
    navigation: NavigationProp<any, any>;
}

const SignUp = ({ navigation }: RouterProps) => {

    // StyleSheet
    // const StyledView = styled(View)

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
        <View
            // style={styles.container}
            
            className="relative w-full max-w-lg flex 
            items-center justify-center"   
            style={{backgroundColor:"black"}} 
        >
            <View
                className="bg-pink-300 min-h-screen flex
                items-center justify-center"
            >

            </View>
            <KeyboardAvoidingView behavior="padding">
                <Logo 
                    // style={styles.logo} 
                    width={126} 
                    height={110} 
                />
                <TextInput
                    // style={styles.input}
                    placeholder="Email"
                    autoCapitalize="none"
                    onChangeText={(text) => { setEmail(text); setIsValidEmail(mailformat.test(email)) }}
                />
                {/* {!isValidEmail ? (
                    <Text>This is not valid</Text>
                ) : (
                    <></>
                )}; */}
                <TextInput
                    // style={styles.input}
                    secureTextEntry={true}
                    placeholder="Password"
                    autoCapitalize="none"
                    onChangeText={(text) => setPassword(text)}
                />
                <TextInput
                    // style={styles.input}
                    secureTextEntry={true}
                    placeholder="Confirm Password"
                    autoCapitalize="none"
                    onChangeText={(text) => setAdminPassword(text)}
                />

                {loading ? (
                    <ActivityIndicator size="large" color="#0000ff" />
                ) : (
                    <>
                        <Pressable
                            // style={styles.button} 
                            onPress={() => signUp()}
                        >
                            <Text 
                            // style={styles.button_text}
                            >Sign Up</Text>
                        </Pressable>
                        <View style={{ alignSelf: "center" }}>
                            <Text 
                            // style={styles.button_text}
                            >
                                Don't have an account?
                                <Text
                                    // style={styles.link_text}
                                    onPress={() => navigation.navigate("Login")}
                                >
                                    Create one now!
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
