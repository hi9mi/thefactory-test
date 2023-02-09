<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';

import TermFilter from '@thefactory/components/term-filter.vue';
import PhotoCard from '@thefactory/components/photo-card.vue';
import AppLoader from '@thefactory/components/app-loader.vue';

import { debounce } from '@thefactory/shared/libs';
import * as api from '@thefactory/shared/api';
import type { Photo, SearchPhotosResult } from '@thefactory/shared/types';

const router = useRouter();
const route = useRoute();
const randomPhotos = ref<Photo[]>([]);
const term = ref('');
const searchedPhotos = ref<SearchPhotosResult | null>(null);
const isLoadingPhotos = ref(false);
const currentPage = ref(1);

const showSearchedPhotos = computed(() => {
  if (searchedPhotos.value) {
    return searchedPhotos.value.results.length > 0;
  }
  return false;
});
const hasPrevPage = computed(() => {
  return currentPage.value === 1;
});
const hasNextPage = computed(() => {
  if (searchedPhotos.value) {
    return searchedPhotos.value.total_pages <= currentPage.value;
  }
  return true;
});

const nextPage = async () => {
  isLoadingPhotos.value = true;
  currentPage.value += 1;
  router.replace({ query: { search: term.value, page: currentPage.value } });
  searchedPhotos.value = await api.searchPhotos(term.value, currentPage.value);
  isLoadingPhotos.value = false;
};

const prevPage = async () => {
  isLoadingPhotos.value = true;
  currentPage.value -= 1;
  router.replace({ query: { search: term.value, page: currentPage.value } });
  searchedPhotos.value = await api.searchPhotos(term.value, currentPage.value);
  isLoadingPhotos.value = false;
};

const searchPhotosByTerm = async (term: string) => {
  isLoadingPhotos.value = true;
  searchedPhotos.value = await api.searchPhotos(term, currentPage.value);
  isLoadingPhotos.value = false;
};

const [debouncedSearchPhotos] = debounce(searchPhotosByTerm, 300);

onMounted(async () => {
  isLoadingPhotos.value = true;
  randomPhotos.value = await api.getRandomPhotos();
  isLoadingPhotos.value = false;
  await router.isReady();

  if (route.query.search) {
    term.value = route.query.search.toString();
  }
  if (route.query.page) {
    currentPage.value = Number(route.query.page);
  }
});

watch(term, (value, oldValue) => {
  if (!oldValue) {
    router.replace({ query: { search: value, page: currentPage.value } });
  } else {
    router.replace({ query: { search: value, page: 1 } });
  }
  if (value.trim().length > 1) {
    debouncedSearchPhotos(value);
  } else {
    searchedPhotos.value = null;
  }
});
</script>

<template>
  <term-filter v-model:term="term" />
  <div class="photos-container">
    <app-loader v-if="isLoadingPhotos" />
    <ul v-else class="photos">
      <template v-if="showSearchedPhotos">
        <li
          v-for="photo of searchedPhotos?.results"
          :key="photo.id"
          class="photo"
        >
          <photo-card
            :id="photo.id"
            :alt="photo.alt_description"
            :src="photo.urls.small"
          />
        </li>
      </template>
      <template v-else>
        <li
          v-for="randomPhoto of randomPhotos"
          :key="randomPhoto.id"
          class="photo"
        >
          <photo-card
            :id="randomPhoto.id"
            :alt="randomPhoto.alt_description"
            :src="randomPhoto.urls.small"
          />
        </li>
      </template>
    </ul>
    <div v-if="showSearchedPhotos && !isLoadingPhotos" class="buttons">
      <button @click="prevPage" class="button" :disabled="hasPrevPage">
        Предыдущая страница
      </button>
      <button @click="nextPage" class="button" :disabled="hasNextPage">
        Следующая страница
      </button>
    </div>
  </div>
</template>

<style scoped>
.photos-container {
  padding: 0 20px 100px;
}

.photos {
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

.buttons {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
  flex-wrap: wrap;
  margin-top: 40px;
}

.button {
  padding: 13px;
  background-color: #ffffff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
}

.button:disabled {
  background-color: #bdbdbd;
  cursor: default;
  pointer-events: none;
  box-shadow: none;
}

@media screen and (min-width: 786px) {
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
