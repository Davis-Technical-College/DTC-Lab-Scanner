import axios from 'axios';

const BACKEND_URL = 'https://dtc-lab-scanner-default-rtdb.firebaseio.com';

// Fetch the list of resources
export async function fetchResources() {
  const response = await axios.get(BACKEND_URL + '/resources.json');

  const resources = [];

  for (const key in response.data) {
    const resourceObj = {
      id: key,
      name: response.data[key].name,
      imageUri: response.data[key].imageUri,
      components: response.data[key].components,
      currentUser: response.data[key].currentUser,
    };
    resources.push(resourceObj);
  }

  return resources;
}

// Add a resource
export async function addResource(resourceData) {
  const response = await axios.post(BACKEND_URL + '/resources.json', resourceData);
  const id = response.data.name;

  return id;
}

// Update a resource
export async function updateResource(resourceData) {
  return axios.put(BACKEND_URL + `/resources/${id}.json`, resourceData);
}

// Delete a resource
export async function deleteResource(id) {
  return axios.delete(BACKEND_URL + `/resources/${id}.json`);
}
