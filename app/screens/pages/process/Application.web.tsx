// firebase
import { runTransaction, Timestamp, doc, getDoc, setDoc } from "firebase/firestore";
import { UploadTask, getDownloadURL, ref as storageRef, uploadBytesResumable } from 'firebase/storage';
import { FIREBASE_STORAGE, FIRESTORE_DB, FIREBASE_AUTH } from "../../../../firebase/FirebaseConfig";
import { User } from "firebase/auth";

// react
import { SetStateAction, useEffect, useState } from "react";
import { NavigationProp } from "@react-navigation/native";
import {
    View,
    Text,
    TextInput,
    KeyboardAvoidingView,
    Linking,
    Pressable,
    ActivityIndicator,
    Dimensions,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import * as DocumentPicker from "expo-document-picker";
import Checkbox from "expo-checkbox";
import * as Progress from 'react-native-progress';
import RadioButtonGroup, { RadioButtonItem } from "expo-radio-button";

// static
import { styles } from "../../../../assets/style/ApplicationStyle";
import { schoolNames } from "../../../../assets/data/schools";
import NumberInput from "../../../../components/NumberInput";
import DatePicker from "../../../../components/DatePicker";

interface RouterProps {
    navigation: NavigationProp<any, any>;
}

const Application = ({ navigation }: RouterProps) => {

    // application
    const [birthdate, setBirthdate] = useState(new Date());
    const [chosenBirthdate, setChosenBirthdate] = useState(new Date());
    const [gender, setGender] = useState("");
    const [otherGender, setOtherGender] = useState("");
    const [race, setRace] = useState("");
    const [otherRace, setOtherRace] = useState("");
    const [school, setSchool] = useState("");
    const [otherSchool, setOtherSchool] = useState("");
    const [describe, setDescribe] = useState("");
    const [major, setMajor] = useState("");
    const [numHackathons, setNumHackathons] = useState("");
    const [reason, setReason] = useState("");
    const [mlhPrivacyAndTermsNCondition, setMlhPrivacyAndTermsNCondition] = useState(false);
    const [mlhCodeofConduct, setMlhCodeofConduct] = useState(false);
    const [mlhAdvertisement, setMlhAdvertisement] = useState(false);

    // screen width
    const [screenWidth, setScreenWidth] = useState(Dimensions.get('window').width);

    // user
    const [user, setUser] = useState<User | null>(null);
    const [coinsID, setCoinsID] = useState("");
    const [referred, setReferred] = useState(false);
    const [verifyReferral, setVerifyReferral] = useState(false);

    // travel
    const [travel, setTravel] = useState("");
    const [otherTravel, setOtherTravel] = useState("");

    // loading
    const [loading, setLoading] = useState(false);
    const [screenLoading, setScreenLoading] = useState(false);

    // dietary restrictions
    const [dietary, setDietary] = useState("");
    const [otherDietary, setOtherDietary] = useState("");
    const [otherDietaryRestriction, setOtherDietaryRestriction] = useState('');
    const [otherDietaryRestrictionCheck, setOtherDietaryRestrictionCheck] = useState(false);

    // year
    const [selectYear, setSelectYear] = useState("");
    const [otherYear, setOtherYear] = useState("");
    const [otherSelectYearCheck, setOtherSelectYearCheck] = useState("");

    // resume upload
    const [resumeName, setResumeName] = useState("none");
    const [uploadResume, setUploadResume] = useState<UploadTask | null>(null);
    const [resumeUrl, setResumeUrl] = useState("");
    const [isResumePicked, setIsResumePicked] = useState(false);
    const [progress, setProgress] = useState(0);

    // update application
    const [applicationSubmitted, setApplicationSubmitted] = useState(false);

    const changeResumeHandle = async () => {
        let result = await DocumentPicker.getDocumentAsync({
            type: "application/msword,application/pdf",
            multiple: false,
            copyToCacheDirectory: true,
        });

        if (result.canceled) {
            return;
        }

        const r = await fetch(result.assets[0].uri);
        const b = await r.blob();

        const storageReference = storageRef(
            FIREBASE_STORAGE,
            `/resume/${selectYear}/${result.assets[0].name}`
        );
        const uploadResumeToDB = uploadBytesResumable(storageReference, b);

        uploadResumeToDB.on("state_changed", (snapshot) => {
            setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            setUploadResume(uploadResumeToDB);
        });

        setResumeUrl(await getDownloadURL(uploadResumeToDB.snapshot.ref));
        setResumeName(result.assets[0].name);
        setIsResumePicked(true);
    };

    // Add a function to check whether all required fields are filled
    const areRequiredFieldsFilled = () => {
        // Add conditions for all required fields
        return (
            gender !== "" &&
            race !== "" &&
            school !== "" &&
            selectYear !== "" &&
            describe !== "" &&
            major !== "" &&
            numHackathons !== "" &&
            reason !== "" &&
            mlhPrivacyAndTermsNCondition &&
            mlhCodeofConduct
        );
    };

    // screen width
    useEffect(() => {
        const onChange = () => {
            setScreenWidth(Dimensions.get('window').width);
        };
        const subscription = Dimensions.addEventListener('change', onChange);

        return () => {
            subscription.remove();
        };

    }, []);

    // check if application has already been completed and fill data if true
    useEffect(() => {
        setTimeout(() => {

            setUser(FIREBASE_AUTH.currentUser);

            const fetchApplication = async () => {

                let currUser = FIREBASE_AUTH.currentUser;
                if (currUser === null) {
                    return;
                }

                let applicationComplete;

                try {
                    await runTransaction(FIRESTORE_DB, async (transaction) => {
                        const userDoc = await transaction.get(doc(FIRESTORE_DB, "users", currUser.uid));
                        if (!userDoc.exists()) {
                            alert("User does not exist!");
                            return;
                        }
                        if (userDoc.data().applicationComplete) {
                            applicationComplete = true;
                        } else {
                            applicationComplete = false;
                        }
                    });
                    console.log("User transaction successfully committed!");
                } catch (e) {
                    alert("Transaction failed: " + e);
                }

                if (applicationComplete) {
                    setApplicationSubmitted(true);
                    try {
                        await runTransaction(FIRESTORE_DB, async (transaction) => {
                            const applicationDoc = await transaction.get(doc(FIRESTORE_DB, "applications", currUser.uid));
                            if (!applicationDoc.exists()) {
                                alert("Application does not exist!");
                                return;
                            }
                            const data = applicationDoc.data();
                            setBirthdate(data.birthdate);
                            setGender(data.gender);
                            setRace(data.race);
                            setSchool(data.school);
                            setSelectYear(data.schoolYear);
                            setResumeUrl(data.resume);
                            setResumeName(data.resumeName)
                            setDescribe(data.describe);
                            setDietary(data.dietary);
                            setMajor(data.major);
                            setNumHackathons(data.numHackathons);
                            setReason(data.reason);
                            setCoinsID(data.hooCoinsReferralID);
                            setReferred(data.referred);
                            setMlhPrivacyAndTermsNCondition(data.mlhPrivacyAndTermsNCondition);
                            setMlhCodeofConduct(data.mlhCodeofConduct);
                            setMlhAdvertisement(data.mlhAdvertisement);
                        });
                        console.log("Application transaction successfully committed!");
                    } catch (e) {
                        alert("Transaction failed: " + e);
                    }
                }
            }

            fetchApplication();
            setScreenLoading(true);
        }, 2500);
    }, []);

    // add multiple restrictions
    /*
    const selectRestrictions = (event: any) => {

        if (dietaryRestriction.includes(event.target.value)) {
            setDietaryRestriction(current => current.filter(diet => diet !== event.target.value))
        }
        else {
            setDietaryRestriction(current => [...current, event.target.value]);
        }

    };*/


    const apply = async () => {
        const finalSchool = school === 'Other' ? otherSchool : school;
        const finalGender = gender === 'Other' ? otherGender : gender;
        const finalRace = race === 'Other' ? otherRace : race;
        const finalYear = selectYear === 'Other' ? otherYear : selectYear;
        const finalDietary = dietary === 'Other' ? otherDietary : dietary;
        const finalTravel = travel === "Other" ? otherTravel : travel;

        if (user == null) {
            return;
        }

        /*
        // update dietary restrictions with other value
        var dietRestriction = dietaryRestriction;
        if (otherDietaryRestriction !== '') {
            dietRestriction.push(otherDietaryRestriction);
        }*/


        // check if refferal id is correct or not
        let finalVerifyReferral = verifyReferral;

        if (coinsID !== "") {
            const docSnap = await getDoc(doc(FIRESTORE_DB, "users", coinsID));

            if (docSnap.exists()) {
                finalVerifyReferral = true;
            } else {
                alert("HooCoins Referral ID does not exist");
                return;
            }
        }

        setLoading(true);

        // checks if resume has been uploaded yet or not
        if (progress === 100 && isResumePicked && uploadResume !== null) {

            await setDoc(doc(FIRESTORE_DB, "applications", user.uid), {
                birthdate: birthdate,
                gender: finalGender,
                race: finalRace,
                school: finalSchool,
                schoolYear: finalYear,
                describe: describe,
                dietary: finalDietary,
                major: major,
                resume: resumeUrl,
                resumeName: resumeName,
                numHackathons: numHackathons,
                reason: reason,
                hooCoinsReferralID: coinsID,
                referred: finalVerifyReferral,
                travel: finalTravel,
                mlhPrivacyAndTermsNCondition: mlhPrivacyAndTermsNCondition,
                mlhCodeofConduct: mlhCodeofConduct,
                mlhAdvertisement: mlhAdvertisement,
                createdAt: Timestamp.now(),
                updatedAt: Timestamp.now(),
            });

        } else {
            await setDoc(doc(FIRESTORE_DB, "applications", user.uid), {
                birthdate: chosenBirthdate,
                gender: finalGender,
                race: finalRace,
                school: finalSchool,
                schoolYear: finalYear,
                describe: describe,
                dietary: finalDietary,
                major: major,
                resume: "none",
                resumeName: "none",
                numHackathons: numHackathons,
                reason: reason,
                hooCoinsReferralID: coinsID,
                referred: finalVerifyReferral,
                travel: finalTravel,
                mlhPrivacyAndTermsNCondition: mlhPrivacyAndTermsNCondition,
                mlhCodeofConduct: mlhCodeofConduct,
                mlhAdvertisement: mlhAdvertisement,
                createdAt: Timestamp.now(),
                updatedAt: Timestamp.now(),
            });

        }

        try {
            await runTransaction(FIRESTORE_DB, async (transaction) => {
                const userDoc = await transaction.get(doc(FIRESTORE_DB, "users", user.uid));
                if (!userDoc.exists()) {
                    alert("User does not exist!");
                    return;
                }

                // calculate hoocoins bonus
                let bonus: number;
                if (!userDoc.data().applicationComplete) { // only able to get bonus if application is new 
                    if (Date.now() < Date.parse("2024-03-01T08:00:00+01:00") && finalVerifyReferral) {
                        bonus = 10;
                    } else if (verifyReferral || Date.now() < Date.parse("2024-03-01T08:00:00+01:00")) {
                        bonus = 5;
                    } else {
                        bonus = 0;
                    }
                } else {
                    bonus = 0;
                }

                let newHoocoins = userDoc.data().hoocoins + bonus;
                transaction.update(doc(FIRESTORE_DB, "users", user.uid), {
                    hoocoins: newHoocoins,
                    applicationComplete: true,
                    updatedAt: Timestamp.now()
                });
            });
            console.log("User transaction successfully committed!");
        } catch (e) {
            alert("Transaction failed: " + e);
        }

        if (finalVerifyReferral) {
            try {
                await runTransaction(FIRESTORE_DB, async (transaction) => {
                    const userDoc = await transaction.get(doc(FIRESTORE_DB, "users", coinsID));
                    if (!userDoc.exists()) {
                        alert("User does not exist!");
                        return;
                    }
                    const newHoocoins = userDoc.data().hoocoins + 5;
                    transaction.update(doc(FIRESTORE_DB, "users", coinsID), { hoocoins: newHoocoins });
                });
                console.log("Referral transaction successfully committed!");
            } catch (e) {
                alert("Transaction failed: " + e);
            }
        }
        setLoading(false);
        navigation.navigate('Completion')

    }


    if (!screenLoading) {
        return (
            <View
                style={styles.container}
            >
                <ActivityIndicator size="large" color="#121A6A" />

            </View>
        );
    } else {
        return (
            <View
                style={{
                    marginLeft: screenWidth > 768 ? 250 : 0,
                }}
            >
                <View style={styles.container}>
                    <KeyboardAvoidingView behavior="padding">
                        <Text style={styles.subHeader}>Basic Information</Text>
                        <DatePicker
                            value={chosenBirthdate}
                            onChange={(newDate: any) => setChosenBirthdate(newDate)}
                        />

                        <Text>
                            Gender
                            <Text style={styles.required}> *</Text>
                        </Text>
                        <Picker
                            selectedValue={gender}
                            onValueChange={(itemValue, itemIndex) => setGender(itemValue)}
                            prompt="Gender"
                            style={styles.picker}
                        >
                            <Picker.Item label="Select" value="Select" />
                            <Picker.Item label="Male" value="male" />
                            <Picker.Item label="Female" value="female" />
                            <Picker.Item label="Non-binary" value="non-binary" />
                            <Picker.Item label="Transgender" value="transgender" />
                            <Picker.Item label="Other" value="Other" />
                            <Picker.Item label="Prefer not to say" value="not-say" />
                        </Picker>
                        {gender === 'Other' && (
                            <TextInput
                                value={otherGender}
                                onChangeText={(text) => setOtherGender(text)}
                                placeholder="Enter Other Gender"
                                style={styles.input}
                            />
                        )}

                        <Text>
                            Race
                            <Text style={styles.required}> *</Text>
                        </Text>
                        <Picker
                            selectedValue={race}
                            onValueChange={(itemValue, itemIndex) => setRace(itemValue)}
                            prompt="Race"
                            style={styles.picker}
                        >
                            <Picker.Item label="Select" value="Select" />
                            <Picker.Item label="African American" value="african-american" />
                            <Picker.Item label="White" value="white" />
                            <Picker.Item label="Asian" value="asian" />
                            <Picker.Item label="Hispanic" value="hispanic" />
                            <Picker.Item label="Native Hawaiian" value="native-hawaiian" />
                            <Picker.Item label="Native American" value="native-american" />
                            <Picker.Item label="Other" value="Other" />
                            <Picker.Item label="Two or more races" value="two-or-more" />
                        </Picker>
                        {race === 'Other' && (
                            <TextInput
                                value={otherRace}
                                onChangeText={(text) => setOtherRace(text)}
                                placeholder="Enter Other Race"
                                style={styles.input}
                            />
                        )}

                        <Text style={styles.subHeader}>Background Information</Text>

                        <Text>
                            School
                            <Text style={styles.required}> *</Text>
                        </Text>
                        <Picker
                            selectedValue={school}
                            onValueChange={(itemValue, itemIndex) => setSchool(itemValue)}
                            prompt="School"
                            style={styles.picker}
                        >
                            {schoolNames.map((name) => (
                                <Picker.Item value={name} label={name} />
                            ))}
                        </Picker>
                        {school === 'Other' && (
                            <TextInput
                                value={otherSchool}
                                onChangeText={(text) => setOtherSchool(text)}
                                placeholder="Enter Other School"
                                style={styles.input}
                            />
                        )}

                        <Text>
                            Graduation Year
                            <Text style={styles.required}> *</Text>
                        </Text>
                        <Picker
                            selectedValue={selectYear}
                            onValueChange={(itemValue, itemIndex) => setSelectYear(itemValue)}
                            prompt="Graduation Year"
                            style={styles.picker}
                        >
                            { }
                            <Picker.Item label="Select" value="Select" />
                            <Picker.Item label="2023" value="2023" />
                            <Picker.Item label="2024" value="2024" />
                            <Picker.Item label="2025" value="2025" />
                            <Picker.Item label="2026" value="2026" />
                            <Picker.Item label="Other" value="Other" />
                        </Picker>
                        {selectYear === 'Other' && (
                            <TextInput
                                value={otherYear}
                                onChangeText={(text) => setOtherYear(text)}
                                placeholder="Enter Other Graduation Year"
                                style={styles.input}
                            />
                        )}

                        <Text>
                            Dietary Restrictions
                            <Text style={styles.required}> *</Text>
                        </Text>
                        <Picker
                            selectedValue={dietary}
                            onValueChange={(itemValue, itemIndex) => setDietary(itemValue)}
                            prompt="Dietary"
                            style={styles.picker}
                        >
                            <Picker.Item label="Select" value="select" />
                            <Picker.Item label="None" value="none" />
                            <Picker.Item label="Vegetarian" value="vegetarian" />
                            <Picker.Item label="Vegan" value="vegan" />
                            <Picker.Item label="Gluten Free" value="gluten-free" />
                            <Picker.Item label="Other" value="other" />
                        </Picker>
                        {dietary === 'Other' && (
                            <TextInput
                                value={otherDietary}
                                onChangeText={(text) => setOtherDietary(text)}
                                placeholder="Enter Other Dietary Restrictions"
                                style={styles.input}
                            />
                        )}
                        <Text>
                            PDF or docx file only
                        </Text>
                        <Pressable style={styles.resume_button} onPress={() => changeResumeHandle()}>
                            {resumeName !== "none" &&
                                <Text style={styles.button_text}>Resume: {resumeName}</Text>
                            }
                            {resumeName === "none" &&
                                <Text style={styles.button_text}>Optional - Upload Resume</Text>

                            }
                        </Pressable>
                        <Progress.Bar
                            progress={progress / 100}
                            width={null}
                            color="#192596"
                            style={{ marginBottom: 8 }}
                        />

                        <Text>
                            I would describe myself as a...
                            <Text style={styles.required}> *</Text>
                        </Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Innovator who enjoys..."
                            placeholderTextColor="#808080"
                            autoCapitalize="none"
                            value={describe}
                            onChangeText={(text) => setDescribe(text)}
                        />

                        <Text>
                            Major
                            <Text style={styles.required}> *</Text>
                        </Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Computer Science"
                            placeholderTextColor="#808080"
                            autoCapitalize="none"
                            value={major}
                            onChangeText={(text) => setMajor(text)}
                        />

                        <Text>
                            How many hackathons have you attended?
                            <Text style={styles.required}> *</Text>
                        </Text>
                        <TextInput
                            style={styles.input}
                            placeholder="2 / 3 / 4 ..."
                            placeholderTextColor="#808080"
                            autoCapitalize="none"
                            value={numHackathons}
                            onChangeText={(text) => setNumHackathons(text)}
                        />

                        <Text>
                            What do you hope to get out of HooHacks?
                            <Text style={styles.required}> *</Text>
                        </Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Interactive workshops, community, ..."
                            placeholderTextColor="#808080"
                            autoCapitalize="none"
                            value={reason}
                            onChangeText={(text) => setReason(text)}
                        />

                        <Text>
                            Do you require any transportation?
                            <Text style={styles.required}> *</Text> (bus information will be released shortly but let us know your preference here)
                        </Text>
                        <RadioButtonGroup
                            selected={travel}
                            onSelected={(value: SetStateAction<string>) => setTravel(value)}
                        >
                            <RadioButtonItem value="car" label="Car" />
                            <RadioButtonItem value="bus" label="Provided Bus (if sent to your school)" />
                            <RadioButtonItem value="Other" label="Other" />
                            <RadioButtonItem value="none" label="None" />
                        </RadioButtonGroup>
                        {travel === 'Other' && (
                            <TextInput
                                value={otherTravel}
                                onChangeText={(text) => setOtherTravel(text)}
                                placeholderTextColor="#808080"
                                placeholder="Please specify other travel options"
                                style={styles.input}
                            />
                        )}

                        <Text>
                            Did someone tell you to register for HooHacks? If so, enter their
                            raffle ID so that they can get an extra coins in our raffle! Their
                            raffle ID can be found on the bottom of the dashboard page.
                        </Text>
                        <TextInput
                            style={styles.input}
                            placeholder="HooCoins ID"
                            placeholderTextColor="#808080"
                            autoCapitalize="none"
                            value={coinsID}
                            onChangeText={(text) => setCoinsID(text)}
                            editable={!referred}
                        />
                        <View style={styles.containerCheckBox}>
                            <Checkbox
                                value={mlhPrivacyAndTermsNCondition}
                                onValueChange={() =>
                                    setMlhPrivacyAndTermsNCondition(!mlhPrivacyAndTermsNCondition)
                                }
                                color={"#121A6A"}
                            />
                            <Text>
                                I authorize you to share my application/registration information
                                with Major League Hacking for event administration, ranking, and
                                MLH administration in-line with the
                                <Text> </Text>
                                <Text
                                    style={styles.link}
                                    onPress={() => Linking.openURL("https://mlh.io/privacy")}
                                >
                                    MLH Privacy Policy.
                                </Text>
                                <Text> </Text>I further agree to the terms of both the
                                <Text> </Text>
                                <Text
                                    style={styles.link}
                                    onPress={() =>
                                        Linking.openURL(
                                            "https://github.com/MLH/mlh-policies/tree/master/prize-terms-and-conditions"
                                        )
                                    }
                                >
                                    MLH Contest Terms and Conditions
                                </Text>
                                <Text> </Text>
                                and the
                                <Text> </Text>
                                <Text
                                    style={styles.link}
                                    onPress={() => Linking.openURL("https://mlh.io/privacy")}
                                >
                                    MLH Privacy Policy.
                                </Text>
                                <Text style={styles.required}> *</Text>
                            </Text>
                        </View>
                        <View style={styles.containerCheckBox}>
                            <Checkbox
                                value={mlhCodeofConduct}
                                onValueChange={() => setMlhCodeofConduct(!mlhCodeofConduct)}
                                color={"#121A6A"}
                            />
                            <Text>
                                I have read and agree to the
                                <Text> </Text>
                                <Text
                                    style={styles.link}
                                    onPress={() =>
                                        Linking.openURL(
                                            "https://static.mlh.io/docs/mlh-code-of-conduct.pdf"
                                        )
                                    }
                                >
                                    MLH Code of Conduct.
                                </Text>
                                <Text style={styles.required}> *</Text>
                            </Text>
                        </View>
                        <View style={styles.containerCheckBox}>
                            <Checkbox
                                value={mlhAdvertisement}
                                onValueChange={() => setMlhAdvertisement(!mlhAdvertisement)}
                                color={"#121A6A"}
                            />
                            <Text>
                                I authorize MLH to send me pre- and post-event informational
                                emails, which contain free credit and opportunities from their
                                partners.
                            </Text>
                        </View>
                        {loading ? (
                            /* Disable the Apply button if required fields are not filled */
                            <ActivityIndicator size="large" color="#121A6A" />
                        ) : (
                            applicationSubmitted ? (
                                <>
                                    <Pressable style={[styles.button, areRequiredFieldsFilled() ? null : { opacity: 0.5 }]} onPress={() => areRequiredFieldsFilled() && apply()} disabled={!areRequiredFieldsFilled()}>
                                        <Text style={styles.button_text}>Update Application</Text>
                                    </Pressable>
                                </>
                            ) : (
                                <>
                                    <Pressable style={[styles.button, areRequiredFieldsFilled() ? null : { opacity: 0.5 }]} onPress={() => areRequiredFieldsFilled() && apply()} disabled={!areRequiredFieldsFilled()}>
                                        <Text style={styles.button_text}>Apply</Text>
                                    </Pressable>
                                </>
                            )

                        )}
                    </KeyboardAvoidingView>
                </View>
            </View>
        );
    }
};

export default Application;