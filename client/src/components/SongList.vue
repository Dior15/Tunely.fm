<script setup>
  import { onMounted } from "vue";
  import { usePlayer } from '../composables/usePlayer.js'

  const { songs, fetchSongs, playSong } = usePlayer()

  onMounted(fetchSongs)
</script>

<template>

  <div class="box mt-3 mb-4 ml-6 mr-6">
    <h1 class="title">Song List</h1>
  
    <div id="songList columns">
      <div v-for="song in songs" class="songTile box is-flex mb-1 p-1 has-text-left">
        <span class="songTitle column is-one-third"><button @click="playSong(song.id)"><font-awesome-icon icon="circle-play" /></button> {{ song.title }}</span>
        <span class="artist column is-one-quarter">{{ song.artist }}</span>
        <span class="album column is-one-quarter">{{ song.album }}</span>
        <span class="year column has-text-right">{{ song.year }}</span>
      </div>
    </div>
  </div>

</template>