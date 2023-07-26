import { Pressable, View, Text, StyleSheet } from 'react-native';

function Button({ children, onPress, color }) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.button, 
        { backgroundColor: color }, 
        pressed && styles.pressed
      ]}
      onPress={onPress}
    >
      <View>
        <Text style={styles.buttonText}>{children}</Text>
      </View>
    </Pressable>
  );
}

export default Button;

const styles = StyleSheet.create({
  button: {
    margin: 8,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    elevation: 2,
    shadowColor: 'black',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  pressed: {
    opacity: 0.7,
  },
  buttonText: {
    textAlign: 'center',
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
