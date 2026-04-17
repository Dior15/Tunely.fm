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
<a id="api"></a>
### Endpoints

|Type|Endpoint|Description|
|-|-|-|
|**GET**|/api/active|Returns `ok` status if the server is running|
|**GET**|/api/songs|Returns JSON metadata of all songs|
|**GET**|/api/songs/stream?id=<song_id>|Returns a single song file by its ID|
|**GET**|/api/songs/art?id=<song_id>|Returns an image URL for a song by its ID|
|**POST**|/api/songs/play?id=<song_id>|Increments the 'play_count' of a song by its ID|
|**POST**|/api/songs/duration?id=<song_id>&duration=<duration>|Updates the 'average' and 'num_samples' of the 'listen_duration' of a song by its ID|

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
| SVG and HTML | 1.0 | Custom SVG logo in the navbar, static HTML pages for About, Contact, and Info | **Vue**: <ul><li>NavBar.vue</li><li>NowPlaying.vue</li><li>SongList.vue</li></ul> **HTML**: <ul><li>about.html</li><li>contact.html</li><li>info.html</li></ul> |
| CSS and CSS frameworks | 1.0 | Bulma CSS framework throughout the app, in-line CSS in every Vue component including animations, gradients, and marquee text oscillations | **CSS**: <ul><li>style.css</li><li>static-style.css</li></ul> **Vue**: <ul><li>NowPlaying.vue</li><li>SongList.vue</li><li>NavBar.vue</li></ul> |
| JavaScript, jQuery, D3 | 1.5 | JavaScript throughout the app for its state management, marquee text oscillation calculations, and audio handling. D3 used for **I dont think we have used D3 yet, fill in when we do** | **JS**: <ul><li>usePlayer.js</li></ul> **Vue**: <ul><li>NowPlaying.vue</li><li>SongList.vue</li></ul> **D3**: <ul><li>**We need something for D3**</li></ul> |
| Dynamic DOM | 1.5 | Vue implementation incorporates dynamic DOM via marquee text oscillation calculations injected using *querySelectorAll*, as well as CSS custom properties on every song change. | **JS**: <ul><li>usePlayer.js</li></ul> **Vue**: <ul><li>NowPlaying.vue</li></ul> |
| AJAX, web services | 1.0 | API calls to the Node.js express backend for song metadata, audio files, and placeholder song cover art | **JS**: <ul><li>usePlayer.js</li></ul> |
| Node.js / Express.js / Nuxt-nitro | 1.5 | Express.js server with REST paths (*see <a href="#api">API</a>*) | **Server**: <ul><li>server.js</li><li>songs.js</li></ul> |
| Vue framework | 2.5 | Extensive Vue implementation for global music-player state, songs list, and navbar | Vue: <ul><li>App.vue</li><li>NowPlaying.vue</li><li>SongList.vue</li><li>NavBar.vue</li></ul> |