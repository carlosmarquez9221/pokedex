<script setup lang="ts">
  import { defineAsyncComponent } from 'vue';
  import { usePokemonStore } from '@/stores/pokemon.store';

  const pokemonStore = usePokemonStore();

  const PokemonCatalogContainer = defineAsyncComponent(() => import('@/components/organisms/PokemonCatalogContainer.vue'));
  const PokemonModal = defineAsyncComponent(() => import('@/components/molecules/PokemonModal.vue'));
</script>

<template>
  <PokemonCatalogContainer />

  <PokemonModal
    :isOpen="pokemonStore.state.isModalOpen"
    :pokemon="pokemonStore.state.currentPokemon"
    @close="pokemonStore.actions.closeModal"
  />
</template>
