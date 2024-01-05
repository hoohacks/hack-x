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
import Application from "./app/screens/Application";

const Stack = createNativeStackNavigator();
const MenuStack = createNativeStackNavigator();
const AuthStack = createNativeStackNavigator();

function MenuLayout() {
  return (
    // add your own screen here in same format 
    <MenuStack.Navigator
      initialRouteName="detail"
    >
      <MenuStack.Screen 
        name="detail" 
        component={Details} 
        options={{ 
          headerShown:false, 
          title: "HooHacks - Details"
        }}
      />
      <MenuStack.Screen
        name="application"
        component={Application}
        options={{ 
          headerShown:false, 
          title: "HooHacks - Application"
        }}
      />
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
          title: "HooHacks - Sign Up"
        }}
      />
      <AuthStack.Screen 
        name="login" 
        component={Login} 
        options={{ 
          headerShown:false, 
          title: "HooHacks - Login"
        }}
      />
      <AuthStack.Screen
        name="reset-password"
        component={PasswordReset}
        options={{
          headerShown:false, 
          title: "HooHacks - Password Reset"
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
        Application: '/application',
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