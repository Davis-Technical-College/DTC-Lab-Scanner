import { useContext } from 'react';

import { ResourcesContext } from '../../../store/resources-context';
import ResourcesOutput from '../../../components/Resources/ResourcesOutput';

function AllResources() {
  const resourcesCtx = useContext(ResourcesContext);

  return (
    <ResourcesOutput
      resources={resourcesCtx.resources}
      fallbackText="There are currently no resources. To add one, press '+'."
    />
  );
}

export default AllResources;
