// React and Expo package imports
import { useContext, useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import AppLoading from 'expo-app-loading';

// Project imports
import AuthContextProvider, { AuthContext } from './store/auth-context';

// Main screens imports
import Overview from './screens/Main/Overview';
import Login from './screens/Main/Login';
import ScanCode from './screens/Main/ScanCode';
// Resource data screen imports
import AllResources from './screens/Data/Resources/AllResources';
import ResourceDetails from './screens/Data/Resources/ResourceDetails';
import AddResource from './screens/Data/Resources/AddResource';
// User data screen imports
import AllUsers from './screens/Data/Users/AllUsers';
import UserDetails from './screens/Data/Users/UserDetails';

// Create navigators
const AuthStack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

// User authentication navigator
function AuthNav() {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false,
        }}
      />
    </AuthStack.Navigator>
  );
}

// Standard user drawer navigator
function UserDrawer() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name="Overview"
        component={Overview}
        options={{
          drawerIcon: ({ color, size }) => (
            <AntDesign name="home" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="ScanCode"
        component={ScanCode}
        options={{
          drawerLabel: 'Scan Code',
          headerTitle: 'Scan to Check Out/In',
          drawerIcon: ({ color, size }) => (
            <AntDesign name="scan1" size={size} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

// Administrator drawer navigator


// Container for navigation; state is dependent on user level and authentication
function Navigation() {
  const authCtx = useContext(AuthContext);

  return (
    <NavigationContainer>
      {!authCtx.isAuthenticated && <AuthNav />}
      {authCtx.isAuthenticated && <UserDrawer />}
    </NavigationContainer>
  );
}

// Root function to handle the stored token and loading screen
function Root() {
  const [isTryingLogin, setIsTryingLogin] = useState(true);
  const authCtx = useContext(AuthContext);

  // Fetch the token for login
  useEffect(() => {
    async function fetchToken() {
      const storedToken = await AsyncStorage.getItem('token');

      if (storedToken) {
        authCtx.authenticate(storedToken);
      }

      setIsTryingLogin(false);
    }
  }, []);

  // Return AppLoading screen while waiting for login
  if (isTryingLogin) {
    return <AppLoading />;
  }

  return <Navigation />;
}

// Main App export
export default function App() {
  return (
    <>
      <StatusBar style="light" />

      <AuthContextProvider>
        <Root />
      </AuthContextProvider>
    </>
  );
}
