<script setup>
  import { onMounted } from "vue";
  import { usePlayer } from '../composables/usePlayer.js'

  const { songs, currentSong, isPlaying, fetchSongs, playSong, togglePlay } = usePlayer()

  onMounted(fetchSongs)
</script>

<template>

  <div class="box mt-3 mb-4 ml-6 mr-6">
    <h1 class="title">Song List</h1>
  
    <div id="songList columns">
      <div v-for="song in songs" class="songTile box is-flex mb-1 p-1 has-text-left is-vcentered" :class="{'isPlaying': currentSong != null && currentSong.id == song.id}">
        <span class="songTitle column is-one-third is-vcentered">
          <button v-if="currentSong != null && currentSong.id == song.id && isPlaying" @click="togglePlay()"><font-awesome-icon  icon="pause" /></button>
          <button v-else-if="currentSong != null && currentSong.id == song.id && !isPlaying" @click="togglePlay()"><font-awesome-icon  icon="play" /></button>
          <button v-else @click="playSong(song.id)"><font-awesome-icon icon="play" /></button>
          {{ song.title }}
        </span>
        <span class="artist column is-one-quarter">{{ song.artist }}</span>
        <span class="album column is-one-quarter">{{ song.album }}</span>
        <span class="year column has-text-right">{{ song.year }}</span>
      </div>
    </div>
  </div>

</template>

<style scoped>
  .songTile span {
    white-space: nowrap;
    overflow: auto;
    scrollbar-width: none;
    -ms-overflow-style: none;
  }
  .songTile span:-webkit-scrollbar {
    display: none;
  }

  .isPlaying {
    background-image: linear-gradient(to right, #9935e7, #14161a);
  }
</style>