import { Pressable, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

function IconButton({ icon, size, color, onPress }) {
  return (
    <Pressable
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
      onPress={onPress}
    >
      <AntDesign name={icon} size={size} color={color} />
    </Pressable>
  );
}

export default IconButton;

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
  pressed: {
    opacity: 0.7,
  },
});
