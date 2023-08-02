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
      onPress={onSelect.bind(this, resource)}
    >
      <Image style={styles.image} source={{ uri: resource.imageUri }} />
      <View style={styles.info}>
        <Text style={styles.title}>{resource.name}</Text>
        <Text style={styles.userLabel}>
          Current User: <Text style={styles.light}>{currentUser}</Text>
        </Text>
        <View style={styles.numberContainer}>
          <Text style={styles.number}>
            Alerts: <Text style={alertStyle}>{numAlerts}</Text>
          </Text>
          <Text style={styles.number}>
            Components: <Text style={styles.light}>{numComponents}</Text>
          </Text>
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
    height: 126,
  },
  info: {
    flex: 2,
    justifyContent: 'center',
    marginLeft: 18,
    padding: 12,
  },
  title: {
    marginTop: 12,
    color: '#000000',
    fontWeight: 'bold',
    fontSize: 20,
  },
  userLabel: {
    color: '#000000',
    fontSize: 18,
  },
  light: {
    color: '#777777',
  },
  numberContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  number: {
    flex: 1,
    marginTop: 6,
  },
});
