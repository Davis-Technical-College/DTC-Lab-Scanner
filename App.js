// React and Expo package imports
import { useContext, useState, useEffect } from 'react';
import { SafeAreaView, View, Text, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';

// Project imports
import AuthContextProvider, { AuthContext } from './store/auth-context';
import IconButton from './components/UI/IconButton';

// Main screens imports
import Overview from './screens/Main/Overview';
import Login from './screens/Main/Login';
import ScanCode from './screens/Main/ScanCode';
// Resource data screen imports
import AllResources from './screens/Data/Resources/AllResources';
import ResourceDetails from './screens/Data/Resources/ResourceDetails';
import ManageResource from './screens/Data/Resources/ManageResource';
// User data screen imports
import AllUsers from './screens/Data/Users/AllUsers';
import UserDetails from './screens/Data/Users/UserDetails';
import ResourcesContextProvider from './store/resources-context';

// Create navigators
const AuthStack = createNativeStackNavigator();
const ResStack = createNativeStackNavigator();
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

// Stack navigator for resources
function ResourceStack() {
  return (
    <ResStack.Navigator>
      <ResStack.Screen
        name="AllResources"
        component={AllResources}
        options={({ navigation }) => ({
          title: 'Resources',
          headerLeft: ({ tintColor }) => (
            <>
              <IconButton
                styleOverride={{ marginLeft: -16, marginRight: 16 }}
                icon="menuunfold" size={22} color={tintColor}
                onPress={() => navigation.toggleDrawer()}
              />
            </>
          ),
          headerRight: ({ tintColor }) => (
            <>
              <IconButton
                icon="plus" size={22} color={tintColor}
                onPress={() => navigation.navigate('ManageResource')}
              />
            </>
          ),
        })}
      />
      <ResStack.Screen
        name="ResourceDetails"
        component={ResourceDetails}
        options={{
          title: 'Details',
        }}
      />
      <ResStack.Screen
        name="ManageResource"
        component={ManageResource}
        options={{
          title: 'Add/Update Resource',
        }}
      />
    </ResStack.Navigator>
  );
}

// Drawer navigator
function MainDrawer() {
  const authCtx = useContext(AuthContext);

  return (
    <Drawer.Navigator initialRouteName="Overview" drawerContent={props => {
      return (
        <SafeAreaView style={{ flex: 1 }} forceInset={{ top: 'always', horizontal: 'never' }}>
          <DrawerContentScrollView {...props}>
            <DrawerItem
              // User's name will go here
              label={
                () => <Text style={styles.userText}>{authCtx.username}</Text>
              }
              labelStyle={{
                fontSize: 20,
                fontWeight: 'bold',
              }}
              // Don't change style on press
              pressOpacity={0}
              pressColor={'#ffffff'}
            />
            <DrawerItemList {...props} />
          </DrawerContentScrollView>
          <View>
            <DrawerItem
              // Logout button
              label="Logout"
              icon={({ color, size }) => (
                <AntDesign name="logout" size={size} color={color}/>
              )}
              onPress={() => authCtx.logout()}
            />
          </View>
        </SafeAreaView>
      )
    }}
    screenOptions={({ navigation }) => ({
      headerLeft: ({ tintColor }) => (
        <>
          <IconButton
            icon="menuunfold" size={22} color={tintColor}
            onPress={() => navigation.toggleDrawer()}
          />
        </>
      ),
    })}
    >
      <Drawer.Screen
        name="Overview"
        component={Overview}
        options={{
          drawerIcon: ({ color, size }) => (
            <AntDesign name="home" size={size} color={color} />
          ),
        }}
      />
      {/* Standard user screens */}
      {authCtx.level == 'user' && <Drawer.Screen
        name="ScanCode"
        component={ScanCode}
        options={{
          drawerLabel: 'Scan Code',
          headerTitle: 'Scan to Check Out/In',
          drawerIcon: ({ color, size }) => (
            <AntDesign name="scan1" size={size} color={color} />
          ),
        }}
      />}
      {/* Administrator screens */}
      {authCtx.level == 'admin' && <Drawer.Screen
        name="ResourceStack"
        component={ResourceStack}
        options={{
          drawerLabel: 'Manage Resources',
          headerShown: false,
          drawerIcon: ({ color, size }) => (
            <AntDesign name="book" size={size} color={color} />
          ),
        }}
      />}
      {authCtx.level == 'admin' && <Drawer.Screen
        name="AllUsers"
        component={AllUsers}
        options={{
          title: 'Users',
          drawerLabel: 'View Users',
          drawerIcon: ({ color, size }) => (
            <AntDesign name="user" size={size} color={color} />
          ),
        }}
      />}
    </Drawer.Navigator>
  );
}

// Container for navigation; state is dependent on user level and authentication
function Navigation() {
  const authCtx = useContext(AuthContext);

  return (
    <NavigationContainer>
      {!authCtx.isAuthenticated && <AuthNav />}
      {authCtx.isAuthenticated && <ResourcesContextProvider>
        <MainDrawer />
      </ResourcesContextProvider>}
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
      const storedLevel = await AsyncStorage.getItem('level');
      const storedName = await AsyncStorage.getItem('username');

      if (storedToken, storedLevel, storedName) {
        authCtx.authenticate(storedToken, storedLevel, storedName);
      }

      setIsTryingLogin(false);
    }

    fetchToken();
  }, []);

  // Return splash screen while waiting for login
  if (isTryingLogin) {
    SplashScreen.preventAutoHideAsync();
  }

  SplashScreen.hideAsync();
  return <Navigation />;
}

// Main App export
export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar style="dark" />

      <AuthContextProvider>
        <Root />
      </AuthContextProvider>
    </GestureHandlerRootView>
  );
}

// StyleSheet
const styles = StyleSheet.create({
  userText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
