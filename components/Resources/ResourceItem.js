import { Pressable, Image, View, Text, StyleSheet } from 'react-native';

function ResourceItem({ resource, onSelect }) {
  // Set temporary variables for easier view
  const currentUser = !!resource.currentUser ? resource.currentUser : 'None';
  const numAlerts = !!resource.alerts ? resource.alerts.length : 0;
  const numComponents = resource.components.length;
  const alertStyle = numAlerts > 0 ? { color: '#9b0000' } : { color: '#009b00'};

  return (
    <Pressable
      style={({ pressed }) => [styles.item, pressed && styles.pressed]}
      onPress={onSelect.bind(this, resource.id)}
    >
      <Image style={styles.image} source={{ uri: resource.imageUri }} />
      <View style={styles.info}>
        <Text style={styles.title}>{resource.name}</Text>
        <Text style={styles.userLabel}>
          Current User: <Text style={styles.user}>{currentUser}</Text>
        </Text>
        <View style={styles.numberContainer}>
          <Text style={styles.number}>
            Alerts: <Text style={alertStyle}>{numAlerts}</Text>
          </Text>
          <Text style={styles.number}>Components: {numComponents}</Text>
        </View>
      </View>
    </Pressable>
  );
}

export default ResourceItem;

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    alignItems: 'flex-start',
    elevation: 2,
    shadowColor: '#000000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 1, height: 1 },
    shadowRadius: 2,
  },
  pressed: {
    opacity: 0.9,
  },
  image: {
    flex: 1,
    height: 120,
  },
  info: {
    flex: 2,
    padding: 12,
  },
  title: {
    color: '#000000',
    fontWeight: 'bold',
    fontSize: 20,
  },
  user: {
    color: '#000000',
    fontSize: 18,
  },
  numberContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  number: {
    flex: 1,
    padding: 12,
  },
});
