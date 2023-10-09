import { pool } from '../config/database.js'
import '../config/dotenv.js'
import events from '../data/events.js'
import locations from '../data/locations.js'

const createEventsTable = async () => {
    const createTableQuery = `
    DROP TABLE IF EXISTS events;

    CREATE TABLE IF NOT EXISTS events (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        date VARCHAR(10) NOT NULL,
        time VARCHAR(10) NOT NULL,
        image TEXT NOT NULL   
    )
`

try {
    await pool.query(createTableQuery)
    console.log('🎉 events table created successfully')
  } catch (err) {
    console.error('⚠️ error creating events table', err)
  }
}

const seedEventsTable = async () => {
    await createEventsTable()
    events.forEach((events) => {
        const insertQuery = {
            text: 'INSERT INTO events (title, date, time, image) VALUES ($1, $2, $3, $4)',
   
        }
        const values = [
            events.title,
            events.date,
            events.time,
            events.image
        ]

        pool.query(insertQuery, values, (err,res) => {
            if(err){
                console.error('⚠️ error inserting events', err)
                return
            }
            console.log(`✅ ${events.title} added successfully`)
        })
      })
      const result = await pool.query('SELECT * FROM events');
        console.log(result.rows);
}

const createLocationsTable = async () => {
    const createTableQuery = `
    DROP TABLE IF EXISTS locations;

    CREATE TABLE IF NOT EXISTS locations (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        address VARCHAR(255) NOT NULL,
        image TEXT NOT NULL
    )
`

try {
    await pool.query(createTableQuery)
    console.log('🎉 locations table created successfully')
  } catch (err) {
    console.error('⚠️ error creating locations table', err)
  }
}

const seedLocationsTable = async () => {
    await createLocationsTable()
    locations.forEach((locations) => {
        const insertQuery = {
            text: 'INSERT INTO locations (name, address, image) VALUES ($1, $2, $3)',
   
        }
        const values = [
            locations.name,
            locations.address,
            locations.image
        ]

        pool.query(insertQuery, values, (err,res) => {
            if(err){
                console.error('⚠️ error inserting locations', err)
                return
            }
            console.log(`✅ ${locations.name} added successfully`)
        })
      })
      const result = await pool.query('SELECT * FROM locations');
        console.log(result.rows);
}

seedLocationsTable();


seedEventsTable();