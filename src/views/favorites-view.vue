<script setup lang="ts">
import PhotoCard from '@thefactory/components/photo-card.vue';

import { useFavoritesStore } from '@thefactory/stores/favorites';

const { favorites } = useFavoritesStore();
</script>

<template>
  <div class="line"></div>
  <h1 class="title">Избранное</h1>

  <ul class="photos">
    <li
      v-for="favoritesPhoto of favorites"
      :key="favoritesPhoto.id"
      class="photo"
    >
      <photo-card
        :id="favoritesPhoto.id"
        :alt="favoritesPhoto.alt_description"
        :src="favoritesPhoto.urls.small"
      />
    </li>
  </ul>
</template>

<style scoped>
.line {
  /* display: none; */
  height: 0;
  width: 100%;
  background-color: #c4c4c4;
  margin-bottom: 40px;
}

.title {
  text-align: center;
  font-size: 36px;
  font-weight: 700;
}

.photos {
  margin-top: 50px;
  list-style-type: none;
  display: grid;
  gap: 20px;
  grid-template-columns: 330px;
  grid-template-rows: 330px;
  justify-content: center;
}

.photo {
  height: 330px;
  width: 330px;
}

@media screen and (min-width: 786px) {
  .line {
    height: 16px;
    margin-bottom: 90px;
  }

  .title {
    font-size: 72px;
  }

  .photos {
    margin-top: 100px;
    grid-template-columns: repeat(2, 330px);
    grid-template-rows: 330px;
  }
}

@media screen and (min-width: 1100px) {
  .photos {
    grid-template-columns: repeat(3, 330px);
  }
}

@media screen and (min-width: 1320px) {
  .photos {
    grid-template-columns: repeat(3, 410px);
    grid-template-rows: 410px;
  }

  .photo {
    height: 410px;
    width: 410px;
  }
}
</style>
