import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import { createPinia } from 'pinia';

import App from './app.vue';
import { router } from '@thefactory/views';

import './style.css';

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.mount('#app');
