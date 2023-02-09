<script setup lang="ts">
defineProps<{ src: string; alt: string; id: string }>();
</script>

<template>
  <router-link :to="`/photo?id=${id}`">
    <img
      :src="src"
      :alt="alt"
      class="image"
      fetchpriority="high"
      decoding="async"
      loading="lazy"
  /></router-link>
</template>

<style scoped>
.image {
  height: 100%;
  width: 100%;
  object-fit: cover;
  object-position: center;
  border-radius: 8px;
}
</style>
