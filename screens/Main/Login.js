import { useContext } from 'react';
import { View, Button, StyleSheet } from 'react-native';

import { AuthContext } from '../../store/auth-context';
import AzureAuth from '../../util/AzureAuth';

function Login() {
  // Set up context
  const authCtx = useContext(AuthContext);

  // Log in with level passed as parameter
  function testLogin(level) {
    authCtx.authenticate('xoxoxo', level);
  }

  // return (
  //   <View style={styles.container}>
  //     <Button 
  //       title='Sign in as user'
  //       color='#003db6'
  //       onPress={() => testLogin('user')}
  //     />
  //     <Button
  //       title='Sign in as administrator'
  //       color='#770000'
  //       onPress={() => testLogin('admin')}
  //     />
  //   </View>
  // );

  return ( <AzureAuth /> );
}

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
