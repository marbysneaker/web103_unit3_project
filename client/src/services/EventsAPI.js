import axios from 'axios';

const API_URL = 'http://localhost:3001/api'; 

const request = axios.create({
  baseURL: API_URL,
  timeout: 10000, // Set a timeout for requests (10 seconds in this case)
});

const getEvents = async () => {
  try {
    const response = await request.get('/events');
    return response.data;
  } catch (error) {
    console.error("Error fetching events:", error);
    throw error;
  }
};

const getEventsById = async (eventId) => {
  try {
    const response = await request.get(`/events/${eventId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching event with ID ${eventId}:`, error);
    throw error;
  }
};

// Add more API calls as needed

const EventsAPI = {
  getEvents,
  getEventsById
};

export default EventsAPI;
