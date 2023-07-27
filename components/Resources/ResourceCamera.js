import { useState } from 'react';
import { Modal, StyleSheet } from 'react-native';
import { Camera, useCameraDevices } from 'react-native-vision-camera';

import LoadingOverlay from '../UI/LoadingOverlay';

function ResourceCamera({ visible, active }) {
  // Create state for camera permissions
  const [cameraPermission, setCameraPermission] = useState('');

  // Set up camera device
  const devices = useCameraDevices();
  const device = devices.back;

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

  // Return modal with camera
  return (
    <Modal visible={visible}>
      {cameraPermission == 'authorized' && device ? 
        <Camera
          style={StyleSheet.absoluteFill}
          device={device}
          isActive={active}
          photo={true}
        /> : 
        <LoadingOverlay />
      }
    </Modal>
  );
}

export default ResourceCamera;
