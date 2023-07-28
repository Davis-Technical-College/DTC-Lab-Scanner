import { useState, useEffect, useRef } from 'react';
import { Modal, View, FlatList, StyleSheet } from 'react-native';

import ListItem from './ListItem';
import Button from '../UI/Button';

function ComponentList({ visible, componentList, onCancel, onUpdate }) {
  // State for the components list
  const [components, setComponents] = useState(componentList);

  // Ref for the components FlatList
  const flatlistRef = useRef(null);

  // Set local components state upon switching to the modal
  useEffect(() => {
    setComponents(componentList);
  }, [visible, componentList]);
  // Scroll to the bottom when a new item is added
  useEffect(() => {
    flatlistRef.current?.scrollToEnd();
  }, [components, flatlistRef]);

  // Functions for handling the component list
  const addComponent = () => {
    const newId = components.length + 1;
    const newComp = { id: newId, text: '' };

    setComponents(currComps => [...currComps, newComp]);
  }
  const editComponent = (enteredText, position) => {
    const filteredData = components.filter(item => item.id !== position);
    const editedComponent = { id: position, text: enteredText };
    const newData = [ ...filteredData, editedComponent ]
      .sort((a, b) => a.id - b.id);

    setComponents(newData);
  }
  const moveComponent = (direction, position) => {
    // Create index variable (array-friendly)
    const index = position - 1;
    // Retrieve text from items that will be swapped
    const selectedText = components[index].text;
    const swappedText = components[index + direction].text;
    // Filter out the items that will be swapped
    const filteredData = components.filter(
      item => (item.id !== position && item.id !== position + direction)
    );

    // Create new (swapped) items to be put back into the components list
    const newSelectedComp = { id: position + direction, text: selectedText };
    const newSwappedComp = { id: position, text: swappedText };
    // Add new items to filtered component list
    const newDataTemp = [ ...filteredData, newSelectedComp ];
    const newData = [ ...newDataTemp, newSwappedComp ]
      .sort((a, b) => a.id - b.id);

    // Update state with new data
    setComponents(newData);
  }
  const deleteComponent = (position) => {
    const filteredData = components.filter(item => item.id !== position);
    const newData = [];

    for (let i = 0; i < filteredData.length; i++) {
      newData.push({ id: i + 1, text: filteredData[i].text });
    }

    setComponents(newData);
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
          ref={flatlistRef}
          data={components}
          keyExtractor={(item) => item.id}
          renderItem={renderComponent}
          removeClippedSubviews={false}
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
    flex: 5,
    marginTop: 12,
    marginBottom: 12,
  },
  buttonContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  twoButtonContainer: {
    flexDirection: 'row',
  },
});
