// Vue
import { ref, watch } from 'vue';
import { defineStore } from 'pinia';

// Services
import { fetchPokemons, fetchPokemonDetails } from '@/services/api/pokemon.api';
import type { PokemonDetails } from '@/services/types/pokemon.d';

const FAVORITES_KEY = 'pokemon_favorites';

export const usePokemonStore = defineStore('pokemon', () => {
  const savedFavorites = JSON.parse(localStorage.getItem(FAVORITES_KEY) || '{}');

  const state = {
    list: ref<PokemonDetails[]>([]),
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
    async loadPokemons() {
      state.loading.value = true;

      try {
        const basicList = await fetchPokemons().then((response) => response.results);

        const detailedList = await Promise.all(
          basicList.map(async (pokemon) => {
            const pokemonId = pokemon.url.split('/').filter(Boolean).pop() || pokemon.name;
            const details = await fetchPokemonDetails(pokemonId);
            const image =
              details.sprites?.other?.['official-artwork']?.front_default ||
              details.sprites?.front_default ||
              `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${details.id}.png`;

            return {
              id: details.id,
              name: details.name,
              image,
              weight: details.weight,
              height: details.height,
              types: details.types ? details.types.map((typeInfo) => typeInfo.type.name) : [],
              ability: details.abilities?.length > 0 ? details.abilities[0].ability.name : undefined,
              category: details.species?.name || undefined,
              description: details.species?.name,
              genderRate: details.gender_rate,
              isFavorite: !!state.favorites.value[details.id] || !!state.favorites.value[details.name]
            };
          })
        );

        state.list.value = detailedList;
      } catch (error) {
        console.error(error);
      } finally {
        state.loading.value = false;
      }
    },

    async loadPokemonDetails(id: string) {
      try {
        const details = await fetchPokemonDetails(id);
        const image =
          details.sprites?.other?.['official-artwork']?.front_default ||
          details.sprites?.front_default ||
          `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${details.id}.png`;

        state.currentPokemon.value = {
          id: details.id,
          name: details.name,
          image,
          weight: details.weight,
          height: details.height,
          types: details.types ? details.types.map(typeInfo => typeInfo.type.name) : [],
          ability: details.abilities?.length > 0 ? details.abilities[0].ability.name : undefined,
          category: details.species?.name || undefined,
          description: details.species?.name,
          genderRate: details.gender_rate,
          isFavorite: !!state.favorites.value[details.id] || !!state.favorites.value[details.name]
        };
      } catch (error) {
        console.error(error);
      }
    },

    closeModal() {
      state.isModalOpen.value = false;
    },

    openModal() {
      state.isModalOpen.value = true;
    },
  };

  // Métodos para manejar favoritos
  const toggleFavorite = (pokemonId: string | number) => {
    const idStr = String(pokemonId);
    const isFav = !state.favorites.value[idStr];

    state.favorites.value = {
      ...state.favorites.value,
      [idStr]: isFav
    };

    // Actualizar el estado en la lista
    const pokemon = state.list.value.find(p => String(p.id) === idStr || p.name === idStr);
    if (pokemon) {
      pokemon.isFavorite = isFav;
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