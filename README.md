# Tunely.fm

Music web app that allows users to listen to music.

## Authors

- Khristian Diorico
- Muhammad naufil Ansari
- Nathan Tandory
- Nathaniel Dizon


## Setup & Run

### Prerequisites

- Node.js 20+ and npm

### Setup

At the project root, install all dependencies:
```bash
npm install
npm run dependencies
```

### Running the App

At the project root, run:
```bash
npm run start
```

This starts both services:

- Frontend (Vite): `http://localhost:5173`
- Backend (Express): `http://localhost:3000`

Quick server health check:

- `GET http://localhost:3000/api/active`

## API
<a id="api"></a>
### Endpoints

|Type|Endpoint|Description|
|-|-|-|
|**GET**|/api/active|Returns `ok` status if the server is running|
|**GET**|/api/songs|Returns JSON metadata of all songs|
|**GET**|/api/songs/stream?id=<song_id>|Returns a single song file by its ID|
|**GET**|/api/songs/art?id=<song_id>|Returns an image URL for a song by its ID|
|**POST**|/api/songs/play|Increments the 'play_count' of a song by its ID. JSON body: `{ "id": <song_id> }`|
|**POST**|/api/songs/duration|Updates the 'average' and 'num_samples' of 'listen_duration'. JSON body: `{ "id": <song_id>, "duration": <seconds> }`|

## Music Source
The music in this project is sourced from the [SoundSafari CC0-1.0-Music](https://github.com/SoundSafari/CC0-1.0-Music) corpus. 

All audio assets are dedicated to the public domain under the **CC0 1.0 Universal** license. You can find the full legal text in the `server/assets/music/LICENSE` file within this repository.

## Placeholder Cover Art Source

Cover artwork shown in the application is placeholder artwork and is not the original artwork associated with the songs.

Artwork is pulled randomly, and loaded dynamically using [Lorem Picsum](https://picsum.photos/), which serves images from Unsplash, and is used under the [Unsplash License](https://unsplash.com/license).

No artwork from this source is stored in this repository. If an image fails to load, the application falls back to a default icon.

## Evaluation Rubric Completion

| Requirement | Weight | What We Did | Relevant Files |
|-|-|-|-|
| SVG and HTML | 1.0 | Custom inline SVG logo in the navbar, plus static HTML pages for About, Contact, and Info linked from the app menu. | **Vue**: <ul><li>client/src/components/NavBar.vue</li></ul> **HTML**: <ul><li>client/public/pages/about.html</li><li>client/public/pages/contact.html</li><li>client/public/pages/info.html</li></ul> |
| CSS and CSS frameworks | 1.0 | Bulma is loaded globally, with component-scoped CSS for the player/list/navbar UI and a dedicated stylesheet for static pages. | **Framework import**: <ul><li>client/src/main.js</li></ul> **Vue styles**: <ul><li>client/src/App.vue</li><li>client/src/components/NavBar.vue</li><li>client/src/components/SongList.vue</li><li>client/src/components/NowPlaying.vue</li></ul> **Static CSS**: <ul><li>client/public/pages/static-style.css</li></ul> |
| JavaScript, jQuery, D3 | 1.5 | JavaScript drives shared player state, queue/repeat/shuffle controls, and API calls. D3 is used to render bar charts in the Statistics view. | **JS logic**: <ul><li>client/src/composables/usePlayer.js</li><li>client/src/App.vue</li></ul> **D3 charts**: <ul><li>client/src/components/Stats.vue</li></ul> |
| Dynamic DOM | 1.5 | Reactive Vue rendering updates the UI using `v-if`/`v-else-if` page switching, `v-for` song rows, active-song styling, and runtime marquee overflow calculations via `querySelectorAll` and CSS variables. | **Vue**: <ul><li>client/src/App.vue</li><li>client/src/components/SongList.vue</li><li>client/src/components/NowPlaying.vue</li></ul> |
| AJAX, web services | 1.0 | The frontend uses `fetch` to load song metadata, post play counts, post listen duration samples, and populate statistics data. Audio streaming uses backend endpoints. | **Client fetch calls**: <ul><li>client/src/composables/usePlayer.js</li><li>client/src/components/Stats.vue</li></ul> **Backend endpoints**: <ul><li>server/server.js</li><li>server/paths/songs.js</li></ul> |
| Node.js / Express.js / Nuxt-nitro | 1.5 | Node.js + Express backend serves API routes, streams music files, and persists play/listen metrics to local JSON data. | **Server**: <ul><li>server/server.js</li><li>server/paths/songs.js</li></ul> **Data**: <ul><li>server/data/db.json</li></ul> |
| Vue framework | 2.5 | Vue 3 SPA architecture with componentized navbar/song list/stats/player UI and a shared composable for global playback state. | **Vue app**: <ul><li>client/src/main.js</li><li>client/src/App.vue</li></ul> **Components**: <ul><li>client/src/components/NavBar.vue</li><li>client/src/components/SongList.vue</li><li>client/src/components/Stats.vue</li><li>client/src/components/NowPlaying.vue</li></ul> **Composable**: <ul><li>client/src/composables/usePlayer.js</li></ul> |