import express from 'express'
import path from 'path'
import favicon from 'serve-favicon'
import dotenv, { config } from 'dotenv'
import cors from 'cors';
import eventsRouter from './routes/events.js';
// import locationsRouter from './routes/locations.js'; // Import the router for locations



console.log('config',config())
const PORT = process.env.PORT || 3001

const app = express()

app.use(cors())

app.use(express.json())

app.use('/api', eventsRouter)



if (process.env.NODE_ENV === 'development') {
    app.use(favicon(path.resolve('../', 'client', 'public', 'party.png')))
}
else if (process.env.NODE_ENV === 'production') {
    app.use(favicon(path.resolve('public', 'party.png')))
    app.use(express.static('public'))
}

if (process.env.NODE_ENV === 'production') {
    app.get('/*', (_, res) =>
        res.sendFile(path.resolve('public', 'index.html'))
    )
}

app.listen(PORT, () => {
    console.log(`server listening on http://localhost:${PORT}`)
})
