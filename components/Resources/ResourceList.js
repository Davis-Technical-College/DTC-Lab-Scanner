import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import ResourceItem from './ResourceItem';

function ResourceList({ resources }) {
  const navigation = useNavigation();

  // Navigate to the ResourceDetails screen when a resource is pressed
  function selectResourceHandler(id) {
    navigation.navigate('ResourceDetails', {
      resourceId: id
    });
  }

  // View fallback text when the list of resources is empty or unloaded
  if (!resources || resources.length === 0) {
    return (
      <View style={styles.fallbackContainer}>
        <Text style={styles.fallbackText}>
          No resources have been added yet. Press '+' to add one.
        </Text>
      </View>
    );
  }

  // If there are items in the list of resources, return a FlatList
  return (
    <FlatList
      data={resources}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => 
        <ResourceItem resource={item} onSelect={selectResourceHandler} />
      }
      ItemSeparatorComponent={() => <View style={styles.separator} />}
    />
  );
}

export default ResourceList;

const styles = StyleSheet.create({
  fallbackContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fallbackText: {
    color: '#000000',
    fontSize: 16,
  },
  separator: {
    backgroundColor: '#5c5c5c',
    width: '100%',
    height: 1,
  },
});
