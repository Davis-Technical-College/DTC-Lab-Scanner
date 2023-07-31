import { utils } from '@react-native-firebase/app';
import storage from '@react-native-firebase/storage';

// Upload an image with the given uri to Firebase cloud storage
export async function uploadImage(imageUri) {
  // Get filename from path
  const splitUri = imageUri.split('/');
  const filename = splitUri[splitUri.length - 1];

  // Create storage reference for image
  const reference = storage().ref(`images/labkits/${filename}`);
  // Upload file to reference point in storage
  await reference.putFile(imageUri);

  // Return the path to the file in the cloud
  return `images/labkits/${filename}`;
}
