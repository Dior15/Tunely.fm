<script setup>
import SongList from "./components/SongList.vue"
import NowPlaying from './components/NowPlaying.vue'
import NavBar from './components/NavBar.vue'

</script>

<template>
  
  <div id="tunely-app">
    <NavBar />
    <main class="tunely-main">
      <SongList />
    </main>
    <NowPlaying />
  </div>
</template>

<style>
/* ── Reset ── */
*, *::before, *::after { box-sizing: border-box; }

html, body {
  margin: 0;
  padding: 0;
  height: 100%;
  background: #0d0814;
  color: #e5e7eb;
  font-family: 'Inter', 'Segoe UI', system-ui, sans-serif;
  font-size: 14px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Override any Bulma/old styles that might bleed in */
h1, h2, h3, p { margin: 0; }
ul { margin: 0; padding: 0; list-style: none; }
button { font-family: inherit; }

/* ── App shell ── */
#tunely-app {
  display: flex;
  flex-direction: column;
  height: 100svh;
  max-width: 1280px;
  margin: 0 auto;
  border-inline: 1px solid rgba(255, 255, 255, 0.06);
  background: linear-gradient(165deg, #110920 0%, #0d0814 55%, #0a0c1a 100%);
  overflow: hidden;
}

/* ── Scrollable song list area ── */
.tunely-main {
  flex: 1;
  overflow-y: auto;
  background:
    radial-gradient(ellipse 70% 35% at 50% -5%, rgba(120, 40, 200, 0.16) 0%, transparent 70%);
}

/* ── Scrollbar ── */
.tunely-main::-webkit-scrollbar        { width: 5px; }
.tunely-main::-webkit-scrollbar-track  { background: transparent; }
.tunely-main::-webkit-scrollbar-thumb  { background: rgba(170,59,255,0.28); border-radius: 3px; }
.tunely-main::-webkit-scrollbar-thumb:hover { background: rgba(170,59,255,0.5); }
</style>
