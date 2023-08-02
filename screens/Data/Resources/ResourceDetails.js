import { useEffect } from 'react';
import { ScrollView, Image, View, Text, StyleSheet } from 'react-native';

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
    fontWeight: 'bold',
  },
});
