import { useContext, useState } from 'react';
import { View, Text, Button, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { authorize, refresh, revoke } from 'react-native-app-auth';
import Config from 'react-native-config';

import { AuthContext } from '../../store/auth-context';

const config = {
  clientId: "3bbf6b84-2d32-4341-a6d7-d24b0280bed8",
  redirectUrl: "https://localhost:19000",
  serviceConfiguration: {
    authorizationEndpoint:
      "https://login.microsoftonline.com/common/oauth2/v2.0/authorize",
    tokenEndpoint: "https://login.microsoftonline.com/organizations/oauth2/v2.0/token",
  },
  
  scopes: ["User.Read"],
};


function Login () {
  const authCtx = useContext(AuthContext);
  const [loggingIn, setLoggingIn] = useState(false);
  const [usernameValue, setUsernameValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');

  const loginWithUsernamePassword = async (usernameValue, passwordValue) => {
    try {
      const result = await authorize({
        ...config,
        // Add username and password to the tokenEndpoint params
        tokenEndpointParameters: {
          username: usernameValue,
          password: passwordValue,
        },
        usePKCE: false, // ROPC does not use PKCE
      });
      console.log('Authorization Result:', result);
    } catch (error) {
      console.error('Authorization Error:', error);
    }
  };
  const onLoginSuccess = async () => {
    // Set temp variables for the AuthContext
    let username = '';
    let token = '';
    let userLevel = '';
 
    await Instance.getUserInfo().then(result => {
      // Get name, token, and email address from result
      username = `${result.givenName} ${result.surname}`;
      const email = result.mail;

      // Check whether user is admin or student with RegEx
      const condition = new RegExp('([a-zA-Z\.]+)@davistech.edu');
      userLevel = condition.test(email) ? 'admin' : 'user';

      /* !!! DEBUG CODE !!! */
      if (email == '4800623019@davistech.edu') {
        userLevel = 'admin';
      }
      /* !!! DEBUG CODE !!! */
    }).then(() => {
      // Authenticate with context
      token = Instance.getToken().accessToken;
      authCtx.authenticate(token, userLevel, username);
    }).catch(err => {
      console.log(err);
    });
  }

  // While logging in, return the AzureLoginView
  if (loggingIn) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Please enter your Davis Tech credentials</Text>
        <TextInput style={styles.logInField} placeholder='12340000@davistech.edu' onChangeText={newText => setUsernameValue(newText)}></TextInput>
        <TextInput style={styles.logInField} placeholder='password' secureTextEntry={true} onChangeText={newText => setPasswordValue(newText)}></TextInput>
        <TouchableOpacity style={styles.logInButton} 
        onPress={() => loginWithUsernamePassword(usernameValue, passwordValue)}>
          <Text sstyle={styles.text}>Log In</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // While NOT logging in, return a simple screen with a button
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.text}>
          This app requires a Davis Tech Active Directory Account. To sign in, use your email and password.
          This will be your student ID followed by @davistech.edu. 
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title='Login'
          onPress={() => setLoggingIn(true)}
        />
      </View>
    </View>
  );
}

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    width: '80%',
    marginBottom: 18,
  },
  text: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonContainer: {
    width: '20%',
  },
  logInField: {
    width: '60%',
    height: 40,
    borderWidth: 1,
    fontSize: 20,
    borderRadius: 5,
    padding: 5,
    marginTop: 30
  },
  logInButton: {
    marginTop: 30,
    width: 90,
    borderWidth: 1,
    padding: 10,
    alignItems: 'center',
    borderRadius: 5
  },
});
