import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { AntDesign } from '@expo/vector-icons';

// Main screens
import Overview from './screens/Main/Overview';
import Login from './screens/Main/Login';
import ScanCode from './screens/Main/ScanCode';
// Resource data screens
import AllResources from './screens/Data/Resources/AllResources';
import ResourceDetails from './screens/Data/Resources/ResourceDetails';
import AddResource from './screens/Data/Resources/AddResource';
// User data screens
import AllUsers from './screens/Data/Users/AllUsers';
import UserDetails from './screens/Data/Users/UserDetails';

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
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
    </NavigationContainer>
  );
}
