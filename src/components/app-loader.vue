<template>
  <img src="../assets/loader.svg" role="presentation" alt="" class="loader" />
</template>

<style scoped>
.loader {
  margin: auto;
  animation-name: spin;
  animation-duration: 3000ms;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
