<script setup>
import { ref, watch, nextTick } from 'vue'
import { usePlayer } from '../composables/usePlayer.js'

const {
  currentSong, isPlaying, isLoading,
  shuffle, repeat,
  currentTime, duration, volume, progress, artURL,
  togglePlay, next, prev,
  seek, setVolume, toggleShuffle, cycleRepeat,
} = usePlayer()

function fmt(secs) {
  if (!secs || !isFinite(secs)) return '0:00'
  const m = Math.floor(secs / 60)
  const s = Math.floor(secs % 60).toString().padStart(2, '0')
  return `${m}:${s}`
}

function onScrub(e) {
  seek((parseFloat(e.target.value) / 100) * duration.value)
}

function onVolume(e) {
  setVolume(parseFloat(e.target.value))
}

// update all marquee elements
function update_marquees() 
{
  nextTick(() => {
    document.querySelectorAll('.np-marquee').forEach(e => {
      const viewport = e.parentElement
      // calculate overflow to determine if marquee text should oscillate
      const overflow = e.scrollWidth - viewport.clientWidth
      const should_scroll = overflow > 6
      // set the movement distance for the marquee
      e.style.setProperty('--marquee-offset', `${Math.max(0, overflow)}px`)
      e.classList.toggle('np-marquee--active', should_scroll)
    })
  })
}
watch(() => currentSong.value, update_marquees)
watch(isPlaying, update_marquees)

const repeatLabel = { none: '', all: 'ALL', one: '1' }

// art error handling (for when a songs art fails to load)
const artError = ref(false)
watch(artURL, () => { artError.value = false }) // reset art error when the art URL changes

</script>

<template>
  <!-- Idle: nothing playing -->
  <div v-if="!currentSong" class="box np-box np-idle px-5 py-3">
    <span class="icon has-text-grey-light mr-2">
      <font-awesome-icon icon="music" />
    </span>
    <span class="has-text-grey-light is-size-7">Select a song to start listening</span>
  </div>

  <!-- Player -->
  <div v-else class="box np-box px-5 py-3">

    <!-- Top row: disc + info + transport + volume -->
    <div class="level is-mobile np-level">

      <!-- DISC: art disk -->
      <div class="np-disc-wrap">
        <div class="np-disc" :class="{ 'np-disc--spinning': isPlaying }">
          <img
            v-if="artURL && !artError" :src="artURL" :alt="currentSong.title" class="np-art"
            @error="artError = true"
          />
          <span v-else class="icon">
            <font-awesome-icon icon="music" />
          </span>
        </div>
      </div>

      <!-- INFO: song title + artist + album + genre + year -->
      <div class="np-info">
        <!-- song title -->
        <div class="np-info-lines">
          <div class="np-marquee-viewport" :title="currentSong.title">
            <p class="np-title has-text-weight-bold np-marquee">{{ currentSong.title }}</p>
          </div>
          <!-- song artist -->
          <div class="np-marquee-viewport" :title="currentSong.artist">
            <p class="np-artist is-size-7 np-marquee">{{ currentSong.artist }}</p>
          </div>
          <!-- song album -->
          <div class="np-marquee-viewport" :title="currentSong.album">
            <p class="np-album is-size-7 has-text-grey np-marquee">{{ currentSong.album ?? "Unknown Album/Single" }}</p>
          </div>
          <!-- song genre + year -->
          <div class="np-marquee-viewport"
            :title="`${currentSong.genre ?? 'Unknown Genre'} · ${currentSong.year ?? 'Unknown Year'}`">
            <p class="np-genre is-size-7 has-text-grey np-marquee">
              {{ currentSong.genre ?? 'Unknown Genre' }}
              <span class="has-text-grey-dark"> · {{ currentSong.year ?? 'Unknown Year' }}</span>
            </p>
          </div>
        </div>
      </div>

      <!-- CENTER: transport controls + scrubber -->
      <div class="level-item np-center-block">
        <!-- Transport buttons -->
        <div class="buttons is-centered are-small np-controls mb-2">
          <!-- Shuffle -->
          <button
            id="np-btn-shuffle"
            class="button is-dark is-rounded np-aux-btn"
            :class="{ 'np-aux-btn--on': shuffle }"
            @click="toggleShuffle"
            :title="shuffle ? 'Shuffle on' : 'Shuffle off'"
          >
            <span class="icon"><font-awesome-icon icon="shuffle" /></span>
          </button>

          <!-- Prev -->
          <button id="np-btn-prev" class="button is-dark is-rounded" @click="prev" title="Previous">
            <span class="icon"><font-awesome-icon icon="backward-step" /></span>
          </button>

          <!-- Play / Pause -->
          <button
            id="np-btn-play"
            class="button is-rounded np-play-btn"
            @click="togglePlay"
            :title="isPlaying ? 'Pause' : 'Play'"
          >
            <span class="icon is-medium">
              <font-awesome-icon v-if="isLoading" icon="circle-notch" spin />
              <font-awesome-icon v-else-if="isPlaying" icon="pause" />
              <font-awesome-icon v-else icon="play" />
            </span>
          </button>

          <!-- Next -->
          <button id="np-btn-next" class="button is-dark is-rounded" @click="next" title="Next">
            <span class="icon"><font-awesome-icon icon="forward-step" /></span>
          </button>

          <!-- Repeat -->
          <button
            id="np-btn-repeat"
            class="button is-dark is-rounded np-aux-btn"
            :class="{ 'np-aux-btn--on': repeat !== 'none' }"
            @click="cycleRepeat"
            :title="`Repeat: ${repeat}`"
          >
            <span class="icon"><font-awesome-icon :icon="repeat === 'one' ? 'repeat' : 'repeat'" /></span>
            <span v-if="repeat !== 'none'" class="np-repeat-tag tag is-small">{{ repeatLabel[repeat] }}</span>
          </button>
        </div>

        <!-- Scrubber -->
        <div class="is-flex is-align-items-center np-scrubber-row">
          <span class="is-size-7 has-text-grey np-time">{{ fmt(currentTime) }}</span>
          <input
            id="np-scrubber"
            type="range"
            min="0" max="100" step="0.1"
            :value="progress"
            @input="onScrub"
            class="np-slider np-slider--scrub mx-2"
            :style="`--fill: ${progress}%`"
          />
          <span class="is-size-7 has-text-grey np-time">{{ fmt(duration) }}</span>
        </div>
      </div>

      <!-- RIGHT: volume -->
      <div class="level-right np-right">
        <div class="level-item">
          <div class="is-flex is-align-items-center np-volume-row">
            <button
              class="button is-ghost is-small np-vol-btn"
              @click="setVolume(volume > 0 ? 0 : 1)"
              :title="volume === 0 ? 'Unmute' : 'Mute'"
            >
              <span class="icon is-small has-text-grey-light">
                <font-awesome-icon
                  :icon="volume === 0 ? 'volume-xmark' : volume < 0.5 ? 'volume-low' : 'volume-high'"
                />
              </span>
            </button>
            <input
              id="np-volume-slider"
              type="range"
              min="0" max="1" step="0.01"
              :value="volume"
              @input="onVolume"
              class="np-slider np-slider--vol"
              :style="`--fill: ${volume * 100}%`"
            />
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>
/* ── Outer box ── */
.np-box {
  position: sticky;
  bottom: 0;
  z-index: 100;
  border-radius: 0 !important;
  border: none !important;
  background: rgba(20, 12, 34, 0.88) !important;
  backdrop-filter: blur(22px) saturate(160%);
  -webkit-backdrop-filter: blur(22px) saturate(160%);
  box-shadow: 0 -6px 36px rgba(0, 0, 0, 0.5) !important;
  padding-top: 0.9rem !important;
  padding-bottom: 0.9rem !important;
  min-height: 100px;
}

/* ── Idle bar ── */
.np-idle {
  display: flex !important;
  align-items: center;
  justify-content: center;
}

/* ── Level layout ── */
.np-level {
  gap: 12px;
  flex-wrap: nowrap;
  width: 100%;
}
.np-disc-wrap {
  flex: 0 0 72px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.np-center-block {
  flex: 1 1 auto;
  flex-direction: column !important;
  display: flex;
  min-width: 0;
  justify-content: center;
}
.np-right {
  flex: 0 0 120px;
  display: flex;
  justify-content: flex-end;
}

/* ── Spinning disc ── */
.np-disc {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: radial-gradient(circle at 35% 35%, #3a1566, #120a1e);
  border: 2px solid rgba(170, 59, 255, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 16px rgba(170, 59, 255, 0.35);
  color: rgba(170, 59, 255, 0.85);
  font-size: 20px;
  transition: box-shadow 0.4s;
  flex-shrink: 0;
}
.np-disc--spinning {
  animation: disc-spin 7s linear infinite;
  box-shadow: 0 0 26px rgba(170, 59, 255, 0.65), 0 0 8px rgba(170, 59, 255, 0.3) inset;
}
@keyframes disc-spin { to { transform: rotate(360deg); } }

.np-art {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
}

/* ── Song info ── */
.np-info {
  flex: 0 0 180px;
  min-width: 0;
  overflow: hidden;
}

.np-info-lines {
  min-width: 0;
  width: 100%;
}

.np-marquee-viewport {
  width: 100%;
  overflow: hidden;
}

.np-title,
.np-artist,
.np-album,
.np-genre {
  display: inline-block;
  white-space: nowrap;
  line-height: 1.3;
  margin: 0;
  transform: translateX(0);
  will-change: transform;
}

.np-marquee--active {
  animation: marquee 7s linear infinite alternate;
}

.np-title {
  color: #f0e8ff;
  font-size: 14px;
}

.np-artist {
  color: #c084fc !important;
}

@keyframes marquee {
  0%, 18% {
    transform: translateX(0);
  }
  82%, 100% {
    transform: translateX(calc(-1 * var(--marquee-offset, 0px)));
  }
}

/* ── Transport buttons ── */
.np-controls .button {
  background: rgba(255,255,255,0.07) !important;
  border-color: rgba(255,255,255,0.1) !important;
  color: rgba(255,255,255,0.65) !important;
  transition: background 0.18s, color 0.18s, transform 0.14s, box-shadow 0.18s !important;
}
.np-controls .button:hover {
  background: rgba(170, 59, 255, 0.2) !important;
  color: #fff !important;
  transform: scale(1.1);
}
.np-controls .button:active { transform: scale(0.92) !important; }

/* Big play button */
.np-play-btn {
  background: linear-gradient(135deg, #aa3bff, #7722dd) !important;
  border: none !important;
  color: #fff !important;
  width: 42px;
  height: 42px;
  box-shadow: 0 0 20px rgba(170, 59, 255, 0.55) !important;
}
.np-play-btn:hover {
  background: linear-gradient(135deg, #c060ff, #9030ef) !important;
  box-shadow: 0 0 28px rgba(170, 59, 255, 0.75) !important;
  transform: scale(1.08) !important;
}

/* Aux buttons (shuffle / repeat) active state — must match .np-controls .button specificity */
.np-controls .np-aux-btn--on {
  color: #c084fc !important;
  border-color: rgba(192, 132, 252, 0.4) !important;
  background: rgba(170, 59, 255, 0.15) !important;
}
.np-repeat-tag {
  position: absolute;
  top: 2px;
  right: 2px;
  font-size: 8px !important;
  height: 14px !important;
  padding: 0 3px !important;
  background: #aa3bff !important;
  color: #fff !important;
  border-radius: 3px !important;
  line-height: 14px !important;
}
/* relative positioning for the badge */
.np-aux-btn { position: relative; }

/* ── Scrubber row ── */
.np-scrubber-row { width: 100%; }
.np-time {
  min-width: 32px;
  text-align: center;
  flex-shrink: 0;
  font-variant-numeric: tabular-nums;
}

/* ── Volume row ── */
.np-volume-row { gap: 6px; }
.np-vol-btn {
  background: none !important;
  border: none !important;
  padding: 0 4px !important;
}

/* ── Custom range sliders ── */
.np-slider {
  -webkit-appearance: none;
  appearance: none;
  height: 4px;
  border-radius: 4px;
  outline: none;
  cursor: pointer;
  transition: height 0.15s;
}
.np-slider--scrub {
  flex: 1;
  background: linear-gradient(
    to right,
    #aa3bff var(--fill, 0%),
    rgba(255,255,255,0.15) var(--fill, 0%)
  );
}
.np-slider--vol {
  width: 72px;
  background: linear-gradient(
    to right,
    #aa3bff var(--fill, 100%),
    rgba(255,255,255,0.15) var(--fill, 100%)
  );
}
.np-slider:hover { height: 6px; }
.np-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 13px;
  height: 13px;
  border-radius: 50%;
  background: #d8b4fe;
  box-shadow: 0 0 6px rgba(170,59,255,0.7);
  cursor: pointer;
  transition: transform 0.14s;
}
.np-slider:hover::-webkit-slider-thumb {
  transform: scale(1.3);
  background: #fff;
}
.np-slider::-moz-range-thumb {
  width: 13px;
  height: 13px;
  border-radius: 50%;
  border: none;
  background: #d8b4fe;
  cursor: pointer;
}

/* ── Responsive ── */
@media (max-width: 768px) {
  /* .np-right  { display: none !important; } */
  .np-album  { display: none !important; }
}
@media (max-width: 500px) {
  /* .np-left  { display: none !important; } */
}
</style>
