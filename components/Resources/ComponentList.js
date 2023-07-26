import { useState } from 'react';
import { Modal, View, FlatList, StyleSheet } from 'react-native';

import ListItem from './ListItem';
import Button from '../UI/Button';

function ComponentList({ visible, componentList, onCancel, onUpdate }) {
  // State for the components list
  const [components, setComponents] = useState(componentList);

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
    <Modal visible={visible} animationType="slide">
      <View style={styles.listContainer}>
        <FlatList
          data={components}
          keyExtractor={(item) => item.id}
          renderItem={renderComponent}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button color="#9000ff" onPress={addComponent}>Add New Component</Button>
        <View style={styles.twoButtonContainer}>
          <Button color="#9000ff" onPress={onCancel}>Cancel</Button>
          <Button color="#9000ff" onPress={() => onUpdate(components)}>Update</Button>
        </View>
      </View>
    </Modal>
  );
}

export default ComponentList;

const styles = StyleSheet.create({
  listContainer: {
    flex: 4,
  },
  buttonContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  twoButtonContainer: {
    flexDirection: 'row',
  },
});