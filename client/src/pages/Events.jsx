import React, { useState, useEffect } from 'react';
import Event from '../components/Event';
import EventsAPI from '../services/EventsAPI';
import '../css/Events.css'; // Assuming you have a CSS file for styling

const Events = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        // Fetch all events
        const fetchEvents = async () => {
            try {
                const eventsData = await EventsAPI.getEvents();
                if (eventsData) {
                    setEvents(eventsData);
                }
            } catch (error) {
                console.error("Error fetching events:", error);
            }
        };

        fetchEvents();
    }, []); // Empty dependency array to ensure the useEffect runs only once after component mount

    return (
        <div className='events-page'>
            <header>
                <h2>All Events</h2>
            </header>

            <main>
                {
                    events && events.length > 0 ? events.map((event) =>
                        <Event
                            key={event.id}
                            id={event.id}
                            title={event.title}
                            date={event.date}
                            time={event.time}
                            image={event.image}
                        />
                    ) : <h2><i className="fa-regular fa-calendar-xmark fa-shake"></i> {'No events scheduled yet!'}</h2>
                }
            </main>
        </div>
    );
}

export default Events;
