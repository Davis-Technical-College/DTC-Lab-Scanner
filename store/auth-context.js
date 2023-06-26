import { createContext, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Create the base for the context
export const AuthContext = createContext({
  token: '',
  level: '',
  username: '',
  isAuthenticated: false,
  authenticate: ( token, level, username ) => {},
  logout: () => {},
});

// Establish the provider for the context
function AuthContextProvider({ children }) {
  // Use a state for the auth token and user level
  const [authToken, setAuthToken] = useState();
  const [userLevel, setUserLevel] = useState();
  const [userName, setUserName] = useState();

  // When logging in, set the token and level states
  function authenticate(token, level, username) {
    setAuthToken(token);
    setUserLevel(level);
    setUserName(username);
    AsyncStorage.setItem('token', token);
    AsyncStorage.setItem('level', level);
    AsyncStorage.setItem('username', username);
  }

  // When logging out, void the token and level states
  function logout() {
    setAuthToken(null);
    setUserLevel(null);
    setUserName(null);
    AsyncStorage.removeItem('token');
    AsyncStorage.removeItem('level');
    AsyncStorage.removeItem('username');
  }

  // Set up value for context using the variables and functions created above
  const value = {
    token: authToken,
    level: userLevel,
    username: userName,
    isAuthenticated: !!authToken,
    authenticate: authenticate,
    logout: logout,
  }

  // Return the completed context provider
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthContextProvider;
