<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';

import AppLoader from '@thefactory/components/app-loader.vue';
import PreviewPhoto from '@thefactory/components/preview-photo.vue';

import { useFavoritesStore } from '@thefactory/stores/favorites';
import { getPhotoDetails } from '@thefactory/shared/api';
import type { Photo } from '@thefactory/shared/types';

const router = useRouter();
const route = useRoute();
const photo = ref<Photo | null>(null);
const isLoadingPhoto = ref(false);
const favoritesStore = useFavoritesStore();
const { favorites } = storeToRefs(favoritesStore);
const isOpenPreviewPhoto = ref(false);

const isFavoritePhoto = computed(() => {
  return Boolean(
    favorites.value.find(
      (favoritePhoto) => favoritePhoto.id === photo.value?.id
    )
  );
});

onMounted(async () => {
  isLoadingPhoto.value = true;
  await router.isReady();
  const photoId = route.params.id as string;
  photo.value = await getPhotoDetails(photoId);
  isLoadingPhoto.value = false;
});
</script>

<template>
  <div class="background-container">
    <app-loader v-if="isLoadingPhoto" />
    <template v-else>
      <img
        :src="photo?.urls.full"
        :alt="photo?.alt_description"
        class="background"
      />
      <div class="container">
        <div class="details">
          <div class="author">
            <img
              :src="photo?.user.profile_image.medium"
              :alt="photo?.user.username"
              loading="lazy"
              class="author-avatar"
            />
            <div class="author-details">
              <h3 class="author-name">
                {{ photo?.user.first_name }} {{ photo?.user.last_name }}
              </h3>
              <p class="author-username">@{{ photo?.user.username }}</p>
            </div>
          </div>
          <div class="actions">
            <button
              @click="favoritesStore.toggleFavorite(photo!)"
              class="action favorite"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                :class="{
                  'is-favorite': isFavoritePhoto,
                }"
                class="action-icon"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                />
              </svg>
            </button>
            <a
              :href="photo?.links.download"
              target="_blank"
              class="action download"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="action-icon"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
                />
              </svg>
              <span class="download-text">Скачать</span>
            </a>
          </div>
        </div>
        <preview-photo
          :src="photo?.urls.full! ?? ''"
          :alt="photo?.alt_description! ?? ''"
          :is-open="isOpenPreviewPhoto"
          @close="isOpenPreviewPhoto = false"
          @open="isOpenPreviewPhoto = true"
        />
      </div>
    </template>
  </div>
</template>

<style scoped>
.container {
  width: 100%;
  max-width: 1480px;
  height: 100%;
  margin: auto;
  padding: 0 20px 100px;
}
.background-container {
  position: relative;
  left: 0;
  top: 0;
  height: calc(100vh - 140px);
  padding-top: 40px;
}

.background {
  position: absolute;
  left: 0;
  top: 0;
  z-index: -1;
  height: 75%;
  width: 100%;
  object-fit: cover;
  object-position: center;
  filter: grayscale(100%);
  -webkit-filter: grayscale(100%);
}

.details {
  display: flex;
  justify-content: space-between;
  align-items: center;
  row-gap: 15px;
  column-gap: 30px;
  flex-wrap: wrap;
  margin-bottom: 45px;
}

.author {
  display: flex;
  align-items: center;
  gap: 10px;
}

.author-avatar {
  border: 1px solid #ffffff;
  border-radius: 50%;
  width: 64px;
  height: 64px;
  object-fit: cover;
  object-position: center;
}

.author-details .author-name {
  font-size: 30px;
  color: #ffffff;
  mix-blend-mode: difference;
}

.author-details .author-username {
  font-size: 18px;
  color: #ffffff;
  mix-blend-mode: difference;
}

.actions {
  display: flex;
  align-items: center;
  gap: 15px;
}

.action {
  padding: 13px;
  background: transparent;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 15px;
  color: #000000;
  text-decoration: none;
}

.action.favorite {
  background-color: #ffffff;
}

.action.download {
  padding-left: 20px;
  padding-right: 20px;
  background-color: #fff200;
}

.action-icon {
  width: 23px;
  height: 23px;
}

.is-favorite {
  fill: #ff0000;
  color: #ff0000;
}

.download-text {
  font-size: 20px;
}

@media screen and (max-width: 786px) {
  .action {
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
  }

  .download-text {
    display: none;
  }

  .details {
    margin-bottom: 25px;
  }

  .author-details .author-name {
    font-size: 18px;
    color: #000000;
  }

  .author-details .author-username {
    font-size: 14px;
    color: #bdbdbd;
  }

  .background {
    display: none;
  }
}
</style>
