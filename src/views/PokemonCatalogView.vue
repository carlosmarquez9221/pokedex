<script setup lang="ts">
  // Stores
  import { usePokemonStore } from '@/stores/pokemon.store';

  // Components
  import PokemonCatalogContainer from '@/components/organisms/PokemonCatalogContainer.vue';
  import PokemonModal from '@/components/molecules/PokemonModal.vue';

  const pokemonStore = usePokemonStore();
</script>

<template>
  <div class="pokemon-catalog-view">
    <PokemonCatalogContainer />

    <PokemonModal
      v-if="pokemonStore.state.currentPokemon"
      :isOpen="pokemonStore.state.isModalOpen"
      :pokemon="pokemonStore.state.currentPokemon"
      @close="pokemonStore.actions.closeModal"
      @toggle-favorite="pokemonStore.actions.toggleFavorite"
    />
  </div>
</template>
