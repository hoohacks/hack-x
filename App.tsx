import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet} from 'react-native';

// react components
import { useEffect, useState } from "react";

// firebase
import { User, onAuthStateChanged } from "firebase/auth";
import { FIREBASE_AUTH } from "./FirebaseConfig";

// views
import Login from "./app/screens/auth/Login";
import Home from "./app/screens/pages/Home";
import SignUp from "./app/screens/auth/SignUp";
import Leaderboard from "./app/screens/pages/Leaderboard";
import Schedule from "./app/screens/pages/Schedule";
import Profile from "./app/screens/pages/Profile";
import Navbar from "./components/Navbar";

const Stack = createNativeStackNavigator();
const UserStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function UserLayout() {
    return (
        <Tab.Navigator tabBar={(props) => <Navbar {...props} />}>
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="Schedule" component={Schedule} />
            <Tab.Screen name="Leaderboard" component={Leaderboard} />
            <Tab.Screen name="Profile" component={Profile} />
        </Tab.Navigator>
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