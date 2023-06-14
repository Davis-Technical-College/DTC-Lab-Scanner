import { useContext } from 'react';
import { View, Button, StyleSheet } from 'react-native';

import { AuthContext } from '../../store/auth-context';

function Login() {
  // Set up context
  const authCtx = useContext(AuthContext);

  // Log in as user
  function userLogin() {
    authCtx.authenticate('xoxoxo', 'user');
  }

  return (
    <View style={styles.container}>
      <Button 
        title='Sign in as user'
        color='#003db6'
        onPress={userLogin}
      />
      <Button
        title='Sign in as administrator'
        color='#770000'
      />
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
});
