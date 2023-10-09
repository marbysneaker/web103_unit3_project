import express from 'express'
import LocationsController from '../controllers/locations.js'
import EventsController from '../controllers/events.js'


const router = express.Router()

router.get('/events', EventsController.getEvents)
router.get('/locations', LocationsController.getAllLocations)
router.get('/events/:eventId', EventsController.getEventById) 
router.get('/locations/:locationId', LocationsController.getLocationsById)


export default router 
