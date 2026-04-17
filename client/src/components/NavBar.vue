<script setup>

  import {ref} from "vue"
  const emit = defineEmits(["navigate"])
  const isMenuActive = ref(false)
  function toggleMenu() {isMenuActive.value = !isMenuActive.value}

</script>

<template>
  <nav class="navbar tunely-navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <a class="navbar-item tunely-logo" href="/" aria-label="Tunely.fm home">
        <svg
          class="tunely-logo-svg"
          viewBox="0 0 228 44"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-labelledby="tunelyLogoTitle"
        >
          <title id="tunelyLogoTitle">Tunely.fm</title>
          <defs>
            <linearGradient id="tunelyMarkGradient" x1="6" y1="6" x2="42" y2="38" gradientUnits="userSpaceOnUse">
              <stop offset="0" stop-color="#56f2ff" />
              <stop offset="0.52" stop-color="#80b3ff" />
              <stop offset="1" stop-color="#d18dff" />
            </linearGradient>
            <linearGradient id="tunelyTextGradient" x1="45" y1="9" x2="208" y2="37" gradientUnits="userSpaceOnUse">
              <stop offset="0" stop-color="#f6fbff" />
              <stop offset="0.58" stop-color="#b8d9ff" />
              <stop offset="1" stop-color="#dda7ff" />
            </linearGradient>
            <filter id="tunelyGlow" x="-20%" y="-35%" width="140%" height="170%" color-interpolation-filters="sRGB">
              <feGaussianBlur stdDeviation="1.8" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <g filter="url(#tunelyGlow)">
            <!-- Base background circle with low opacity -->
            <circle cx="23" cy="22" r="16" fill="url(#tunelyMarkGradient)" fill-opacity="0.24" />
            <!-- Outer thin stroke ring -->
            <circle cx="23" cy="22" r="15" stroke="#a8c9ff" stroke-opacity="0.34" stroke-width="1.1" fill="none" />
            
            <!-- Music note: Head (angled ellipse) -->
            <ellipse cx="19.6" cy="28.1" rx="4.9" ry="3.85" fill="url(#tunelyMarkGradient)" transform="rotate(-24 19.6 28.1)" />
            <!-- Music note: Stem -->
            <path d="M22.6 12.1v14.8" stroke="url(#tunelyMarkGradient)" stroke-width="2.65" stroke-linecap="round" />
            <!-- Music note: Flag/Tail -->
            <path
              d="M22.6 12.2c4.4 0.2 6.95 2.05 8.4 4.7"
              stroke="url(#tunelyMarkGradient)"
              stroke-width="2.45"
              stroke-linecap="round"
              fill="none"
            />
            
            <!-- Company Wordmark -->
            <text x="52" y="31" fill="url(#tunelyTextGradient)">
              TUNELY<tspan dx="6" font-size="16" fill="#f4f8ff">.FM</tspan>
            </text>
          </g>
        </svg>
      </a>
    </div>

    <div class="navbar-menu is-active">
      <div class="navbar-end">
        <a class="navbar-item" style="cursor: pointer;" @click="emit('navigate', 'home')">Home</a>
        <a class="navbar-item" style="cursor: pointer;" @click="emit('navigate', 'stats')">Stats</a>
        <a class="navbar-item" href="/pages/about.html">About</a>
        <a class="navbar-item" href="/pages/contact.html">Contact</a>
        <a class="navbar-item" href="/pages/info.html">Info</a>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.tunely-navbar {
  min-height: unset;
  padding: 0.4rem 0.25rem;
  border: none;
  background:
    radial-gradient(circle at 14% -160%, rgba(93, 172, 255, 0.3), transparent 48%),
    linear-gradient(135deg, rgba(20, 10, 36, 0.86), rgba(12, 18, 36, 0.86));
  backdrop-filter: blur(14px) saturate(140%);
  -webkit-backdrop-filter: blur(14px) saturate(140%);
  box-shadow: 0 10px 28px rgba(0, 0, 0, 0.32);
}

.tunely-navbar .navbar-menu {
  display: flex;
  justify-content: flex-end;
  background: transparent;
  box-shadow: none;
  padding: 0;
}

.tunely-logo-svg {
  display: block;
  height: 3.5rem;
  width: 17rem; /* 3.5 * (228/44) = 18.13 to prevent preserveAspectRatio horizontal padding */
  max-height: none;
  overflow: visible;
}

.tunely-logo-svg text {
  font-family: "Trebuchet MS", "Gill Sans", "Segoe UI", sans-serif;
  font-size: 29px;
  font-weight: 800;
  letter-spacing: 1.7px;
}

.tunely-navbar .navbar-item {
  color: #e5e7eb;
  border-radius: 999px;
  margin-left: 0.35rem;
  padding: 0.4rem 0.95rem;
  transition: background 0.2s ease, color 0.2s ease, transform 0.2s ease;
}

.tunely-navbar .tunely-logo {
  display: flex;
  align-items: center;
  padding: 0.1rem 0.15rem !important;
  color: #ffffff;
}

.tunely-navbar .navbar-item:hover {
  color: #ffffff;
  background: linear-gradient(135deg, rgba(170, 59, 255, 0.3), rgba(74, 152, 255, 0.28));
  transform: translateY(-1px);
}

.tunely-navbar .navbar-brand .navbar-item:hover {
  background: transparent;
  transform: none;
}

@media (max-width: 768px) {
  .tunely-navbar {
    padding: 0.3rem 0.15rem;
  }

  .tunely-navbar .navbar-end {
    display: flex;
    justify-content: flex-end;
    width: 100%;
  }

  .tunely-navbar .navbar-item {
    margin-left: 0.25rem;
    padding: 0.35rem 0.7rem;
    font-size: 0.82rem;
  }

  .tunely-logo-svg {
    height: 2.8rem;
    width: 12rem;
  }

  .tunely-logo-svg text {
    font-size: 23px;
    letter-spacing: 1.28px;
  }
}
</style>
