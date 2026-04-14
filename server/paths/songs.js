import express from 'express'
import { readFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const router = express.Router()
const __dirname = dirname(fileURLToPath(import.meta.url))
const db_path = join(__dirname, '../data/db.json')

// helper function to get current database on each call
function _get_db() {
    const raw = readFileSync(db_path)
    return JSON.parse(raw)
}

/*
    GET /api/songs

    usage: http://localhost:<port>/api/songs

    returns all songs in the database (metadata, not mp3 files)
*/
router.get('/', (_, res) => {
    const { songs } = _get_db()
    res.json(songs)
})

/*
    GET /api/songs/stream

    usage: http://localhost:<port>/api/songs/stream?id=<song_id>

    returns a single song file by its ID
*/
router.get('/stream', (req, res) => {
    const { songs } = _get_db()
    const { id } = req.query

    // find song by its ID by querying the database
    const song = songs.find(song => song.id === parseInt(id))
    if (!song) return res.status(404).json({ error: 'song not found' })

    // build path to song file and send
    const file_path = join(__dirname, '../music', song.file)
    res.sendFile(file_path)
})

export default router