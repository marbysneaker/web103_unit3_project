import React, { useState, useEffect } from 'react'
import Event from '../components/Event'
import '../css/LocationEvents.css'
import LocationsAPI from '../services/LocationsAPI'
import EventsAPI from '../services/EventsAPI'


const LocationEvents = ({index}) => {
    const [location, setLocation] = useState([])
    const [events, setEvents] = useState([])

    

    useEffect(() => {
        // Fetch location data
        const fetchLocation = async () => {
            try {
                const locationsData = await LocationsAPI.getAllLocations(); // Assuming you have a getAllLocations method in your LocationsAPI
                if (locationsData && locationsData.length > index) {
                    setLocation(locationsData[index]);
                }
                console.log('locations Events',locationsData)
            } catch (error) {
                console.error("Error fetching locations:", error);
            }
        };
    
        // Fetch events data for the location
        const fetchEvents = async () => {
            try {
                const eventsData = await EventsAPI.getEvents(); // Assuming you have a getEvents method in your EventsAPI
                if (eventsData) {
                    setEvents(eventsData.filter(event => event.locationIndex === index)); // Assuming each event has a 'locationIndex' property
                }
                console.log('events',eventsData)
            } catch (error) {
                console.error("Error fetching events:", error);
            }
        };
    
        fetchLocation();
        fetchEvents();
    }, [index]); // Dependency array with 'index' to ensure the useEffect runs whenever 'index' changes

    return (
        <div className='location-events'>
            <header>
                <div className='location-image'>
                    <img src={location.image} />
                </div>

                <div className='location-info'>
                    <h2>{location.name}</h2>
                    <p>{location.address}, {location.city}, {location.state} {location.zip}</p>
                </div>
            </header>

            <main>
                {
                    events && events.length > 0 ? events.map((event, index) =>
                        <Event
                            key={event.id}
                            id={event.id}
                            title={event.title}
                            date={event.date}
                            time={event.time}
                            image={event.image}
                        />
                    ) : <h2><i className="fa-regular fa-calendar-xmark fa-shake"></i> {'No events scheduled at this location yet!'}</h2>
                }
            </main>
        </div>
    )
}

export default LocationEvents

