import { View, Text, TextInput, StyleSheet } from 'react-native';

import IconButton from '../UI/IconButton';

function ListItem({ position, max, text, onEdit, onMove, onDelete }) {
  // Connect ListItem buttons to functions from ComponentList
  const updateComponentHandler = (enteredText) => {
    onEdit(enteredText, position);
  }
  const moveComponentHandler = (direction) => {
    onMove(direction, position);
  }
  const deleteComponentHandler = () => {
    onDelete(position);
  }

  return (
    <View style={styles.item}>
      <View style={styles.numberContainer}>
        <Text style={styles.number}>{position}</Text>
      </View>
      <TextInput 
        style={styles.input}
        value={text}
        onChangeText={updateComponentHandler}
      />

      {/* Move component up ONLY if not already on top */}
      {position > 1 ? <IconButton
        icon="up" size={24} color="#000000"
        onPress={() => moveComponentHandler(-1)}
      /> : <IconButton
        icon="up" size={24} color="#dadada"
      />}

      {/* Move component down ONLY if not already on bottom */}
      {position < max ? <IconButton
        icon="down" size={24} color="#000000"
        onPress={() => moveComponentHandler(1)}
      /> : <IconButton
        icon="down" size={24} color="#dadada"
      />}

      <IconButton 
        icon="delete" size={24} color="#000000"
        onPress={deleteComponentHandler}
      />
    </View>
  );
}

export default ListItem;

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    marginVertical: 6,
  },
  numberContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '10%',
  },
  number: {
    color: '#5b5b5b',
    textAlignVertical: 'center',
    fontSize: 18,
  },
  input: {
    width: '50%',
    marginLeft: 8,
    borderBottomWidth: 2,
    borderColor: '#007cbf',
  },
});
