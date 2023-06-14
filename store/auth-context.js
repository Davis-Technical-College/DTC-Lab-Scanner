import { createContext, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Create the base for the context
export const AuthContext = createContext({
  token: '',
  isAuthenticated: false,
  authenticate: (token) => {},
  logout: () => {},
});

// Establish the provider for the context
function AuthContextProvider({ children }) {
  // Use a state for the auth token
  const [authToken, setAuthToken] = useState();

  // When logging in, set the token state
  function authenticate(token) {
    setAuthToken(token);
    AsyncStorage.setItem('token', token);
  }

  // When logging out, void the token state
  function logout() {
    setAuthToken(null);
    AsyncStorage.removeItem('token');
  }

  // Set up value for context using the variables and functions created above
  const value = {
    token: authToken,
    isAuthenticated: !!authToken,
    authenticate: authenticate,
    logout: logout,
  }

  // Return the completed context provider
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthContextProvider;
