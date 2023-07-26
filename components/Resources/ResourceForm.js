import { useState } from 'react';
import { View, StyleSheet } from 'react-native';

import Input from '../UI/Input';
import ComponentList from './ComponentList';
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
  });
  // States for the component list modal and the list itself
  const [compsVisible, setCompsVisible] = useState(false);
  const [components, setComponents] = useState([]);

  // Set the state when an input is changed
  function inputChangedHandler(inputIdentifier, enteredValue) {
    setInputs((curInputValues) => {
      return {
        ...curInputValues,
        [inputIdentifier]: { value: enteredValue, isValid: true },
      };
    });
  }

  //
  function updateComponentHandler(components) {
    setComponents(components);
    setCompsVisible(false);
  }

  const formIsInvalid = !inputs.name.isValid || !inputs.description.isValid || 
    !inputs.imageUri.isValid;

  return (
    <View style={styles.form}>
      <Input
        label="Name"
        multiline={false}
        onUpdateValue={inputChangedHandler.bind(this, 'name')}
        value={inputs.name.value}
        isInvalid={!inputs.name.isValid}
      />
      <Input
        label="Description"
        multiline={true}
        onUpdateValue={inputChangedHandler.bind(this, 'description')}
        value={inputs.description.value}
        isInvalid={!inputs.description.isValid}
      />
      <ComponentList
        visible={compsVisible}
        componentList={components}
        onCancel={() => setCompsVisible(false)}
        onUpdate={updateComponentHandler}
      />
      <View style={styles.componentButton}>
        <Button color="#9000ff" onPress={() => setCompsVisible(true)}>
          Update Component List
        </Button>
      </View>
    </View>
  );
}

export default ResourceForm;

const styles = StyleSheet.create({
  errorText: {
    margin: 8,
    textAlign: 'center',
    color: 'darkred',
  },
  componentButton: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 12,
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
});
