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
  const downloadUrl = await getDownloadUrl('labkits/' + filename);
  return downloadUrl;
}

// Retrieve an image URL for display
export async function getDownloadUrl(imageUri) {
  let downloadUrl = '';
  await storage().ref('/images/' + imageUri).getDownloadURL()
  .then((url) => {
    downloadUrl = url;
  })
  .catch((e) => console.log('Errors while downloading => ', e));

  return downloadUrl;
}
