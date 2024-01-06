// firebase
import { createUserWithEmailAndPassword, sendEmailVerification} from "firebase/auth";
import { Timestamp, doc, setDoc } from "firebase/firestore"; 
import { ADMIN_PASSWORD, FIREBASE_AUTH, FIRESTORE_DB, SPONSOR_PASSWORD } from "../../../firebase/FirebaseConfig";

// react
import { useState } from "react";
import { ActivityIndicator, Button, KeyboardAvoidingView, TextInput, Text, View, Pressable, useWindowDimensions, Platform } from "react-native";
import { NavigationProp } from "@react-navigation/native";
import { styles } from "../../../assets/style/AuthStyle";

// Logo 
import Svg, { Path } from "react-native-svg"

interface RouterProps {
    navigation: NavigationProp<any, any>;
}

const SignUp = ({ navigation }: RouterProps) => {

    const { width } = useWindowDimensions();

    // email & password format 
    const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const passwordformat = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,30}$/;

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
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

            await setDoc(doc(FIRESTORE_DB, "users", user.uid), {
                firstName: firstName,
                lastName: lastName,
                email: user.email,
                type: select,
                createdAt: Timestamp.now(),
                updatedAt: Timestamp.now(),
                applicationComplete: false,
                applicationAccepted: false,
                confirmationComplete: false,
                confirmationAccepted: false,
                checkedIn: false,
                breakfastGroup: "",
                hoocoins: 0,
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
                <Svg
                    width={126}
                    height={110}
                    style={styles.logo}
                >
                    <Path d="M23.0667 55.5846C22.973 56.0453 22.9706 56.5201 23.0598 56.9817C23.1489 57.4433 23.3278 57.8828 23.5863 58.2751C24.1082 59.0673 24.9224 59.619 25.8498 59.8089C26.7772 59.9988 27.7418 59.8113 28.5314 59.2876C29.321 58.764 29.871 57.947 30.0602 57.0166C30.1969 56.2972 30.5973 55.6553 31.1823 55.2174C31.7674 54.7796 32.4948 54.5775 33.221 54.651C33.9472 54.7245 34.6197 55.0683 35.1058 55.6146C35.5918 56.1609 35.8563 56.8701 35.8471 57.6024C35.8471 58.5518 36.223 59.4624 36.8921 60.1337C37.5613 60.8051 38.4689 61.1823 39.4152 61.1823C40.3615 61.1823 41.2691 60.8051 41.9382 60.1337C42.6074 59.4624 42.9833 58.5518 42.9833 57.6024C42.9939 55.0948 42.0734 52.6731 40.4011 50.8094C38.7289 48.9457 36.4248 47.7737 33.938 47.5218C31.4513 47.2698 28.9602 47.9561 26.9503 49.4467C24.9405 50.9373 23.556 53.1255 23.0667 55.5846Z" fill="rgba(255, 255, 255, 0.3)" />
                    <Path d="M86.6054 61.1822C87.5518 61.1822 88.4593 60.805 89.1285 60.1337C89.7976 59.4623 90.1736 58.5517 90.1736 57.6023C90.1803 56.8813 90.4519 56.1881 90.9364 55.6555C91.4208 55.1229 92.0841 54.7883 92.7991 54.7158C93.5141 54.6433 94.2307 54.8379 94.8116 55.2624C95.3925 55.6869 95.7969 56.3115 95.9474 57.0165C96.1367 57.9469 96.6866 58.7639 97.4762 59.2875C97.8672 59.5468 98.3052 59.7263 98.7653 59.8157C99.2254 59.9052 99.6986 59.9028 100.158 59.8088C100.617 59.7148 101.053 59.5309 101.442 59.2678C101.83 59.0046 102.163 58.6672 102.421 58.275C102.68 57.8827 102.859 57.4432 102.948 56.9816C103.037 56.52 103.035 56.0453 102.941 55.5845C102.425 53.1532 101.033 50.9984 99.0312 49.5335C97.0294 48.0687 94.5591 47.3968 92.094 47.6469C89.6289 47.897 87.3426 49.0513 85.6736 50.8886C84.0047 52.7258 83.0705 55.1165 83.0503 57.6023C83.0503 58.5495 83.4244 59.4581 84.0908 60.1291C84.7571 60.8 85.6614 61.1787 86.6054 61.1822Z" fill="rgba(255, 255, 255, 0.3)"/>
                    <Path d="M125.348 2.17294C124.95 1.61295 124.399 1.18007 123.762 0.92611C123.124 0.672151 122.427 0.60788 121.754 0.74099L97.3225 5.57058C94.2253 6.16957 91.0223 5.8762 88.0843 4.72442C72.0026 -1.57481 54.1476 -1.57481 38.0658 4.72442C35.1277 5.8755 31.9249 6.16885 28.8276 5.57058L4.26599 0.74099C3.59497 0.605556 2.89918 0.668813 2.26335 0.923057C1.62753 1.1773 1.07911 1.61156 0.684898 2.17294C0.278041 2.73424 0.0419243 3.40174 0.00508345 4.09478C-0.0317574 4.78783 0.132255 5.47674 0.477298 6.07827C2.4505 9.56589 4.23077 13.1599 5.81001 16.844C7.65246 21.0096 9.09268 24.3031 12.0121 26.7374C9.42544 32.8855 8.16945 39.5145 8.32716 46.186C8.34201 47.7793 8.24228 49.3716 8.02874 50.9505C7.40836 54.1164 7.06968 57.3314 7.01669 60.5576C7.07655 64.2271 7.55101 67.8781 8.43096 71.4404C9.38695 75.7857 10.0802 80.1851 10.507 84.6144C10.5683 85.2419 10.7938 85.8421 11.1607 86.3542C11.5275 86.8662 12.0226 87.2719 12.5959 87.5303C18.9187 94.5957 26.6522 100.247 35.2942 104.118C43.9361 107.989 53.2931 109.993 62.7572 109.999H63.0037H63.2632C72.7273 109.993 82.0843 107.989 90.7262 104.118C99.3682 100.247 107.102 94.5957 113.424 87.5303C113.992 87.2673 114.481 86.8597 114.843 86.3481C115.205 85.8366 115.427 85.2388 115.487 84.6144C115.925 80.1986 116.623 75.8127 117.576 71.4795C119.337 64.7617 119.475 57.7194 117.979 50.9374C117.765 49.3585 117.665 47.7662 117.68 46.1729C117.838 39.5015 116.582 32.8725 113.995 26.7244C116.889 24.2901 118.342 20.9966 120.197 16.7919C121.777 13.1078 123.557 9.51382 125.53 6.0262C125.867 5.43258 126.028 4.7553 125.996 4.07315C125.964 3.391 125.739 2.73204 125.348 2.17294ZM41.2447 38.7528H41.3744L41.4912 38.8179C45.0204 40.2759 50.1715 45.8996 54.7257 50.8724C55.7766 52.0179 56.7887 53.1244 57.7878 54.1919C54.1288 58.0972 53.1427 59.7505 52.7016 60.87C52.1718 62.2767 51.9634 63.7847 52.0918 65.283C50.426 68.6522 47.879 71.5039 44.7229 73.5331C41.5667 75.5624 37.9203 76.6929 34.1733 76.8037H34.0825C24.7405 76.8037 16.4235 69.8132 14.1529 60.115C14.2308 57.6375 14.4997 55.1697 14.9574 52.7339C14.9574 52.6167 18.0584 41.5516 27.5431 38.2712C32.0026 36.6614 36.9084 36.8339 41.2447 38.7528ZM84.5292 38.87L84.646 38.8049H84.7757C89.0961 36.8716 93.9913 36.6759 98.4514 38.2582C107.936 41.5386 110.998 52.5777 111.037 52.7209C111.753 56.2086 111.984 59.779 111.725 63.3303C111.371 63.6395 111.088 64.0213 110.894 64.4499C109.307 68.0312 106.744 71.0903 103.501 73.2757C100.258 75.461 96.4656 76.6839 92.5607 76.8037H92.4699C88.5136 76.7091 84.6675 75.4777 81.3879 73.2557C78.1083 71.0336 75.533 67.9142 73.9676 64.2676C73.9503 63.1185 73.7307 61.9815 73.3188 60.909C72.9575 60.0421 72.4818 59.2277 71.9045 58.4877C70.7683 57.0229 69.5556 55.6193 68.2716 54.283C69.2706 53.2156 70.2827 52.109 71.3337 50.9635C75.8489 45.9647 81 40.354 84.5292 38.87ZM59.2799 65.4262C59.12 64.8072 59.12 64.1576 59.2799 63.5386C60.3085 61.9182 61.538 60.4354 62.9388 59.1256C64.2363 60.5185 65.0927 61.4818 65.6376 62.1587C65.9186 63.2747 66.2608 64.3742 66.6627 65.4522C66.4032 66.8842 65.4949 69.0972 62.9388 72.2996C60.4347 69.0712 59.5394 66.8582 59.2799 65.4262ZM63.2632 102.839H63.0037H62.7572C54.1763 102.83 45.6958 100.987 37.8808 97.431C30.0659 93.8754 23.096 88.6896 17.4356 82.2191C17.241 80.5008 17.0334 78.9386 16.8128 77.5067C21.6193 81.6599 27.7393 83.9665 34.0825 84.0155H34.1993C38.244 83.9418 42.2222 82.9695 45.8477 81.1688C49.4732 79.3681 52.6559 76.7837 55.1668 73.6013C56.7041 75.9608 58.4638 78.1666 60.4217 80.1883L63.0167 82.9351L65.6117 80.1883C67.672 78.0597 69.511 75.7262 71.1001 73.2238C73.6197 76.5199 76.8521 79.1992 80.5539 81.0595C84.2556 82.9199 88.33 83.9128 92.4699 83.9635H92.5867C98.6196 83.8926 104.452 81.7829 109.143 77.9753C108.948 79.2771 108.753 80.683 108.585 82.2191C102.925 88.6909 95.9558 93.8776 88.1406 97.4333C80.3254 100.989 71.8444 102.832 63.2632 102.839ZM113.697 13.915C111.387 19.1221 110.466 20.9706 107.858 22.2593C107.763 22.3125 107.671 22.3734 107.586 22.4416L107.313 22.6238L107.015 22.9102C107.015 22.9753 106.872 23.0404 106.82 23.1055L106.574 23.457C106.522 23.5277 106.474 23.6016 106.431 23.6783C106.357 23.8065 106.296 23.9416 106.249 24.0818C106.214 24.1532 106.183 24.2272 106.158 24.3031C106.112 24.4475 106.077 24.5955 106.055 24.7457C106.055 24.8238 106.055 24.8889 106.055 24.967C106.055 25.0451 106.055 25.2925 106.055 25.4487C106.048 25.518 106.048 25.5877 106.055 25.657C106.068 25.8236 106.094 25.989 106.133 26.1516C106.126 26.2166 106.126 26.282 106.133 26.3469C106.174 26.5142 106.235 26.6759 106.314 26.8286C106.31 26.8849 106.31 26.9415 106.314 26.9978C106.313 27.0282 106.313 27.0586 106.314 27.0889C107.981 30.1823 109.163 33.5149 109.817 36.9694C107.271 34.4544 104.2 32.5381 100.826 31.3587C94.5445 29.1472 87.6514 29.4787 81.6098 32.283C76.6923 34.444 71.3077 40.315 66.0399 46.0037C65.0019 47.1493 63.9898 48.2428 63.0037 49.2842C62.0306 48.2428 61.0185 47.1493 59.9805 46.0037C54.7906 40.315 49.38 34.444 44.4106 32.283C38.3706 29.4719 31.4749 29.1402 25.1946 31.3587C21.8204 32.5381 18.7493 34.4544 16.203 36.9694C16.8528 33.5154 18.03 30.1826 19.6932 27.0889C19.6932 27.0889 19.6932 27.0889 19.6932 27.0108C19.6932 26.9457 19.6932 26.8937 19.6932 26.8416C19.7727 26.6889 19.8337 26.5272 19.8749 26.3599V26.1647C19.9135 26.002 19.9395 25.8366 19.9527 25.67V25.5138C19.9527 25.3576 19.9527 25.1883 19.9527 25.0321C19.9527 24.8759 19.9527 24.8889 19.9527 24.8108C19.9305 24.6606 19.8958 24.5126 19.8489 24.3682C19.8489 24.2901 19.7841 24.225 19.7581 24.1469C19.7109 24.0067 19.6501 23.8716 19.5765 23.7434C19.5335 23.6667 19.4858 23.5928 19.4337 23.5221L19.1872 23.1706L18.9926 22.9753L18.6942 22.6889L18.4217 22.5067C18.336 22.4385 18.2449 22.3775 18.1492 22.3244H18.0843C15.4893 21.0226 14.5422 19.1741 12.2456 13.967C11.6877 12.509 11.026 10.9469 10.1956 9.20253L27.3874 12.6002C31.8059 13.4627 36.3778 13.0473 40.57 11.4025C54.9941 5.74411 71.0133 5.74411 85.4374 11.4025C89.6303 13.0445 94.2014 13.4598 98.62 12.6002L115.825 9.20253C114.994 10.9469 114.307 12.509 113.697 13.915Z" fill="rgba(255, 255, 255, 0.3)" />
                </Svg>
                <View
                    style={styles.userContainer}
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
                <View
                    style={styles.rowContainer}
                >
                    <TextInput
                        style={styles.inputRow}
                        placeholder="First Name"
                        placeholderTextColor="#fff"
                        autoCapitalize="none"
                        onChangeText={(text) => setFirstName(text)}
                    />
                    <TextInput
                        style={styles.inputRow}
                        placeholder="Last Name"
                        placeholderTextColor="#fff"
                        autoCapitalize="none"
                        onChangeText={(text) => setLastName(text)}
                    />
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
                    <ActivityIndicator size="large" color="#fff" />
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
                                    style={styles.link}
                                    onPress={() => navigation.navigate("login")}
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
