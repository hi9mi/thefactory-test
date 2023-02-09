import { ref, watch } from 'vue';
import { defineStore } from 'pinia';
import type { Photo } from '@thefactory/shared/types';

export const useFavoritesStore = defineStore('favorites', {
  state: () => {
    const favorites = ref<Photo[]>([]);

    const favoritesFromLS = localStorage.getItem('favorites');
    if (favoritesFromLS) {
      favorites.value = JSON.parse(favoritesFromLS);
    }

    watch(
      favorites,
      (state) => {
        localStorage.setItem('favorites', JSON.stringify(state));
      },
      { deep: true }
    );
    return { favorites };
  },
  actions: {
    toggleFavorite(photo: Photo) {
      const alreadyFavorite = Boolean(
        this.favorites.find((favoritePhoto) => favoritePhoto.id === photo.id)
      );

      if (alreadyFavorite) {
        this.favorites = this.favorites.filter(
          (favoritePhoto) => favoritePhoto.id !== photo.id
        );
      } else {
        this.favorites.push(photo);
      }
    },
  },
});
