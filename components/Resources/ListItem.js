import { View, Text, StyleSheet } from 'react-native';

import { IconButton } from '../UI/IconButton';

function ListItem({ position, max, text, onEdit, onMove, onDelete }) {
  return (
    <View style={styles.item}>
      <Text style={styles.number}>{position}</Text>
      <Text style={styles.text}>{text}</Text>
      <IconButton icon="form" size={24} color="black" onPress={onEdit} />
      {position > 0 && 
        <IconButton icon="up" size={24} color="black" onPress={onMove.bind(1)} />}
      {position < max && 
        <IconButton icon="down" size={24} color="black" onPress={onMove.bind(-1)} />}
      <IconButton icon="delete" size={24} color="black" onPress={onDelete} />
    </View>
  );
}

export default ListItem;

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
  },
  number: {
    color: '#5b5b5b',
    fontSize: 18,
  },
});
