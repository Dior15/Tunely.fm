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