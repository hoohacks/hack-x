// firebase
import { createUserWithEmailAndPassword, sendEmailVerification} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore"; 
import { ADMIN_PASSWORD, FIREBASE_AUTH, FIRESTORE_DB, SPONSOR_PASSWORD } from "../../../firebase/FirebaseConfig";

// react
import { useState } from "react";
import { ActivityIndicator, Button, KeyboardAvoidingView, TextInput, Text, View, Pressable, useWindowDimensions } from "react-native";
import { NavigationProp } from "@react-navigation/native";
import { styles } from "../../../assets/style/SignUpStyle";

// Logo 
import Logo from "../../../assets/svg/Logo.svg";

interface RouterProps {
    navigation: NavigationProp<any, any>;
}

const SignUp = ({ navigation }: RouterProps) => {

    const { width } = useWindowDimensions();

    // email & password format 
    const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const passwordformat = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,30}$/;

    const [email, setEmail] = useState('');
    const [isValidEmail, setIsValidEmail] = useState(true);
    const [password, setPassword] = useState('');
    const [passwordCheck, setPasswordCheck] = useState('');
    const [samePassword, setSamePassword] = useState(true);
    const [isValidPassword, setIsValidPassword] = useState(true);
    const [loading, setLoading] = useState(false);

    // authentication package from firebase
    const auth = FIREBASE_AUTH;

    // sign-in handler
    const signUp = async () => {
        setLoading(true);

        if (select === "admin" && adminPassword !== ADMIN_PASSWORD) {
            setLoading(false);
            return;
        }

        if (select === "sponsor" && sponsorPassword !== SPONSOR_PASSWORD) {
            setLoading(false);
            return;
        }

        try {
            // create fireauth user and send email verification 
            const { user } = await createUserWithEmailAndPassword(auth, email, password);

            console.log(select);
            console.log(FIRESTORE_DB);

            await setDoc(doc(FIRESTORE_DB, "users", user.uid), {
                first_name: "",
                last_name: "",
                email: user.email,
                type: select,
                school: "",
                age: 0,
            });
            
            // sends email verification to user
            await sendEmailVerification(user);

        } catch (error) {
            alert("Sign up failed: " + error);
        } finally {
            setLoading(false);
        }
    }

    // handle user type selection 
    const [select, setSelect] = useState("member");
    const [adminPassword, setAdminPassword] = useState('');
    const [sponsorPassword, setSponsorPassword] = useState('');


    return (
        <View
            style={[styles.container, { width }]}
        >
            <KeyboardAvoidingView behavior="padding">
                <Logo
                    style={styles.logo}
                    width={126}
                    height={110}
                />
                <View
                    style={{
                        width: 317,
                        flexDirection: "row",
                        alignSelf: "center",
                        overflow: "hidden",
                        gap: 8,
                        justifyContent: "center"
                    }}
                >
                    <Pressable
                        style={styles.button}
                        onPress={() => setSelect("member")}
                    >
                        <Text
                            style={{
                                color: "#fff"
                            }}
                        >
                            Member
                        </Text>
                    </Pressable>
                    <Pressable
                        style={styles.button}
                        onPress={() => setSelect("admin")}
                    >
                        <Text
                            style={{
                                color: "#fff"
                            }}
                        >
                            Admin
                        </Text>
                    </Pressable>
                    <Pressable
                        style={styles.button}
                        onPress={() => setSelect("sponsor")}
                    >
                        <Text
                            style={{
                                color: "#fff"
                            }}
                        >
                            Sponsor
                        </Text>
                    </Pressable>

                </View>
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
                    onEndEditing={() => setIsValidPassword(passwordformat.test(password))}
                />
                {!isValidPassword ? (
                    <Text
                        style={{
                            color: "red",
                            width: 316
                        }}
                    >Must be 7-30 characters long containing a number and special character.</Text>
                ) : (
                    <></>
                )}
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

                {select === "admin" && (
                    <>
                        <TextInput
                            style={styles.input}
                            secureTextEntry={true}
                            placeholder="Admin Password"
                            placeholderTextColor="#fff"
                            autoCapitalize="none"
                            onChangeText={(text) => setAdminPassword(text)}
                        />
                    </>
                )}

                {select === "sponsor" && (
                    <>
                        <TextInput
                            style={styles.input}
                            secureTextEntry={true}
                            placeholder="Sponsor Password"
                            placeholderTextColor="#fff"
                            autoCapitalize="none"
                            onChangeText={(text) => setSponsorPassword(text)}
                        />
                    </>
                )}

                {loading ? (
                    <ActivityIndicator size="large" color="#0000ff" />
                ) : (
                    <>
                        <Pressable
                            style={styles.button}
                            onPress={() => signUp()}
                            disabled={
                                !isValidEmail || !isValidPassword || !samePassword || passwordCheck === "" || password === "" || email === ""
                            }
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
