<template>
  <header class="header">
    <div class="container">
      <div class="logo-container">
        <img class="logo" src="../assets/logo.png" alt="Application logo" />
      </div>
      <div class="links">
        <router-view name="HomeLink" />
        <router-link to="/favorites" class="link">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="link-icon"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
            />
          </svg>
          <span class="link-text">Избранное</span>
        </router-link>
      </div>
    </div>
  </header>
</template>

<style scoped>
.header {
  background-color: #000;
}

.container {
  width: 100%;
  max-width: 1480px;
  margin: auto;
  padding: 30px 20px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100px;
}

.logo-container {
  height: 100%;
}

.logo {
  height: 100%;
  object-fit: cover;
  object-position: center center;
}

.links {
  display: flex;
  align-items: center;
  gap: 30px;
}

.link {
  color: #ffffff;
  display: flex;
  gap: 5px;
  align-items: center;
  text-decoration: none;
}

.link-icon {
  width: 25px;
  height: 23px;
  fill: none;
  transition: 0.3s all;
}

.link:hover .link-icon {
  fill: currentColor;
}

.link-icon.search {
  fill: none;
}

.link-text {
  display: none;
  font-size: 18px;
}

@media screen and (min-width: 786px) {
  .link-text {
    display: inline;
  }
}
</style>
