import { ref, computed } from 'vue'

// ─── Singleton state ───────────────────────────────────────────────────────────
const songs = ref([])
const queue = ref([])
const queueIndex = ref(-1)
const currentSong = ref(null)
const isPlaying = ref(false)
const isLoading = ref(false)
const shuffle = ref(false)
const repeat = ref('none')   // 'none' | 'all' | 'one'
const currentTime = ref(0)
const duration = ref(0)
const volume = ref(.5)

const audio = new Audio()
let _raf = null

// ─── RAF ticker for scrubber ───────────────────────────────────────────────────
function _startRaf() {
  _stopRaf()
  function tick() {
    currentTime.value = audio.currentTime
    duration.value = isFinite(audio.duration) ? audio.duration : 0
    _raf = requestAnimationFrame(tick)
  }
  _raf = requestAnimationFrame(tick)
}
function _stopRaf() {
  if (_raf !== null) { cancelAnimationFrame(_raf); _raf = null }
}

// ─── Queue builder ─────────────────────────────────────────────────────────────
function _buildQueue(startId = null) {
  let indices = songs.value.map((_, i) => i)
  if (shuffle.value) {
    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
        ;[indices[i], indices[j]] = [indices[j], indices[i]]
    }
    if (startId !== null) {
      const pos = indices.findIndex(i => songs.value[i].id === startId)
      if (pos > 0) { const [v] = indices.splice(pos, 1); indices.unshift(v) }
    }
  } else {
    if (startId !== null) {
      const pos = indices.findIndex(i => songs.value[i].id === startId)
      if (pos !== -1) indices = [...indices.slice(pos), ...indices.slice(0, pos)]
    }
  }
  queue.value = indices
}

// ─── Core playback (module-scope so ended listener can reference them) ─────────
function _loadAndPlay() {
  const songObj = songs.value[queue.value[queueIndex.value]]
  if (!songObj) return
  currentSong.value = songObj
  isLoading.value = true
  // Set src without calling .load() — setting src is enough to start loading.
  // Calling .load() then .play() immediately causes an AbortError in most browsers.
  audio.src = `http://localhost:3000/api/songs/stream?id=${songObj.id}`
  audio.volume = volume.value
  audio.play().catch(err => console.warn('Playback error:', err))
}

function next() {
  if (!queue.value.length) return
  if (repeat.value === 'one') { audio.currentTime = 0; audio.play(); return }
  queueIndex.value = queueIndex.value < queue.value.length - 1
    ? queueIndex.value + 1
    : 0
  _loadAndPlay()
}

function prev() {
  if (!queue.value.length) return
  if (audio.currentTime > 3) { audio.currentTime = 0; return }
  queueIndex.value = queueIndex.value > 0
    ? queueIndex.value - 1
    : queue.value.length - 1
  _loadAndPlay()
}

// ─── Audio events ──────────────────────────────────────────────────────────────
audio.addEventListener('play', () => { isPlaying.value = true; _startRaf() })
audio.addEventListener('pause', () => { isPlaying.value = false; _stopRaf() })
audio.addEventListener('canplay', () => { isLoading.value = false })
audio.addEventListener('waiting', () => { isLoading.value = true })
audio.addEventListener('loadedmetadata', () => { duration.value = audio.duration })
audio.addEventListener('ended', () => {
  if (repeat.value === 'one') {
    audio.currentTime = 0; audio.play()
  } else if (repeat.value === 'all' || queueIndex.value < queue.value.length - 1) {
    next()   // ✅ now in scope — next() is defined at module level
  } else {
    isPlaying.value = false; currentTime.value = 0; _stopRaf()
  }
})

// ─── Public API ────────────────────────────────────────────────────────────────
export function usePlayer() {
  async function fetchSongs() {
    if (songs.value.length) return
    try {
      const res = await fetch('http://localhost:3000/api/songs')
      songs.value = await res.json()
    } catch (e) {
      console.error('Failed to fetch songs', e)
    }
  }

  function playSong(id) {
    _buildQueue(id)
    queueIndex.value = 0
    _loadAndPlay()
  }

  function togglePlay() {
    if (!currentSong.value) return
    audio.paused ? audio.play() : audio.pause()
  }

  function seek(seconds) {
    if (!isFinite(audio.duration)) return
    audio.currentTime = Math.max(0, Math.min(seconds, audio.duration))
  }

  function setVolume(v) {
    volume.value = v
    audio.volume = v
  }

  function toggleShuffle() {
    shuffle.value = !shuffle.value
    if (currentSong.value) { _buildQueue(currentSong.value.id); queueIndex.value = 0 }
  }

  function cycleRepeat() {
    const modes = ['none', 'all', 'one']
    repeat.value = modes[(modes.indexOf(repeat.value) + 1) % modes.length]
  }

  const progress = computed(() =>
    duration.value > 0 ? (currentTime.value / duration.value) * 100 : 0
  )

  const artURL = computed(() =>
    currentSong.value?.art_source ?? null
  )

  return {
    songs, currentSong, isPlaying, isLoading,
    shuffle, repeat,
    currentTime, duration, volume, progress, artURL,
    fetchSongs, playSong, togglePlay, next, prev,
    seek, setVolume, toggleShuffle, cycleRepeat,
  }
}
