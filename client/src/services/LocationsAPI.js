import axios from 'axios';

const API_URL = 'http://localhost:3001/api'; 

const request = axios.create({
  baseURL: API_URL,
  timeout: 10000, // Set a timeout for requests (10 seconds in this case)
});

const getAllLocations = async () => {
  try {
    const response = await request.get('/locations');
    return response.data;
  } catch (error) {
    console.error("Error fetching locations:", error);
    throw error;
  }
};

// const getLocationById = async (locationId) => {
//   try {
//     const response = await request.get(`/locations/${locationId}`);
//     return response.data;
//   } catch (error) {
//     console.error(`Error fetching location with ID ${locationId}:`, error);
//     throw error;
//   }
// };

// Add more API calls as needed for locations

const LocationsAPI = {
  getAllLocations,
//   getLocationById
};

export default LocationsAPI;
