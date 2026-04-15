import express from 'express'
import { readFileSync, writeFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const router = express.Router()
const full_path = dirname(fileURLToPath(import.meta.url))
const db_path = join(full_path, '../data/db.json')

// helper function to get current database on each call.
function _get_db() {
    const raw = readFileSync(db_path)
    return JSON.parse(raw)
}

// helper function to save database at a given state.
// Node.js is single-threaded, so we dont need a mutex.
function _save_db(db) {
    writeFileSync(db_path, JSON.stringify(db, null, 2))
}

/*
    GET /api/songs

    usage: http://localhost:<port>/api/songs

    returns all songs in the database (metadata, not mp3 files).
*/
router.get('/', (_, res) => {
    const { songs } = _get_db()
    res.json(songs)
})

/*
    GET /api/songs/stream

    usage: http://localhost:<port>/api/songs/stream?id=<song_id>

    returns a single song file by its ID.
*/
router.get('/stream', (req, res) => {
    const { songs } = _get_db()
    const { id } = req.query

    // find song by its ID by querying the database.
    const song = songs.find(song => song.id === parseInt(id))
    if (!song) return res.status(404).json({ error: 'song not found' })

    // build path to song file and send.
    const file_path = join(full_path, '../music', song.file)
    res.sendFile(file_path)
})

/*
    POST /api/songs/play

    usage: http://localhost:<port>/api/songs/play?id=<song_id>

    increments the 'play_count' of a song by its ID.
*/
router.post('/play', (req, res) => {
    const db = _get_db()
    const { songs } = db
    const { id } = req.body

    // find song by its ID by querying the database.
    const song = songs.find(song => song.id === parseInt(id))
    if (!song) return res.status(404).json({ error: 'song not found' })

    // increment play count.
    song.play_count++

    // save database with the incremented play count.
    _save_db(db)

    res.json({ id: song.id, play_count: song.play_count })
})

/*
    POST /api/songs/duration

    usage: http://localhost:<port>/api/songs/duration?id=<song_id>&duration=<duration>

    updates the 'average' and 'num_samples' of the 'listen_duration' of a song by its ID.
    This has no validation since its out of scope, but if needed we can add it later.
*/
router.post('/duration', (req, res) => {
    const db = _get_db()
    const { songs } = db
    const { id, duration } = req.body

    // find song by its ID by querying the database.
    const song = songs.find(song => song.id === parseInt(id))
    if (!song) return res.status(404).json({ error: 'song not found' })

    /*
        exponential moving average:
        new_avg = alpha * new_val + (1 - alpha) * old_avg
        where alpha = 1 / n

        This allows us to take the average of all samples without storing every sample.
    */
    const n = (song.listen_duration.num_samples ?? 0) + 1
    const alpha = 1 / n
    song.listen_duration.average = (alpha * duration) + ((1 - alpha) * (song.listen_duration.average ?? 0))
    song.listen_duration.num_samples = n

    // save database with the updated listen duration.
    _save_db(db)

    res.json({ id: song.id, listen_duration: song.listen_duration })
})

export default router