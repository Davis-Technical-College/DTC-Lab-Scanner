import { View, Text, StyleSheet } from 'react-native';

function ErrorOverlay({ message }) {
  return (
    <View style={styles.container}>
      <Text style={[styles.text, styles.title]}>An error occurred!</Text>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
}

export default ErrorOverlay;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    padding: 24,
  },
  text: {
    marginBottom: 8,
    color: 'gray',
    textAlign: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
  },
});
