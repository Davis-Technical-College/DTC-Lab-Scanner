import { createContext, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Create the base for the context
export const AuthContext = createContext({
  token: '',
  level: '',
  isAuthenticated: false,
  authenticate: (token) => {},
  logout: () => {},
});

// Establish the provider for the context
function AuthContextProvider({ children }) {
  // Use a state for the auth token and user level
  const [authToken, setAuthToken] = useState();
  const [userLevel, setUserLevel] = useState();

  // When logging in, set the token and level states
  function authenticate(token, level) {
    setAuthToken(token);
    setUserLevel(level);
    AsyncStorage.setItem('token', token);
    AsyncStorage.setItem('level', level);
  }

  // When logging out, void the token and level states
  function logout() {
    setAuthToken(null);
    setUserLevel(null);
    AsyncStorage.removeItem('token');
    AsyncStorage.removeItem('level');
  }

  // Set up value for context using the variables and functions created above
  const value = {
    token: authToken,
    level: userLevel,
    isAuthenticated: !!authToken,
    authenticate: authenticate,
    logout: logout,
  }

  // Return the completed context provider
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthContextProvider;
