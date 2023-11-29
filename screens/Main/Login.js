import { useContext, useState } from 'react';
import { View, Text, Button, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { AuthContext } from '../../store/auth-context';



function Login() {
  const [loggingIn, setLoggingIn] = useState(false);
  const [usernameValue, setUsernameValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [authToken, setAuthToken] = useState(null)
  const { authenticate } = useContext(AuthContext);

  const loginWithUsernamePassword = async (usernameValue, passwordValue) => {
    const tenantId = "f9a4f5d0-300d-4aea-b514-f1c20d244fac";
    const clientId = "3bbf6b84-2d32-4341-a6d7-d24b0280bed8";
    const clientSecret = "dt68Q~6YsImCMuIQZ12iLgiLPDXabxYWwMF~Sbxc";

    const getToken = async () => {
      const url = `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`;
      const params = new URLSearchParams();

      params.append('grant_type', 'password');
      params.append('client_id', clientId);
      params.append('client_secret', clientSecret);
      params.append('scope', `${clientId}/.default`);
      params.append('username', usernameValue);
      params.append('password', passwordValue);

      console.log(params)
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: params
      });

      const data = await response.json();
      console.log(data)
      return data.access_token;
    };
    setAuthToken(await getToken());
    if (authToken != null) {
      onLoginSuccess()
    } else {
      console.log('You have an auth error');
    }

  }
  const onLoginSuccess = async () => {
    // Set temp variables for the AuthContext
    let userLevel = 'student'
    // Check whether user is admin or student with RegEx
    const condition = new RegExp('([a-zA-Z\.]+)@davistech.edu');
    userLevel = condition.test(usernameValue) ? 'admin' : 'user';
    /* !!! DEBUG CODE !!! */
    if (username == '4800623019@davistech.edu') {
      userLevel = 'admin';
    }
    //update auth context with userLevel, AuthToken, and username
    const username = usernameValue
    authenticate(authToken, userLevel, username)

  }
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
          This will be your student ID followed by @davistech.edu .
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

