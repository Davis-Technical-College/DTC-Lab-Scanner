import { useContext, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { AzureInstance, AzureLoginView } from '@shedaltd/react-native-azure-ad-2';
import Config from 'react-native-config';

import { AuthContext } from '../../store/auth-context';

const id = Config.CLIENT_ID;
const secret = Config.CLIENT_SECRET;

const CREDENTIALS = {
  client_id: id,
  client_secret: secret,
  redirect_uri: 'https://localhost:3000',
  scope: 'User.Read',
};

// Secret: dt68Q~6YsImCMuIQZ12iLgiLPDXabxYWwMF~Sbxc

const Instance = new AzureInstance(CREDENTIALS);

function Login () {
  const authCtx = useContext(AuthContext);
  const [loggingIn, setLoggingIn] = useState(false);

  function onLoginSuccess() {
    let username = '';
    let token = '';
    let userLevel = '';

    Instance.getUserInfo().then(result => {
      // Get name, token, and email address from result
      username = `${result.givenName} ${result.surname}`;
      const email = result.mail;

      // Check whether user is admin or student with RegEx
      const condition = new RegExp('([a-zA-Z\.]+)@davistech.edu');
      userLevel = condition.test(email) ? 'admin' : 'user';
    }).then(() => {
      // Authenticate with context
      token = Instance.getToken().accessToken;
      authCtx.authenticate(token, userLevel, username);
    }).catch(err => {
      console.log(err);
    });
  }

  function onLoginCancel() {
    console.log('Cancelled');
  }

  if (loggingIn) {
    return (
      <AzureLoginView
        azureInstance={Instance}
        loadingMessage="Requesting access token"
        onSuccess={onLoginSuccess}
        onCancel={onLoginCancel}
        onFailure={() => console.log('Login failed')}
      />
    );
  }

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
