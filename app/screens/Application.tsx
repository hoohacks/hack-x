// firebase
import { Timestamp, doc, setDoc } from "firebase/firestore";

// react
import { useEffect, useState } from "react";
import { NavigationProp } from "@react-navigation/native";
import { View, Text, TextInput, KeyboardAvoidingView } from "react-native";
import DatePicker from "../../assets/components/DatePicker";
import { Picker } from "@react-native-picker/picker";
import * as RNFS from "react-native-fs";

// import CheckBox from 'react-native-check-box';

// static
import { styles } from "../../assets/style/ApplicationStyle";
// import schoolData from "../../assets/data/schools.txt";

interface RouterProps {
  navigation: NavigationProp<any, any>;
}

const Application = ({ navigation }: RouterProps) => {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [gender, setGender] = useState("");
  const [race, setRace] = useState("");
  const [school, setSchool] = useState("");
  const [describe, setDescribe] = useState("");
  const [major, setMajor] = useState("");
  const [numHackathons, setNumHackathons] = useState(0);
  const [schoolNames, setSchoolNames] = useState<string[]>([]);
  useEffect(() => {
    const fetchSchoolNames = async () => {
        try {
            const filePath = RNFS.DocumentDirectoryPath + '/schools.txt';
            const fileContent = await RNFS.readFile(filePath);
            const namesArray = fileContent.split('\n').map((name) => name.trim());
            setSchoolNames(namesArray);
          } catch (error) {
            console.error('Error fetching school names:', error);
          }
    };

    fetchSchoolNames();
  }, []);

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView behavior="padding">
        <Text style={styles.subHeader}>Basic Information</Text>
        <DatePicker />
        <Picker
          selectedValue={gender}
          onValueChange={(itemValue, itemIndex) => setGender(itemValue)}
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
        <Picker
          selectedValue={race}
          onValueChange={(itemValue, itemIndex) => setRace(itemValue)}
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
        <Text style={styles.subHeader}>Basic Information</Text>
        <Picker
          selectedValue={school}
          onValueChange={(itemValue, itemIndex) => setSchool(itemValue)}
          prompt="School"
          style={styles.picker}
        >
          {schoolNames.map((name, index) => (
            <Picker.Item value={index} label={name} />
          ))}
        </Picker>
        <TextInput
          style={styles.input}
          placeholder="I would describe myself as a..."
          placeholderTextColor="#121A6A"
          autoCapitalize="none"
          onChangeText={(text) => setDescribe(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Major"
          placeholderTextColor="#121A6A"
          autoCapitalize="none"
          onChangeText={(text) => setMajor(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="How many hackathons have you attended?"
          keyboardType="numeric"
          placeholderTextColor="#121A6A"
          autoCapitalize="none"
          onChangeText={(text) =>
            setNumHackathons(parseInt(text.replace(/[^0-9]/g, "")))
          }
        />
      </KeyboardAvoidingView>
    </View>
  );
};

export default Application;
