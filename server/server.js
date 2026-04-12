import express from 'express'
import cors from 'cors'
import song_paths from './paths/songs.js'
const port = 3000

const app = express()
app.use(cors())
app.use(express.json())

// establish paths
app.use('/api/songs', song_paths)

// api check to test if the server is running
app.get('/api/active', (request, result) => {
    result.json({ status: 'ok', message: 'Tunely server is active' })
})

// set port and start server
app.set('port', process.env.PORT || 3000)
app.listen(app.get('port'), () => {
    console.log(`Listening for requests on port ${app.get('port')}`)
})