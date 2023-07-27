import { useState } from 'react';
import { View, StyleSheet } from 'react-native';

import Input from '../UI/Input';
import ComponentList from './ComponentList';
import Button from '../UI/Button';
import ResourceCamera from './ResourceCamera';

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

  // States for the modal visibility and the components list
  const [compsVisible, setCompsVisible] = useState(false);
  const [components, setComponents] = useState([]);
  const [camVisible, setCamVisible] = useState(false);
  const [camActive, setCamActive] = useState(false);

  // Set the state when an input is changed
  function inputChangedHandler(inputIdentifier, enteredValue) {
    setInputs((curInputValues) => {
      return {
        ...curInputValues,
        [inputIdentifier]: { value: enteredValue, isValid: true },
      };
    });
  }

  // Update the component state when the update button is pressed within the modal
  function updateComponentHandler(newComponents) {
    setComponents(newComponents);
    setCompsVisible(false);
  }

  // Activate the camera modal and component
  function cameraActivateHandler() {
    setCamVisible(true);
    setCamActive(true);
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
      <View style={styles.imagePreview}>

      </View>
      <ResourceCamera visible={camVisible} active={camActive} />
      <View style={styles.cameraButton}>
        <Button color="#9000ff" onPress={cameraActivateHandler}>
          Take Photo
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
  imagePreview: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    width: 300,
    height: 300,
    marginVertical: 12,
    borderWidth: 2,
    borderColor: '#13007c',
  },
  cameraButton: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 12,
  },
});
