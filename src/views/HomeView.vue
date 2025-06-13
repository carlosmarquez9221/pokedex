<script setup lang="ts">
  import { defineAsyncComponent, onMounted } from 'vue';
  import { usePokemonStore } from '@/stores/pokemon.store';

  import DefaultLayout from '@/components/templates/DefaultLayout.vue';
  const PokemonWelcome = defineAsyncComponent(() => import('@/components/molecules/PokemonWelcome.vue'));

  const pokemonStore = usePokemonStore();

  onMounted(() => {
    pokemonStore.state.loading = false;
  });
</script>

<template>
  <DefaultLayout>
    <PokemonWelcome />
  </DefaultLayout>
</template>