// firebase
import { Timestamp, doc, setDoc } from "firebase/firestore";

// react
import { useEffect, useState } from 'react';
import { NavigationProp } from "@react-navigation/native";
import { View, Text, TextInput, KeyboardAvoidingView, Linking, Pressable, ActivityIndicator } from "react-native";
import { Picker } from '@react-native-picker/picker';
import * as DocumentPicker from 'expo-document-picker';
import Checkbox from 'expo-checkbox';

// firebase
import { UploadTask, getDownloadURL, ref as storageRef, uploadBytesResumable } from 'firebase/storage';
import { FIREBASE_STORAGE, FIRESTORE_DB } from "../../firebase/FirebaseConfig";
import { User, onAuthStateChanged } from "firebase/auth";
import { FIREBASE_AUTH } from "../../firebase/FirebaseConfig";

// static
import { styles } from "../../assets/style/ApplicationStyle";
import schoolData from "../../assets/data/schools.txt";
import NumberInput from "../../assets/components/NumberInput";
import DatePicker from "../../assets/components/DatePicker";

interface RouterProps {
    navigation: NavigationProp<any, any>;
}

const Application = ({ navigation }: RouterProps) => {

    const [birthdate, setBirthdate] = useState(new Date());
    const [open, setOpen] = useState(false);
    const [gender, setGender] = useState("");
    const [race, setRace] = useState("");
    const [school, setSchool] = useState("");
    const [describe, setDescribe] = useState("");
    const [major, setMajor] = useState("");
    const [numHackathons, setNumHackathons] = useState(0);
    const [reason, setReason] = useState("");
    const [coinsID, setCoinsID] = useState("");
    const [mlhPrivacyAndTermsNCondition, setMlhPrivacyAndTermsNCondition] = useState(false);
    const [mlhCodeofConduct, setMlhCodeofConduct] = useState(false);
    const [mlhAdvertisement, setMlhAdvertisement] = useState(false);

    // user
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        setUser(FIREBASE_AUTH.currentUser);
    }, []);

    // loading
    const [loading, setLoading] = useState(false);

    // year
    const [selectYear, setSelectYear] = useState(2024);
    const [otherSelectYear, setOtherSelectYear] = useState('');
    const [otherSelectYearCheck, setOtherSelectYearCheck] = useState('');

    // school
    const [schools, setSchools] = useState([]);

    // resume upload
    const [resumeName, setResumeName] = useState("");
    const [uploadResume, setUploadResume] = useState<UploadTask | null>(null);
    const [isResumePicked, setIsResumePicked] = useState(false);
    const [progress, setProgress] = useState(0);

    const changeResumeHandle = async () => {
        let result = await DocumentPicker.getDocumentAsync({
            type: "*/*",
            multiple: false,
            copyToCacheDirectory: true,
        });

        if (result.canceled) {
            return;
        }

        const r = await fetch(result.assets[0].uri);
        const b = await r.blob();

        const storageReference = storageRef(FIREBASE_STORAGE, `/resume/${selectYear}/${result.assets[0].name}`);
        const uploadResumeToDB = uploadBytesResumable(storageReference, b);

        uploadResumeToDB.on("state_changed", (snapshot) => {
            setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            setUploadResume(uploadResumeToDB);
        });

        setResumeName(result.assets[0].name);
        setIsResumePicked(true);
    };

    // add multiple dietary restrictions
    // const selectRestrictions = (event) => {

    //     if (dietaryRestriction.includes(event.target.value)) {
    //         setDietaryRestriction(current => current.filter(diet => diet !== event.target.value))
    //     }
    //     else {
    //         setDietaryRestriction(current => [...current, event.target.value]);
    //     }

    // };


    useEffect(() => {
        fetch(schoolData).then(
            data => {
                // for (let i = 0; i < data.text.length; i++) {
                //     console.log(data.text.toString());
                // }
                console.log(data.text.toString());
                console.log(data.text);
            }).then(

        );

    }, []);

    const apply = async () => {

        if (user == null) {
            return;
        }


        await setDoc(doc(FIRESTORE_DB, "applications", user.uid), {
            birthdate: birthdate,
        });
    }


    return (
        <View
            style={styles.webContainer}
        >
            <View
                style={styles.container}
            >
                <KeyboardAvoidingView behavior="padding">

                    <Text
                        style={styles.subHeader}
                    >
                        Basic Information
                    </Text>
                    <DatePicker
                    // onChange={choice => setDate(choice)}
                    />

                    <Text>
                        Gender
                        <Text style={styles.required}> *</Text>
                    </Text>
                    <Picker
                        selectedValue={gender}
                        onValueChange={(itemValue, itemIndex) =>
                            setGender(itemValue)
                        }
                        prompt="Gender"
                        style={styles.picker}
                    >
                        <Picker.Item label="Male" value="male" />
                        <Picker.Item label="Female" value="female" />
                        <Picker.Item label="Non-binary" value="non-binary" />
                        <Picker.Item label="Transgender" value="transgender" />
                        <Picker.Item label="Other" value="other" />
                        <Picker.Item label="Prefer not to say" value="not-say" />
                    </Picker>

                    <Text>
                        Race
                        <Text style={styles.required}> *</Text>
                    </Text>
                    <Picker
                        selectedValue={race}
                        onValueChange={(itemValue, itemIndex) =>
                            setRace(itemValue)
                        }
                        prompt="Race"
                        style={styles.picker}

                    >
                        <Picker.Item label="African American" value="african-american" />
                        <Picker.Item label="White" value="white" />
                        <Picker.Item label="Asian" value="asian" />
                        <Picker.Item label="Hispanic" value="hispanic" />
                        <Picker.Item label="Native Hawaiian" value="native-hawaiian" />
                        <Picker.Item label="Native American" value="native-american" />
                        <Picker.Item label="Other" value="other" />
                        <Picker.Item label="Two or more races" value="two-or-more" />
                    </Picker>
                    <Text
                        style={styles.subHeader}
                    >
                        Basic Information
                    </Text>

                    <Text>
                        School
                        <Text style={styles.required}> *</Text>
                    </Text>
                    <Picker
                        selectedValue={school}
                        onValueChange={(itemValue, itemIndex) =>
                            setRace(itemValue)
                        }
                        prompt="School"
                        style={styles.picker}
                    >
                        { }
                        <Picker.Item label="African American" value="african-american" />
                        <Picker.Item label="White" value="white" />
                        <Picker.Item label="Asian" value="asian" />
                        <Picker.Item label="Hispanic" value="hispanic" />
                        <Picker.Item label="Native Hawaiian" value="native-hawaiian" />
                        <Picker.Item label="Native American" value="native-american" />
                        <Picker.Item label="Other" value="other" />
                        <Picker.Item label="Two or more races" value="two-or-more" />
                    </Picker>

                    <Text>
                        Graduation Year
                        <Text style={styles.required}> *</Text>
                    </Text>
                    <Picker
                        selectedValue={selectYear}
                        onValueChange={(itemValue, itemIndex) =>
                            setSelectYear(itemValue)
                        }
                        prompt="Graduation Year"
                        style={styles.picker}
                    >
                        { }
                        <Picker.Item label="2023" value="2023" />
                        <Picker.Item label="2024" value="2024" />
                        <Picker.Item label="2025" value="2025" />
                        <Picker.Item label="2026" value="2026" />
                        <Picker.Item label="Other" value="other" />
                    </Picker>
                    <Pressable
                        style={styles.button}
                        onPress={() => changeResumeHandle()}
                    >
                        <Text
                            style={styles.button_text}
                        >
                            Optional - Upload Resume
                        </Text>

                    </Pressable>

                    <Text>
                        I would describe myself as a...
                        <Text style={styles.required}> *</Text>
                    </Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Innovator who enjoys..."
                        placeholderTextColor="#121A6A"
                        autoCapitalize="none"
                        onChangeText={(text) => setDescribe(text)}
                    />

                    <Text>
                        Major
                        <Text style={styles.required}> *</Text>
                    </Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Computer Science"
                        placeholderTextColor="#121A6A"
                        autoCapitalize="none"
                        onChangeText={(text) => setMajor(text)}
                    />

                    <Text>
                        How many hackathons have you attended?
                        <Text style={styles.required}> *</Text>
                    </Text>
                    <NumberInput
                        style={styles.input}
                    // placeholder="How many hackathons have you attended?"
                    // keyboardType="numeric"
                    // placeholderTextColor="#121A6A"
                    // autoCapitalize="none"
                    // onChangeText={(text) => setNumHackathons(parseInt(text.replace(/[^0-9]/g, '')))}
                    />

                    <Text>
                        What do you hope to get out of HooHacks?
                        <Text style={styles.required}> *</Text>
                    </Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Interactive workshops, community, ..."
                        placeholderTextColor="#121A6A"
                        autoCapitalize="none"
                        onChangeText={(text) => setReason(text)}
                    />
                    <Text>
                        Did someone tell you to register for HooHacks? If so, enter their raffle ID so that they can get an extra coins in our raffle!
                        Their raffle ID can be found on the bottom of the dashboard page.
                    </Text>
                    <TextInput
                        style={styles.input}
                        placeholder="HooCoins ID"
                        placeholderTextColor="#121A6A"
                        autoCapitalize="none"
                        onChangeText={(text) => setCoinsID(text)}
                    />
                    <View
                        style={styles.containerCheckBox}
                    >
                        <Checkbox
                            value={mlhPrivacyAndTermsNCondition}
                            onValueChange={() => setMlhPrivacyAndTermsNCondition(!mlhPrivacyAndTermsNCondition)}
                            color={'#121A6A'}
                        />
                        <Text>
                            I authorize you to share my application/registration information with Major League Hacking for event administration, ranking, and MLH administration in-line with the
                            <Text>{' '}</Text>
                            <Text style={styles.link} onPress={() => Linking.openURL("https://mlh.io/privacy")}>MLH Privacy Policy.</Text>
                            <Text>{' '}</Text>
                            I further agree to the terms of both the
                            <Text>{' '}</Text>
                            <Text style={styles.link} onPress={() => Linking.openURL("https://github.com/MLH/mlh-policies/tree/master/prize-terms-and-conditions")}>MLH Contest Terms and Conditions</Text>
                            <Text>{' '}</Text>
                            and the
                            <Text>{' '}</Text>
                            <Text style={styles.link} onPress={() => Linking.openURL("https://mlh.io/privacy")}>MLH Privacy Policy.</Text>
                        </Text>
                    </View>
                    <View
                        style={styles.containerCheckBox}
                    >
                        <Checkbox
                            value={mlhCodeofConduct}
                            onValueChange={() => setMlhCodeofConduct(!mlhCodeofConduct)}
                            color={'#121A6A'}
                        />
                        <Text>
                            I have read and agree to the
                            <Text>{' '}</Text>
                            <Text style={styles.link} onPress={() => Linking.openURL("https://static.mlh.io/docs/mlh-code-of-conduct.pdf")}>MLH Code of Conduct.</Text>
                        </Text>
                    </View>
                    <View
                        style={styles.containerCheckBox}
                    >
                        <Checkbox
                            value={mlhAdvertisement}
                            onValueChange={() => setMlhAdvertisement(!mlhAdvertisement)}
                            color={'#121A6A'}
                        />
                        <Text>
                            I authorize MLH to send me pre- and post-event informational emails, which contain free credit and opportunities from their partners.
                        </Text>
                    </View>
                    {loading ? (
                        <ActivityIndicator size="large" color="#121A6A" />
                    ) : (
                        <>
                            <Pressable
                                style={styles.button}
                                onPress={() => apply()}
                            >
                                <Text
                                    style={styles.button_text}
                                >Apply</Text>
                            </Pressable>
                        </>
                    )}
                </KeyboardAvoidingView>
            </View>
        </View>

    )
}

export default Application