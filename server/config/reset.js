import { pool } from '../config/database.js'
import '../config/dotenv.js'
import events from '../data/events.js'

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


seedEventsTable();