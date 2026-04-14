<script setup>
  import {ref, onMounted} from "vue";

  let songs = ref([]);

  onMounted(async () => {
    try {
      const response = await fetch("http://localhost:3000/api/songs");
      songs.value = await response.json();
    } catch (e) {
      console.error("songs.json failed to load.", e);
    }
  });

  let currentlyPlayingURL = new Audio();

  function playSong(songID) {
    currentlyPlayingURL.pause();
    currentlyPlayingURL = new Audio(`http://localhost:3000/api/songs/stream?id=${songID}`);

    currentlyPlayingURL.addEventListener("canplaythrough", () => {
      currentlyPlayingURL.play();
    });
  }

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