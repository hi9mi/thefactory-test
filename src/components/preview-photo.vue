<script setup lang="ts">
import { onBeforeUnmount, onMounted } from 'vue';

defineProps<{ isOpen: boolean; src: string; alt: string }>();
const emit = defineEmits<{
  (e: 'close', value: boolean): void;
  (e: 'open', value: boolean): void;
}>();

const open = () => {
  document.body.style.overflow = 'hidden';
  emit('open', true);
};
const close = () => {
  document.body.style.overflow = 'unset';
  emit('close', false);
};

const escapeListener = (event: KeyboardEvent) => {
  if (event.key === 'Escape') {
    close();
  }
};

onMounted(() => {
  document.addEventListener('keydown', escapeListener);
});

onBeforeUnmount(() => {
  document.removeEventListener('keydown', escapeListener);
});
</script>

<template>
  <teleport v-if="isOpen" to="body">
    <div class="pv-background"></div>
    <div class="pv-container">
      <button @click="close" class="pv-close-btn">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="pv-close-icon"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
      <img :src="src" :alt="alt" loading="lazy" class="pv-photo" />
    </div>
  </teleport>
  <div class="pv-photo-container">
    <img :src="src" :alt="alt" loading="lazy" class="photo" />
    <button @click="open" class="pv-open-btn">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="pv-open-icon"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"
        />
      </svg>
    </button>
  </div>
</template>

<style scoped>
.pv-background {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background-color: #000000;
  opacity: 0.8;
}

.pv-container {
  height: 80%;
  width: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.pv-photo {
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center;
}

.pv-close-btn {
  position: absolute;
  right: 40px;
  top: -40px;
  background-color: transparent;
  border: none;
  outline: none;
  cursor: pointer;
}

.pv-close-icon {
  color: #ffffff;
  width: 24px;
  height: 24px;
}

.pv-photo-container {
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.photo {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.pv-open-btn {
  position: absolute;
  bottom: 30px;
  right: 30px;
  background-color: transparent;
  border: none;
  outline: none;
  cursor: pointer;
}

.pv-open-icon {
  color: #ffffff;
  mix-blend-mode: difference;
  width: 24px;
  height: 24px;
}
</style>
