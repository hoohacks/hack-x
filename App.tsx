// navigation
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// react components
import { useEffect, useState } from "react";

// firebase
import { User, onAuthStateChanged } from "firebase/auth";
import { FIREBASE_AUTH } from "./firebase/FirebaseConfig";

// views
import Details from "./app/screens/Details";
import Login from "./app/screens/auth/Login";
import SignUp from "./app/screens/auth/SignUp";
import PasswordReset from "./app/screens/auth/PasswordReset.web";

const Stack = createNativeStackNavigator();
const MenuStack = createNativeStackNavigator();
const AuthStack = createNativeStackNavigator();

function MenuLayout() {
  return (
    // add your own screen here in same format 
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