import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import { createPinia } from 'pinia';

import App from './app.vue';
import HomeLink from '@thefactory/components/home-link.vue';

import './style.css';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@thefactory/views/home-view.vue'),
  },
  {
    path: '/favorites',
    name: 'Favorites',
    components: {
      default: import('@thefactory/views/favorites-view.vue'),
      HomeLink,
    },
  },
  {
    path: '/photo',
    name: 'PhotoDetails',
    components: {
      default: import('@thefactory/views/photo-details-view.vue'),
      HomeLink,
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

const app = createApp(App);

app.use(router);
app.use(createPinia());
app.mount('#app');
