import { createContext, useReducer } from 'react';

// Create blank slate context
export const ResourcesContext = createContext({
  resources: [],
  addResource: ({ data }) => {},
  setResources: (resources) => {},
  deleteResource: (id) => {},
  updateResource: (id, { data }) => {},
});

// Set up reducer for resource management, to be used with the context provider
function resourcesReducer(state, action) {
  switch (action.type) {
    case 'ADD':
      return [action.payload, ...state];
    case 'SET':
      const inverted = action.payload.reverse();
      return inverted;
    case 'DELETE':
      return state.filter((resource) => resource.id !== action.payload);
    case 'UPDATE':
      const updatableResourceIndex = state.findIndex(
        (resource) => resource.id === action.payload.id
      );
      const updatableResource = state[updatableResourceIndex];
      const updatedItem = { ...updatableResource, ...action.payload.data };
      const updatedResources = [...state];
      updatedResources[updatableResourceIndex] = updatedItem;
      return updatedResources;
    default:
      return state;
  }
}

function ResourcesContextProvider({ children }) {
  const [resourcesState, dispatch] = useReducer(resourcesReducer, []);

  // Connect context functions with the reducer

  function addResource(resourceData) {
    dispatch({ type: 'ADD', payload: resourceData });
  }

  function setResources(resources) {
    dispatch({ type: 'SET', payload: resources });
  }

  function deleteResource(id) {
    dispatch({ type: 'DELETE', payload: id });
  }

  function updateResource(id, resourceData) {
    dispatch({ type: 'UPDATE', payload: { id: id, data: resourceData } });
  }

  // Set the context provider value
  const value = {
    resources: resourcesState,
    addResource: addResource,
    setResources, setResources,
    deleteResource, deleteResource,
    updateResource, updateResource,
  };

  // Return a wrapper using the context provider
  return (
    <ResourcesContext.Provider value={value}>
      {children}
    </ResourcesContext.Provider>
  );
}

export default ResourcesContextProvider;
