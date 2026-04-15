# Tunely.fm

Music web app that allows users to listen to music.

## Authors

- Khristian Diorico
- Muhammad naufil Ansari
- Nathan Tandory
- Nathaniel Dizon


## Setup & Run

### Setup

At the project root, install all dependencies:
```bash
npm install
npm run dependencies
```

### Running the App
At the project root, run
```bash
npm run start
```

## API

### Endpoints

|Type|Endpoint|Description|
|-|-|-|
|**GET**|/api/active|Returns `ok` status if the server is running|
|**GET**|/api/songs|Returns JSON metadata of all songs|
|**GET**|/api/songs/stream?id=<song_id>|Returns a single song file by its ID|
|**POST**|/api/songs/play?id=<song_id>|Increments the 'play_count' of a song by its ID|
|**POST**|/api/songs/duration?id=<song_id>&duration=<duration>|Updates the 'average' and 'num_samples' of the 'listen_duration' of a song by its ID|

## Music Source
The music in this project is sourced from the [SoundSafari CC0-1.0-Music](https://github.com/SoundSafari/CC0-1.0-Music) corpus. 

All audio assets are dedicated to the public domain under the **CC0 1.0 Universal** license. You can find the full legal text in the `server/music/LICENSE` file within this repository.