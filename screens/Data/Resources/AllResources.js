import { useState, useContext, useEffect } from 'react';

import { ResourcesContext } from '../../../store/resources-context';
import { fetchResources } from '../../../util/http';
import ErrorOverlay from '../../../components/UI/ErrorOverlay';
import LoadingOverlay from '../../../components/UI/LoadingOverlay';
import ResourceList from '../../../components/Resources/ResourceList';

function AllResources() {
  // Create states and context
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState();
  const resourcesCtx = useContext(ResourcesContext);

  // Fetch resources to set context upon loading screen
  useEffect(() => {
    async function getResources() {
      setIsFetching(true);
      try {
        const resources = await fetchResources();
        resourcesCtx.setResources(resources);
      } catch (error) {
        setError('Could not fetch resources!');
      }
      setIsFetching(false);
    }

    getResources();
  }, []);

  // Show ErrorOverlay is there's an error
  if (error && !isFetching) {
    return <ErrorOverlay message={error} />;
  }

  // Show LoadingOverlay while fetching
  if (isFetching) {
    return <LoadingOverlay />;
  }

  // If the resources are successfully fetched, show the list
  return (
    <ResourceList resources={resourcesCtx.resources} />
  );
}

export default AllResources;
