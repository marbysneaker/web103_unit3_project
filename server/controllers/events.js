import { pool } from '../config/database.js'

const getEvents = async (req, res) => {
    try {
        const { rows } = await pool.query('SELECT * FROM events')
        res.status(200).json(rows)
    } catch (err) {
        res.status(409).json({ error: err.message })
    }
}

const getEventById = async (req, res) => {
    try {
        const eventId = req.params.eventId
        const selectQuery = `SELECT title, date, time, image FROM events WHERE id = ${eventId}`
        const result = await pool.query(selectQuery)
        res.status(200).json(result.rows[0])
    } catch (err) {
        res.status(409).json({ error: err.message })
    }
}

export default { getEvents, getEventById }