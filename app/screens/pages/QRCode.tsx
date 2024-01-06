import { View, Text, Button,StyleSheet } from "react-native"
import { getAuth } from "firebase/auth";
import { NavigationProp } from "@react-navigation/native";
import { Color, Border, FontFamily, FontSize } from "../../../assets/style/GlobalStyles";

interface RouterProps {
  navigation: NavigationProp<any, any>;
}

const QRCode = ({ navigation }: RouterProps) => {

  const auth = getAuth();

  return (
    <View>
      <Text style={styles.comingSoon}>Coming Soon...</Text>
    </View>
  );
};
const styles= StyleSheet.create({
    comingSoon: {
        fontWeight: "700",
        fontFamily: FontFamily.chakraPetchBold,
        fontSize: FontSize.size_5xl,
        textAlign: "center",
        color: Color.colorBlack,
        lineHeight: 22,
        top: 0,
        left: 0,
        position: "absolute",
      },
})
export default QRCode;

