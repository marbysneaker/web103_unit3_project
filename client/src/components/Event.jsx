import React, { useState, useEffect } from 'react';
import '../css/Event.css';
import EventsAPI from '../services/EventsAPI';
import moment from 'moment';

const Event = (props) => {
    const [event, setEvent] = useState([]);
    const [time, setTime] = useState('');
    const [remaining, setRemaining] = useState('');

    useEffect(() => {
        (async () => {
            try {
                const eventData = await EventsAPI.getEventsById(props.id);
                setEvent(eventData);
                console.log('event', eventData);
            } catch (error) {
                console.error("Error fetching event data:", error);
            }
        })();
    }, [props.id]);

    useEffect(() => {
        if (event.time) {
            const formattedTime = moment(event.time).format('HH:mm');
            setTime(formattedTime);
        }
    }, [event]);

    useEffect(() => {
        if (event.date) {
            const now = moment();
            const eventDate = moment(event.date);
            const duration = moment.duration(eventDate.diff(now));
            const hours = duration.hours();
            const minutes = duration.minutes();
            setRemaining(`${hours} hours ${minutes} minutes remaining`);
        }
    }, [event]);

    return (
        <article className='event-information'>
            <img src={event.image} alt="Event" />

            <div className='event-information-overlay'>
                <div className='text'>
                    <h3>{event.title}</h3>
                    <p><i className="fa-regular fa-calendar fa-bounce"></i> {event.date} <br /> {time}</p>
                    <p id={`remaining-${event.id}`}>{remaining}</p>
                </div>
            </div>
        </article>
    );
}

export default Event;
