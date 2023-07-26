import { useState } from 'react';
import { Alert, ScrollView, Text, FlatList, StyleSheet } from 'react-native';

import Input from '../UI/Input';
import ListItem from './ListItem';
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

  const formIsInvalid = !inputs.name.isValid || !inputs.description.isValid || 
    !inputs.imageUri.isValid || !inputs.components.isValid;

  // Functions for handling the component list
  const addComponent = () => {
    const newId = inputs.components.value.length;
    const newComponent = { id: newId, text: '' };
    const newData = { ...inputs.components.value, newComponent }

    inputChangedHandler('components', newData);
  }
  const editComponent = (enteredText, position) => {
    const filteredData = inputs.components.value.filter(item => item.id !== position);
    const editedComponent = { id: position, text: enteredText };
    const newData = { ...filteredData, editedComponent };

    inputChangedHandler('components', newData);
  }
  const moveComponent = (direction) => {

  }
  const deleteComponent = () => {

  }
  const renderComponent = ({ item }) => {
    return (
      <ListItem
        position={item.id} max={inputs.components.value.length} text={item.text}
        onEdit={editComponent} onMove={moveComponent} onDelete={deleteComponent}
      />
    );
  }

  return (
    <ScrollView style={styles.form}>
      <Text style={styles.title}>Resource</Text>
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
      <FlatList
        data={inputs.components.value}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderComponent}
        ItemSeparatorComponent={
          <View style={styles.separator} />
        }
      />
      <Button
        color="#9000ff"
        onPress={addComponent}
      >
        Add Component
      </Button>
    </ScrollView>
  );
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
  errorText: {
    margin: 8,
    textAlign: 'center',
    color: 'darkred',
  },
  separator: {
    width: '90%',
    height: 2,
    backgroundColor: '#5b5b5b',
  },
  buttons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
});
