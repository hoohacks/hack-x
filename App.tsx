import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet} from 'react-native';

// react components
import { useEffect, useState } from "react";

// firebase
import { User, onAuthStateChanged } from "firebase/auth";
import { FIREBASE_AUTH } from "./FirebaseConfig";

// views
import Login from "./app/screens/Login";
import Details from "./app/screens/Details";
import SignUp from "./app/screens/SignUp";
import PasswordReset from "./app/screens/PasswordReset";

const Stack = createNativeStackNavigator();
const UserStack = createNativeStackNavigator();

function UserLayout() {
  return (
    <UserStack.Navigator>
      <UserStack.Screen name="Detail" component={Details} />
    </UserStack.Navigator>
  );
};

export default function App() {

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      console.log('user', user);
      setUser(user);
    });
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        {user ? (
          <Stack.Screen name="UserInfo" component={UserLayout} options={{ headerShown: false}}/>
        ) : (
          <Stack.Screen name="Login" component={Login} options={{ headerShown:false }}/>
        )}
        <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown:false }}/>
        <Stack.Screen name="PasswordReset" component={PasswordReset} options={{ headerShown:false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});