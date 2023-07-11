import { Pressable, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

function IconButton({ styleOverride, icon, size, color, onPress }) {
  return (
    <Pressable
      style={({ pressed }) => [styles.button, styleOverride, pressed && styles.pressed]}
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
    padding: 12,
  },
  pressed: {
    opacity: 0.7,
  },
});
