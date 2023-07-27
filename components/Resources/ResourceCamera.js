import { Modal, StyleSheet } from 'react-native';
import { Camera, useCameraDevices } from 'react-native-vision-camera';

import LoadingOverlay from '../UI/LoadingOverlay';

function ResourceCamera({ visible, active }) {
  // Set up camera device
  const devices = useCameraDevices();
  const device = devices.back;

  // Check for permissions, get them if not available
  async function getCameraPermissions() {
    const cameraPermission = await Camera.getCameraPermissionStatus();

    if (cameraPermission !== 'authorized') {
      const newCameraPermission = await Camera.requestCameraPermission();
      return newCameraPermission;
    }

    return cameraPermission;
  }
  const permissions = getCameraPermissions();

  // Return modal with camera
  return (
    <Modal visible={visible}>
      {permissions == 'authorized' && device ? 
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
