import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: () => import('@/views/HomeView.vue'),
    },
    {
      path: '/pokemon-catalog',
      component: () => import('@/views/PokemonCatalogView.vue'),
    },
  ],
});

export default router;