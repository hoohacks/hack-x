import { useState } from "react"
import {  StyleSheet, View, Button, TextInput, Text, ActivityIndicator, KeyboardAvoidingView, Pressable } from "react-native"
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
            style={styles.container}
        >
            <KeyboardAvoidingView behavior="padding">
                <Logo 
                    style={{
                        alignSelf: "center",
                        marginBottom: 56,
                    }} 
                    width={126} 
                    height={110} 
                />
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    placeholderTextColor="#fff"
                    autoCapitalize="none"
                    onChangeText={(text) => setEmail(text)}
                />
                <TextInput
                    style={styles.input}
                    secureTextEntry={true}
                    placeholder="Password"
                    placeholderTextColor="#fff"
                    autoCapitalize="none"
                    onChangeText={(text) => setPassword(text)}
                />
                <Text
                    style={{
                        textDecorationLine: "underline",
                        color: "#fff",
                        alignSelf: "flex-end",
                        fontSize: 12,
                    }}
                    onPress={() => navigation.navigate("SignUp")}
                >
                    Forgot Password?
                </Text>

                {loading ? (
                    <ActivityIndicator size="large" color="#0000ff" />
                ) : (
                    <>
                        <Pressable 
                            style={styles.button} 
                            onPress={() => signIn()}
                        >
                            <Text 
                            style={styles.button_text}
                            >Sign In</Text>
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
                                Don't have an account?
                                <Text>{' '}</Text>
                                <Text
                                    style={{textDecorationLine: "underline"}}
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

const styles = StyleSheet.create({
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
        width: 138,
        paddingVertical: 8,
        paddingHorizontal: 32,
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
        alignSelf: 'center',
    },
});

