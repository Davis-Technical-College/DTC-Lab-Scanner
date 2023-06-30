import { useContext } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { authorize } from 'react-native-app-auth';

import { AuthContext } from '../../store/auth-context';

const config = {
  issuer: 'https://login.microsoftonline.com/f9a4f5d0-300d-4aea-b514-f1c20d244fac',
  clientId: '3bbf6b84-2d32-4341-a6d7-d24b0280bed8',
  clientSecret: 'dt68Q~6YsImCMuIQZ12iLgiLPDXabxYWwMF~Sbxc',
  redirectUrl: 'https://login.microsoftonline.com/common/oauth2/nativeclient',
  scopes: ['User.Read'],
};

// Secret: dt68Q~6YsImCMuIQZ12iLgiLPDXabxYWwMF~Sbxc

function Login () {
  const authCtx = useContext(AuthContext);

  async function azureLogin() {
    try {
      const result = await authorize(config);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
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
          onPress={azureLogin}
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
