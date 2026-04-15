<script setup>
import HelloWorld from './components/HelloWorld.vue'
import SongList from "./components/SongList.vue"

// navbar toggle based on screen-size
import {ref} from 'vue'
const isMenuActive = ref(false)

function toggleMenu() {
  isMenuActive.value = !isMenuActive.value
}

</script>

<template>
  <!-- Bulma style navbar -->
  <nav class="navbar is-dark" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <a class="navbar-item" href="/">
        <strong>Tunely.fm</strong>
      </a>

      <a 
        role="button" 
        class="navbar-burger" 
        :class="{ 'is-active': isMenuActive }" 
        aria-label="menu" 
        aria-expanded="false" 
        @click="toggleMenu"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div class="navbar-menu" :class="{ 'is-active': isMenuActive }">
      <div class="navbar-start">
        <a class="navbar-item" href="/">Home</a>
        <a class="navbar-item" href="../public/pages/about.html">About</a>
        <a class="navbar-item" href="../public/pages/contact.html">Contact Us</a>
        <a class="navbar-item" href="../public/pages/info.html">Info</a>
      </div>
    </div>
  </nav>

  <SongList />
  <HelloWorld />
</template>
