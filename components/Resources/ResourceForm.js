import { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import Input from '../UI/Input';
import Button from '../UI/Button';

function ResourceForm({ defaultValues, submitButtonLabel, onCancel, onSubmit }) {
  // Create state for inputs
  const [inputs, setInputs] = useState({
    name: {
      value: defaultValues ? defaultValues.name : '',
      isValid: true,
    },
    description: {
      value: defaultValues ? defaultValues.description : '',
      isValid: true,
    },
    imageUri: {
      value: defaultValues ? defaultValues.imageUri : '',
      isValid: true,
    },
    components: {
      value: defaultValues ? defaultValues.components : [],
      isValid: true,
    },
  });

  // Set the state when an input is changed
  function inputChangedHandler(inputIdentifier, enteredValue) {
    setInputs((curInputValues) => {
      return {
        ...curInputValues,
        [inputIdentifier]: { value: enteredValue, isValid: true },
      };
    });
  }
}

export default ResourceForm;

const styles = StyleSheet.create({
  form: {
    marginTop: 40,
  },
  title: {
    marginVertical: 24,
    textAlign: 'center',
    color: 'black',
    fontWeight: 'bold',
    fontSize: 24,
  },
  inputsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowInput: {
    flex: 1,
  },
  errorText: {
    margin: 8,
    textAlign: 'center',
    color: 'darkred',
  },
  buttons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  }
});
