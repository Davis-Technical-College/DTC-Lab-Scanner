import { useContext } from 'react';

import { ResourcesContext } from '../../../store/resources-context';
import ResourceList from '../../../components/Resources/ResourceList';

function AllResources() {
  const resourcesCtx = useContext(ResourcesContext);

  return (
    <ResourceList resources={resourcesCtx.resources} />
  );
}

export default AllResources;
