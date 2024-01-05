import { View, Text, Button } from "react-native"
import { getAuth, signOut } from "firebase/auth";
import { NavigationProp } from "@react-navigation/native";

interface RouterProps {
  navigation: NavigationProp<any, any>;
}

const Completion = ({ navigation }: RouterProps) => {

  const auth = getAuth();

  return (
    <View>
      <Text>Your application has been submitted!</Text>
      
      <Button 
        title="Go Back to home"
        onPress={
          () => navigation.navigate("Home")
        }
      />
    </View>
  );
};

export default Completion;

