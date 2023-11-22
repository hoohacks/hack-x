import { useState } from "react"
import { View, Button, TextInput, Text, ActivityIndicator, KeyboardAvoidingView, Pressable } from "react-native"
import { FIREBASE_AUTH } from "../../../firebase/FirebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { NavigationProp } from "@react-navigation/native";

// Logo 
import Logo from "../../../assets/svg/Logo.svg";

interface RouterProps {
    navigation: NavigationProp<any, any>;
}

const Login = ({ navigation }: RouterProps) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    // authentication package from firebase
    const auth = FIREBASE_AUTH;

    // sign-in handler
    const signIn = async () => {
        setLoading(true);
        try {
            const response = await signInWithEmailAndPassword(auth, email, password);
            console.log(response);
        } catch (error) {
            console.log(error);
            //   alert("Sign in failed: " + error.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <View 
            // style={styles.container}
        >
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
                    onChangeText={(text) => setEmail(text)}
                />
                <TextInput
                    // style={styles.input}
                    secureTextEntry={true}
                    placeholder="Password"
                    autoCapitalize="none"
                    onChangeText={(text) => setPassword(text)}
                />

                {loading ? (
                    <ActivityIndicator size="large" color="#0000ff" />
                ) : (
                    <>
                        <Pressable 
                            // style={styles.button} 
                            onPress={() => signIn()}
                        >
                            <Text 
                            // style={styles.button_text}
                            >Log In</Text>
                        </Pressable>
                        <View style={{ alignSelf: "center" }}>
                            <Text 
                            // style={styles.button_text}
                            >
                                Don't have an account?
                                <Text
                                    // style={styles.link_text}
                                    onPress={() => navigation.navigate("SignUp")}
                                >
                                    Create one now!
                                </Text>
                            </Text>
                        </View>
                    </>
                )}
            </KeyboardAvoidingView>

        </View>
    )
}

export default Login;

// const styles = StyleSheet.create({
//     container: {
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: 'black',
//         flex: 1,
//     },
//     input: {
//         alignSelf: 'center',
//         marginVertical: 8,
//         height: 56,
//         width: 316,
//         borderWidth: 1,
//         borderRadius: 4,
//         padding: 10,
//         backgroundColor: '#fff'
//     },
//     button: {
//         alignSelf: 'center',
//         alignItems: 'center',
//         justifyContent: 'center',
//         width: 138,
//         paddingVertical: 12,
//         paddingHorizontal: 32,
//         marginVertical: 8,
//         borderRadius: 28,
//         borderColor: 'white',
//         borderWidth: 4,
//         elevation: 3,
//         backgroundColor: 'black',
//     },
//     button_text: {
//         color: 'white',
//     },
//     link_text: {
//         color: 'white',
//         textDecorationLine: 'underline',
//     },
//     logo: {
//         alignSelf: 'center',
//     },
// });

