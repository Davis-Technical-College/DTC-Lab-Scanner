import { useContext, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
// import { AzureInstance, AzureLoginView } from '@shedaltd/react-native-azure-ad-2';
import Config from 'react-native-config';

import { AuthContext } from '../../store/auth-context';

// Get client ID and secret from .env file
const id = Config.CLIENT_ID;
const secret = Config.CLIENT_SECRET;

// Set up credentials object for AzureInstance
const CREDENTIALS = {
  client_id: id,
  client_secret: secret,
  redirect_uri: 'https://localhost:3000',
  scope: 'User.Read',
};
// Create new AzureInstance using credentials
// const Instance = new AzureInstance(CREDENTIALS);

function Login () {
  const authCtx = useContext(AuthContext);
  const [loggingIn, setLoggingIn] = useState(false);

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
      <AzureLoginView
        azureInstance={Instance}
        loadingMessage="Requesting access token"
        onSuccess={onLoginSuccess}
        onCancel={() => console.log('Cancelled')}
        onFailure={() => console.log('Login failed')}
      />
    );
  }

  // While NOT logging in, return a simple screen with a button
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.text}>
          This apps requires a Microsoft account with Davis Technical College.
          If you do not have one or forgot your login information, please contact an administrator.
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
});
