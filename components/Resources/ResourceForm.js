import { useState } from 'react';
import { ScrollView, View, Text, FlatList, StyleSheet } from 'react-native';

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
  });
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

  const formIsInvalid = !inputs.name.isValid || !inputs.description.isValid || 
    !inputs.imageUri.isValid;

  // Functions for handling the component list
  const addComponent = () => {
    const newId = components.length + 1;
    const newComp = { id: newId, text: '' };

    setComponents(currComps => [...currComps, newComp]);
  }
  const editComponent = (enteredText, position) => {
    const filteredData = components.filter(item => item.id !== position);
    const editedComponent = { id: position, text: enteredText };
    const newData = [ ...filteredData, editedComponent ].sort((a, b) => a.id - b.id);

    setComponents(newData);
  }
  const moveComponent = (direction) => {

  }
  const deleteComponent = () => {

  }
  const renderComponent = ({ item }) => {
    return (
      <ListItem
        position={item.id} max={components.length} text={item.text}
        onEdit={editComponent} onMove={moveComponent} onDelete={deleteComponent}
      />
    );
  }

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
      <FlatList
        style={styles.componentList}
        data={components}
        keyExtractor={(item) => item.id}
        renderItem={renderComponent}
      />
      <Button
        color="#9000ff"
        onPress={addComponent}
      >
        Add Component
      </Button>
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
  buttons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
  componentList: {
    marginBottom: 12,
  },
});
