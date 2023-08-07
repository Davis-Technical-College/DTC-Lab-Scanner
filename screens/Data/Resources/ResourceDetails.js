import { useEffect } from 'react';
import {
  ScrollView,
  Image,
  View,
  Text,
  StyleSheet,
} from 'react-native';

function ResourceDetails({ route, navigation }) {
  // Get route params
  const resource = route.params.resource;

  // Set title based on resource name
  useEffect(() => {
    navigation.setOptions({
      title: resource.name,
    });
  }, []);

  return (
    <ScrollView>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{ uri: resource.imageUri }} />
      </View>

      <View style={styles.detailsContainer}>
        <Text style={styles.details}>
          <Text style={styles.detailsBold}>Description: </Text>
          {resource.description}
        </Text>
        <Text style={styles.details}>
          <Text style={styles.detailsBold}>Current User: </Text>
          {!!resource.currentUser ? resource.currentUser : 'None'}
        </Text>
      </View>
      <View style={styles.listContainer}>
        <Text style={styles.header}>Components</Text>
        {resource.components.map((comp) => {
          return (
            <View style={styles.component} key={comp.id}>
              <Text style={styles.detailsBold}>{comp.id}</Text>
              <Text style={styles.details}>{comp.text}</Text>
            </View>
          );
        })}
      </View>
      <View style={styles.listContainer}>
        <Text style={styles.header}>Alerts</Text>
        {
          !!resource.alerts && resource.alerts > 0 ? 
          resource.alerts.map((alert) => {
            return (
              <Text style={styles.details}>{alert}</Text>
            );
          }) :
          <Text style={styles.details}>
            There are no alerts at this time.
          </Text>
        }
      </View>
    </ScrollView>
  );
}

export default ResourceDetails;

const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 50,
  },
  image: {
    width: '80%',
    height: '80%',
    minHeight: 330,
  },
  detailsContainer: {
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  details: {
    marginHorizontal: 30,
    color: '#000000',
    textAlign: 'left',
    fontSize: 18,
  },
  detailsBold: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  listContainer: {
    justifyContent: 'center',
    marginVertical: 24,
    paddingHorizontal: 48,
  },
  header: {
    marginBottom: 4,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
  },
  component: {
    flexDirection: 'row',
  },
});
