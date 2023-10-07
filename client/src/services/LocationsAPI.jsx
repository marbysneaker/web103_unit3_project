const BASE_URL = 'http://localhost:3001/api/locations'; // Replace YOUR_SERVER_PORT with your server's port number

const getAllLocations = async () => {
    try {
        const response = await fetch(`${BASE_URL}/`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching all locations:", error);
        return [];
    }
}

const getLocationById = async (locationId) => {
    try {
        const response = await fetch(`${BASE_URL}/${locationId}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`Error fetching location with ID ${locationId}:`, error);
        return null;
    }
}

// Add more functions as needed for other location-related endpoints

const LocationsAPI = {
    getAllLocations,
    getLocationById
    // Add other functions here as needed
}

export default LocationsAPI;
