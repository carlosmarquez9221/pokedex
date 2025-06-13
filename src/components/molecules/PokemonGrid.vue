<script setup lang="ts">
  import type { PokemonListResponse } from '@/services/types/pokemon.d';
  import AppCard from '@/components/atoms/AppCard.vue';
  import { usePokemonStore } from '@/stores/pokemon.store';

  type PokemonWithFavorite = PokemonListResponse['results'][number] & {
    isFavorite: boolean;
  };

  defineProps<{ pokemons: PokemonWithFavorite[] }>();

  const pokemonStore = usePokemonStore();

  const capitalizeFirstLetter = (str: string): string => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const toggleFavorite = (pokemon: PokemonWithFavorite) => {
    const pokemonId = pokemon.url.split('/').filter(Boolean).pop() || '';
    pokemonStore.actions.toggleFavorite(pokemonId);
  };

  const handlePokemonClick = async (pokemon: PokemonWithFavorite) => {
    try {
      await pokemonStore.actions.loadPokemonDetails(pokemon.name);

      if (pokemonStore.state.currentPokemon) {
        pokemonStore.state.currentPokemon.isFavorite = pokemon.isFavorite;
      }

      pokemonStore.actions.openModal();
    } catch (error) {
      console.error(error);
    }
  };
</script>

<template>
  <div class="pokemon-grid">
    <div v-for="pokemon in pokemons" :key="pokemon.name" class="pokemon-card">
      <AppCard @click="handlePokemonClick(pokemon)">
        <p class="pokemon-name">{{ capitalizeFirstLetter(pokemon.name) }}</p>
        <div
          class="star-icon"
          :class="{ active: pokemon.isFavorite }"
          @click.stop="toggleFavorite(pokemon)"
        >
          <i class="fa-solid fa-star"></i>
        </div>
      </AppCard>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .pokemon-grid {
    position: relative;

    .star-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 34px;
      height: 34px;
      background-color: $background-lighter;
      border-radius: 50%;
      cursor: pointer;

      i {
        color: $body-text-tertiary;
        font-size: $font-size-subtitle;
        transition: color 0.2s ease;
      }

      &.active i {
        color: $secondary;
      }
    }
  }
</style>