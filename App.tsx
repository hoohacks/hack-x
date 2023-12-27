import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { StyleSheet} from 'react-native';

// react components
import { useEffect, useState } from "react";

// firebase
import { User, onAuthStateChanged } from "firebase/auth";
import { FIREBASE_AUTH } from "./firebase/FirebaseConfig";

// views
import Login from "./app/screens/auth/Login";
import Details from "./app/screens/Details";
import SignUp from "./app/screens/auth/SignUp";

const Stack = createNativeStackNavigator();
const MenuStack = createNativeStackNavigator();
const AuthStack = createNativeStackNavigator();

function MenuLayout() {
  return (
    <MenuStack.Navigator>
      <MenuStack.Screen 
        name="Detail" 
        component={Details} 
      />
      {/* <UserStack.Screen
        name="Application"
        component={Application}
      /> */}
    </MenuStack.Navigator>
  );
};

function AuthLayout() {
  return (
    <AuthStack.Navigator>
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
    </AuthStack.Navigator>
  )
}
const App = () => {

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      console.log('user', user);
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
        Detail: '/nicole-is-crazy',
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
            name="menu" 
            component={MenuLayout} 
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

export default App;