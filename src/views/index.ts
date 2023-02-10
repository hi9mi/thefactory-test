import { createRouter, createWebHistory } from 'vue-router';
import HomeLink from '@thefactory/components/home-link.vue';

const routesMap = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@thefactory/views/home-view.vue'),
    meta: {
      title: 'Home',
    },
  },
  {
    path: '/favorites',
    name: 'Favorites',
    components: {
      default: () => import('@thefactory/views/favorites-view.vue'),
      HomeLink,
    },
    meta: {
      title: 'Favorites',
    },
  },
  {
    path: '/photo/:id',
    name: 'PhotoDetails',
    components: {
      default: () => import('@thefactory/views/photo-details-view.vue'),
      HomeLink,
    },
    meta: {
      title: 'Photo Details',
    },
  },
];

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routesMap,
});

router.beforeEach((to, from, next) => {
  const title = to.meta.title;

  if (typeof title === 'string') {
    document.title = title;
  } else {
    document.title = 'Art galery';
  }

  next();
});
