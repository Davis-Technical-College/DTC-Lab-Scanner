import { useState } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import ImageCropPicker from 'react-native-image-crop-picker';

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

  // States for the modal visibility and the components list
  const [compsVisible, setCompsVisible] = useState(false);
  const [components, setComponents] = useState([]);
  const [takenImage, setTakenImage] = useState(null);

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
    ImageCropPicker.openCamera({
      width: 300,
      height: 300,
      cropping: true,
    }).then(image => {
      setTakenImage(image);
    }).catch(err => {
      console.log(err);
      setTakenImage(null);
    });
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

      <View style={styles.imagePreview}>
        {takenImage && <Image
          style={{ width: 300, height: 300 }}
          resizeMode='stretch'
          source={{ uri: takenImage.path }}
        />}
      </View>
      <View style={styles.button}>
        <Button color="#9000ff" onPress={cameraActivateHandler}>
          Take Photo
        </Button>
      </View>

      <ComponentList
        visible={compsVisible}
        componentList={components}
        onCancel={() => setCompsVisible(false)}
        onUpdate={updateComponentHandler}
      />
      <View style={styles.button}>
        <Button color="#9000ff" onPress={() => setCompsVisible(true)}>
          Update Component List
        </Button>
      </View>

      <View style={styles.buttons}>
        <View style={styles.button}>
          <Button color="#9b0000" onPress={onCancel}>
            Cancel
          </Button>
        </View>
        <View style={styles.button}>
          <Button color="#009b00" onPress={submitHandler}>
            {submitButtonLabel}
          </Button>
        </View>
      </View>
    </View>
  );
}

export default ResourceForm;

const styles = StyleSheet.create({
  form: {
    alignItems: 'center',
  },
  errorText: {
    margin: 8,
    textAlign: 'center',
    color: 'darkred',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 12,
  },
  imagePreview: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    width: 304,
    height: 304,
    marginVertical: 12,
    borderWidth: 2,
    borderColor: '#13007c',
  },
  buttons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
