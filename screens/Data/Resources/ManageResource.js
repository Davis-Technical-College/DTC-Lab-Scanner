// Package imports
import { useState, useContext, useLayoutEffect } from 'react';
import { View, StyleSheet } from 'react-native';

// Project imports
import { ResourcesContext } from '../../../store/resources-context';
import ResourceForm from '../../../components/Resources/ResourceForm';
import IconButton from '../../../components/UI/IconButton';
import { addResource, updateResource, deleteResource } from '../../../util/http';
import LoadingOverlay from '../../../components/UI/LoadingOverlay';
import ErrorOverlay from '../../../components/UI/ErrorOverlay';

function ManageResource({ route, navigation }) {
  // Set states and context
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState();
  const resourcesCtx = useContext(ResourcesContext);

  // Obtain resource ID if in editing mode
  const editedResourceId = route.params?.resourceId;
  const isEditing = !!editedResourceId;
  const selectedResource = resourcesCtx.resources.find(resource => resource.id === editedResourceId);

  // Implement useLayoutEffect to set title based on mode
  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Edit Resource' : 'Add Resource'
    });
  }, [navigation, isEditing])

  // Handle deleting resource
  async function deleteResourceHandler() {
    setIsSubmitting(true);
    try {
      await deleteResource(editedResourceId);
      resourcesCtx.deleteResource(editedResourceId);
      navigation.goBack();
    } catch (error) {
      setError('Could not delete resource - please try again later!');
      setIsSubmitting(false);
    }
  }

  // Handle cancelling the process
  function cancelHandler() {
    navigation.goBack();
  }

  // Handle pressing the confirm button (add or edit resource)
  async function confirmHandler(resourceData) {
    setIsSubmitting(true);
    try {
      if (isEditing) {
        resourcesCtx.updateResource(editedResourceId, resourceData);
        await updateResource(editedResourceId, resourceData);
      } else {
        const id = await addResource(resourceData);
        resourcesCtx.addResource({ ...resourceData, id: id });
      }

      navigation.goBack();
    } catch (error) {
      setError('Could not save data - please try again later!');
      setIsSubmitting(false);
    }
  }

  // Return ErrorOverlay or LoadingOverlay after submitting
  if (error && !isSubmitting) {
    return <ErrorOverlay message={error} />
  }
  if (isSubmitting) {
    return <LoadingOverlay />
  }

  // Return component view
  return (
    <View style={styles.container}>
      <ResourceForm
        defaultValues={selectedResource}
        submitButtonLabel={isEditing ? 'Update' : 'Add'}
        onCancel={cancelHandler} onSubmit={confirmHandler}
      />
      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash" size={36} color="gray"
            onPress={deleteResourceHandler}
          />
        </View>
      )}
    </View>
  );
}

export default ManageResource;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 24,
  },
  deleteContainer: {
    alignItems: 'center',
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: 'black',
  },
});
