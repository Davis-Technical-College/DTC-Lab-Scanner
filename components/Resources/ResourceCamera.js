import { useState, useRef } from 'react';
import { Modal, View, Pressable, StyleSheet } from 'react-native';
import { Camera, useCameraDevices } from 'react-native-vision-camera';

import LoadingOverlay from '../UI/LoadingOverlay';

function ResourceCamera({ visible, active }) {
  // Create state for camera permissions
  const [cameraPermission, setCameraPermission] = useState('');

  // Set up camera device
  const devices = useCameraDevices();
  const device = devices.back;
  const camera = useRef(null);

  // Check for permissions, get them if not available
  async function getCameraPermissions() {
    const permission = await Camera.getCameraPermissionStatus();

    if (permission !== 'authorized') {
      const newPermission = await Camera.requestCameraPermission();
      setCameraPermission(newPermission);
      return;
    }

    setCameraPermission(permission);
    return;
  }
  getCameraPermissions();

  // Function for when the capture button is pressed
  async function takePhotoHandler() {
    if (camera.current !== null) {
      const photo = await camera.current.takePhoto();
      console.log(photo.path);
    }
  }

  // Return modal with camera
  return (
    <Modal visible={visible}>
      {cameraPermission == 'authorized' && device ? 
        <View style={[StyleSheet.absoluteFill, styles.cameraView]}>
          <Camera
            ref={camera}
            style={StyleSheet.absoluteFill}
            device={device}
            isActive={active}
            photo={true}
          />
          <View style={styles.captureContainer}>
            <Pressable
              style={({ pressed }) => [styles.captureButton, pressed && styles.capturePressed]}
              onPress={takePhotoHandler}
            />
          </View>
        </View> : 
        <LoadingOverlay />
      }
    </Modal>
  );
}

export default ResourceCamera;

const styles = StyleSheet.create({
  cameraView: {
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  captureContainer: {
    position: 'absolute',
    paddingBottom: 30,
  },
  captureButton: {
    width: 70,
    height: 70,
    backgroundColor: '#ff0000',
    borderWidth: 4,
    borderColor: '#ffffff',
    borderRadius: 35,
  },
  capturePressed: {
    backgroundColor: '#890000',
    borderColor: '#ffffff',
  },
});
