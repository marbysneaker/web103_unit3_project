import React, { useEffect } from 'react'
import { useRoutes, Link } from 'react-router-dom'
import Locations from './pages/Locations'
import LocationEvents from './pages/LocationEvents'
// import Events from './pages/Events'
import './App.css'
import { getAllEvents } from './services/EventsAPI';


const App = () => {
  let element = useRoutes([
    {
      path: '/',
      element: <Locations />
    },
    {
      path: '/echolounge',
      element: <LocationEvents index={1} />
    },
    {
      path: '/houseofblues',
      element: <LocationEvents index={2} />
    },
    {
      path: '/pavilion',
      element: <LocationEvents index={3} />
    },
    {
      path: '/americanairlines',
      element: <LocationEvents index={4} />
    },
    // {
    //   path: '/events',
    //   element: <Events />
    // }
  ])

  useEffect(() => {
    (async () => {
      try {
        const eventsData = await getAllEvents()
        console.log(eventsData)
      }
      catch (error) {
        throw error
      }
    })()
  }, [])


  return (
    <div className='app'>

      <header className='main-header'>
        <h1>UnityGrid Plaza</h1>

        <div className='header-buttons'>
          <Link to='/' role='button'>Home</Link>
          <Link to='/events' role='button'>Events</Link>
        </div>
      </header>

      <main>
        {element}
      </main>
    </div>
  )
}

export default App