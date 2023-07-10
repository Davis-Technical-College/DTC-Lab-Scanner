import { View, Text, TextInput, StyleSheet } from 'react-native';

function Input({ label, keyboardType, secure, onUpdateValue, value, isInvalid }) {
  return (
    <View style={styles.inputContainer}>
      <Text style={[ styles.label, isInvalid && styles.labelInvalid ]}>
        {label}
      </Text>
      <TextInput
        style={[ styles.input, isInvalid && styles.labelInvalid ]}
        autoCapitalize="none"
        keyboardType={keyboardType}
        secureTextEntry={secure}
        onChangeText={onUpdateValue}
        value={value}
      />
    </View>
  );
}

export default Input;

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 8,
  },
  label: {
    color: '#000000',
  },
  labelInvalid: {
    color: '#540000'
  },
  input: {
    paddingVertical: 8,
    paddingHorizontal: 6,
    backgroundColor: '#ffffff',
    borderRadius: 4,
    fontSize: 16,
  },
  inputInvalid: {
    backgroundColor: '#ffc6c6',
  },
});
