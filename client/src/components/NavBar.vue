<template>
  <nav class="navbar tunely-navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <a class="navbar-item tunely-logo" href="/">Tunely.fm</a>
    </div>

    <div class="navbar-menu is-active">
      <div class="navbar-end">
        <a class="navbar-item" href="/pages/about.html">About</a>
        <a class="navbar-item" href="/pages/contact.html">Contact</a>
        <a class="navbar-item" href="/pages/info.html">Info</a>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.tunely-navbar {
  padding: 0.55rem 1rem;
  border: none;
  background:
    radial-gradient(circle at 14% -160%, rgba(93, 172, 255, 0.3), transparent 48%),
    linear-gradient(135deg, rgba(20, 10, 36, 0.86), rgba(12, 18, 36, 0.86));
  backdrop-filter: blur(14px) saturate(140%);
  -webkit-backdrop-filter: blur(14px) saturate(140%);
  box-shadow: 0 10px 28px rgba(0, 0, 0, 0.32);
}

.navbar-menu {
  display: flex;
  justify-content: flex-end;
  background: transparent;
  box-shadow: none;
}

.tunely-logo {
  font-weight: 800;
  letter-spacing: 0.04em;
  font-size: 1.05rem;
  color: #ffffff;
  text-transform: uppercase;
  text-shadow: 0 0 18px rgba(192, 132, 252, 0.35);
}

.navbar-item {
  color: #e5e7eb;
  border-radius: 999px;
  margin-left: 0.35rem;
  padding-inline: 0.95rem;
  transition: background 0.2s ease, color 0.2s ease, transform 0.2s ease;
}

.navbar-item:hover {
  color: #ffffff;
  background: linear-gradient(135deg, rgba(170, 59, 255, 0.3), rgba(74, 152, 255, 0.28));
  transform: translateY(-1px);
}

.navbar-brand .navbar-item:hover {
  background: transparent;
  transform: none;
}

@media (max-width: 768px) {
  .tunely-navbar {
    padding: 0.45rem 0.65rem;
  }

  .navbar-end {
    display: flex;
    justify-content: flex-end;
    width: 100%;
  }

  .navbar-item {
    margin-left: 0.25rem;
    padding-inline: 0.7rem;
    font-size: 0.82rem;
  }
}
</style>
