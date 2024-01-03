import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {StyleSheet, View} from 'react-native';

// react components
import { useEffect, useState } from "react";
import { Platform } from 'react-native';

// firebase
import { User, onAuthStateChanged } from "firebase/auth";
import { FIREBASE_AUTH } from "./firebase/FirebaseConfig";

import Home from "./app/screens/pages/Home";
import Leaderboard from "./app/screens/pages/Leaderboard";
import Profile from "./app/screens/pages/Profile";
import Schedule from "./app/screens/pages/Schedule";
import Navbar from "./components/Navbar";
import NavbarWeb from "./components/Navbar.web";

const isWeb = Platform.OS === 'web';
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const WebLayout = () => {
    return (
        <View style={styles.webContainer}>
            <View style={styles.navbarContainer}>
                <NavbarWeb />
            </View>
            <View style={styles.contentContainer}>
                <Stack.Navigator>
                    <Stack.Screen name="Home" component={Home} />
                    <Stack.Screen name="Schedule" component={Schedule} />
                    <Stack.Screen name="Leaderboard" component={Leaderboard} />
                    <Stack.Screen name="Profile" component={Profile} />
                </Stack.Navigator>
            </View>
        </View>
    );
};

const UserLayout = () => {
    return isWeb ? <WebLayout /> : (
        <Tab.Navigator tabBar={(props) => <Navbar {...props} />}>
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="Schedule" component={Schedule} />
            <Tab.Screen name="Leaderboard" component={Leaderboard} />
            <Tab.Screen name="Profile" component={Profile} />
        </Tab.Navigator>
    );
};

// views
import Details from "./app/screens/Details";
import Login from "./app/screens/auth/Login";
import SignUp from "./app/screens/auth/SignUp";
import PasswordReset from "./app/screens/auth/PasswordReset.web";

// const MenuStack = createNativeStackNavigator();
const AuthStack = createNativeStackNavigator();

//function MenuLayout() {
//   return (
    // // add your own screen here in same format
    // <MenuStack.Navigator>
    //   <MenuStack.Screen
    //     name="Detail"
    //     component={Details}
    //   />
    //   {/* <UserStack.Screen
    //     name="Application"
    //     component={Application}
    //   /> */}
    // </MenuStack.Navigator>
  // );
// };

function AuthLayout() {
  return (
    <AuthStack.Navigator
      initialRouteName="login"
    >
      <AuthStack.Screen
        name="signup"
        component={SignUp}
        options={{
          headerShown:false,
          title: "HackX - Sign Up"
        }}
      />
      <AuthStack.Screen
        name="login"
        component={Login}
        options={{
          headerShown:false,
          title: "HackX - Login"
        }}
      />
      <AuthStack.Screen
        name="reset-password"
        component={PasswordReset}
        options={{
          headerShown:false,
          title: "HackX - Password Reset"
        }}
      />
    </AuthStack.Navigator>
  )
}

const App = () => {

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      setUser(user);
    });
  }, []);

  const linking = {
    prefixes: ['http://localhost:19006', 'project://'],
    config: {
      screens: {
        Test: '/test',
        Search: 'search',
        Login: '/login',
        SignUp: '/sign-up',
        Detail: '/detail',
        NotFound: '/404'
      },
    },
  };

  return (
    <NavigationContainer
      linking={linking}
    >
      <Stack.Navigator>
        {user ? (
          <Stack.Screen
            name="user"
            component={UserLayout}
            options={{
              headerShown: false
            }}
          />
        ) : (
          <Stack.Screen
            name="auth"
            component={AuthLayout}
            options={{
              headerShown:false
            }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
    webContainer: {
        flex: 1,
        flexDirection: 'row',
    },
    navbarContainer: {
        width: 250,
        backgroundColor: '#FFF',
        position: 'fixed',
        height: '100vh',
        overflowY: 'hidden'
    },
    contentContainer: {
        flex: 1,
        marginLeft: 250,
        height: '100vh',
        overflowY: 'auto'
    }
});

export default App;