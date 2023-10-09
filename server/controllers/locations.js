import {pool} from '../config/database.js'

const getAllLocations = async (req, res) => {
    try {
        const {rows} = await pool.query('SELECT * FROM locations')
        res.status(200).json(rows)
    } catch (err) {
        res.status(409).json({error: err.message})
    }
}

const getLocationsById = async (req, res) => {
    
    try {
        const locationId = req.params.locationId
        const selectQuery = `SELECT * FROM locations WHERE id = ${locationId}`
        const result = await pool.query(selectQuery)
        res.status(200).json(result.rows[0])
    } catch (err) {
        res.status(409).json({error: err.message})
    }
}

export default {getAllLocations, getLocationsById}


