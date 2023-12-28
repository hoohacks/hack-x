import { View, Text, Button } from "react-native"
import { getAuth, signOut } from "firebase/auth";
import { NavigationProp } from "@react-navigation/native";

interface RouterProps {
  navigation: NavigationProp<any, any>;
}

const Details = ({ navigation }: RouterProps) => {

  const auth = getAuth();

  return (
    <View>
      <Text>Hello</Text>
      <Button 
        title="SignOut"
        onPress={
          () => signOut(auth)
        }
      />
    </View>
  );
};

export default Details;

