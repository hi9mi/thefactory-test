<script setup lang="ts">
defineProps<{ term: string }>();
const emit = defineEmits<{
  (e: 'update:term', value: string): void;
}>();

const updateTermFilter = (event: Event) => {
  if (event.target instanceof HTMLInputElement) {
    emit('update:term', event.target.value);
  }
};
</script>

<template>
  <div class="container">
    <div class="input-container">
      <label class="label">
        <input
          :value="term"
          @input="updateTermFilter"
          class="input"
          type="text"
          placeholder="Поиск"
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="search-icon"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>
      </label>
    </div>
  </div>
</template>

<style scoped>
.container {
  background-image: url('../assets/mobile-search-bg.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  padding: 80px 20px;
  margin-bottom: 100px;
}

.input-container {
  display: flex;
  justify-content: center;
}

.label {
  display: block;
  height: 100%;
  width: 100%;
  max-width: 866px;
  position: relative;
  top: 0;
  left: 0;
}

.input {
  width: 100%;
  max-width: 866px;
  margin: 0;
  border: none;
  padding: 20px 60px 20px 40px;
  font-size: 24px;
}

.input::placeholder {
  color: #000000;
}

.search-icon {
  position: absolute;
  right: 20px;
  top: 50%;
  width: 23px;
  height: 23px;
  transform: translate(0, -50%);
}

@media screen and (min-width: 786px) {
  .container {
    border-bottom: 16px solid #c4c4c4;
    background-image: url('../assets/desktop-search-bg.jpg');
  }
}
</style>
