import { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import Input from '../UI/Input';
import Button from '../UI/Button';

function ResourceForm({ defaultValues, submitButtonLabel, onCancel, onSubmit }) {

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
