import { defineStore } from 'pinia';
import { fetchPokemons, fetchPokemonDetails } from '@/services/api/pokemon.api';
import { ref, watch } from 'vue';
import type { PokemonListResponse, PokemonDetails  } from '@/services/types/pokemon.d';

const FAVORITES_KEY = 'pokemon_favorites';

export const usePokemonStore = defineStore('pokemon', () => {
  type PokemonWithFavorite = PokemonListResponse['results'][number] & {
    isFavorite: boolean;
  };

  const savedFavorites = JSON.parse(localStorage.getItem(FAVORITES_KEY) || '{}');

  const state = {
    list: ref<PokemonWithFavorite[]>([]),
    currentPokemon: ref<PokemonDetails | null>(null),
    loading: ref<boolean>(true),
    isModalOpen: ref<boolean>(false),
    favorites: ref<Record<string, boolean>>(savedFavorites)
  }

  const updateFavorites = () => {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(state.favorites.value));
  };
  watch(() => state.favorites.value, () => {
    updateFavorites();
  }, { deep: true });

  const actions = {
    async loadPokemons () {
      try {
        const pokemons = await fetchPokemons().then((response) => response.results);

        state.list.value = pokemons.map(pokemon => {
          const pokemonId = pokemon.url.split('/').filter(Boolean).pop() || '';
          return {
            ...pokemon,
            isFavorite: !!state.favorites.value[pokemonId]
          };
        });

        if (state.list.value.length > 0) {
          state.loading.value = false;
        }
      } catch (error) {
        console.error(error);
      }
    },

    async loadPokemonDetails (id: string) {
      try {
        const details = await fetchPokemonDetails(id);
        state.currentPokemon.value = {
          id: details.id,
          name: details.name,
          image: details.sprites.other['official-artwork'].front_default || details.sprites.front_default,
          weight: details.weight,
          height: details.height,
          types: details.types.map(typeInfo => typeInfo.type.name)
        };
      } catch (error) {
        console.error(error);
      }
    },

    closeModal () {
      state.isModalOpen.value = false;
    },

    openModal () {
      state.isModalOpen.value = true;
    },
  };

  // Métodos para manejar favoritos
  const toggleFavorite = (pokemonId: string) => {
    state.favorites.value = {
      ...state.favorites.value,
      [pokemonId]: !state.favorites.value[pokemonId]
    };
    // Actualizar el estado en la lista
    const pokemon = state.list.value.find(p => p.url.includes(`/${pokemonId}/`));
    if (pokemon) {
      pokemon.isFavorite = !pokemon.isFavorite;
    }
  };

  return {
    state,
    actions: {
      ...actions,
      toggleFavorite
    },
  };
});