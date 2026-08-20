<script setup lang="ts">
  import type { PokemonDetails } from '@/services/types/pokemon.d';
  import AppCard from '@/components/atoms/AppCard.vue';
  import { usePokemonStore } from '@/stores/pokemon.store';

  defineProps<{ pokemons: PokemonDetails[] }>();

  const pokemonStore = usePokemonStore();

  const typeConfig: Record<string, { label: string; icon: string; color: string }> = {
    grass: { label: 'Planta', icon: 'fa-leaf', color: '#70C157' },
    poison: { label: 'Veneno', icon: 'fa-biohazard', color: '#A65DBA' },
    fire: { label: 'Fuego', icon: 'fa-fire', color: '#F08030' },
    water: { label: 'Agua', icon: 'fa-droplet', color: '#6390F0' },
    bug: { label: 'Bicho', icon: 'fa-bug', color: '#A8B820' },
    flying: { label: 'Volador', icon: 'fa-feather', color: '#A890F0' },
    normal: { label: 'Normal', icon: 'fa-circle', color: '#A8A878' },
    electric: { label: 'Eléctrico', icon: 'fa-bolt', color: '#F8D030' },
    ground: { label: 'Tierra', icon: 'fa-mountain', color: '#E0C068' },
    fairy: { label: 'Hada', icon: 'fa-wand-magic-sparkles', color: '#EE99AC' },
    fighting: { label: 'Lucha', icon: 'fa-hand-fist', color: '#C03028' },
    psychic: { label: 'Psíquico', icon: 'fa-eye', color: '#F85888' },
    rock: { label: 'Roca', icon: 'fa-cubes', color: '#B8A038' },
    ice: { label: 'Hielo', icon: 'fa-snowflake', color: '#98D8D8' },
    ghost: { label: 'Fantasma', icon: 'fa-ghost', color: '#705898' },
    dragon: { label: 'Dragón', icon: 'fa-dragon', color: '#7038F8' },
    steel: { label: 'Acero', icon: 'fa-shield-halved', color: '#B8B8D0' },
    dark: { label: 'Siniestro', icon: 'fa-moon', color: '#705848' },
  };

  const getMainType = (pokemon: PokemonDetails): string => {
    if (!pokemon.types || pokemon.types.length === 0) return 'default';
    const main = pokemon.types[0].toLowerCase();
    if (['grass', 'fire', 'water'].includes(main)) {
      return main;
    }
    return 'default';
  };

  const formatPokemonId = (id: number): string => {
    return `Nº${String(id).padStart(3, '0')}`;
  };

  const capitalizeFirstLetter = (str: string): string => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const getTypeLabel = (type: string): string => {
    return typeConfig[type.toLowerCase()]?.label || capitalizeFirstLetter(type);
  };

  const getTypeIcon = (type: string): string => {
    return typeConfig[type.toLowerCase()]?.icon || 'fa-circle';
  };

  const getTypeBadgeColor = (type: string): string => {
    return typeConfig[type.toLowerCase()]?.color || '#A8A878';
  };

  const toggleFavorite = (pokemon: PokemonDetails) => {
    pokemonStore.actions.toggleFavorite(pokemon.id);
  };

  const handlePokemonClick = async (pokemon: PokemonDetails) => {
    try {
      await pokemonStore.actions.loadPokemonDetails(pokemon.name);

      if (!pokemonStore.state.currentPokemon) {
        return;
      }
      
      pokemonStore.state.currentPokemon.isFavorite = pokemon.isFavorite;
      pokemonStore.actions.openModal();
    } catch (error) {
      console.error(error);
    }
  };
</script>

<template>
  <div class="pokemon-grid">
    <AppCard
      v-for="pokemon in pokemons"
      :key="pokemon.id"
      class="custom-pokemon-card"
      :class="`type-bg-${getMainType(pokemon)}`"
      @click="handlePokemonClick(pokemon)"
    >
      <div class="card-left-info">
        <span class="pokemon-id">{{ formatPokemonId(pokemon.id) }}</span>
        <h3 class="pokemon-title">{{ capitalizeFirstLetter(pokemon.name) }}</h3>

        <div class="pokemon-type-badges">
          <span
            v-for="type in pokemon.types"
            :key="type"
            class="type-badge"
            :style="{ backgroundColor: getTypeBadgeColor(type) }"
          >
            <i class="fa-solid" :class="getTypeIcon(type)"></i>
            <span>{{ getTypeLabel(type) }}</span>
          </span>
        </div>
      </div>

      <div class="card-right-image" :class="`image-bg-${getMainType(pokemon)}`">
        <button
          type="button"
          class="favorite-heart-btn"
          :class="{ active: pokemon.isFavorite }"
          @click.stop="toggleFavorite(pokemon)"
          :aria-label="pokemon.isFavorite ? 'Remove from favorites' : 'Add to favorites'"
        >
          <i :class="pokemon.isFavorite ? 'fa-solid fa-heart' : 'fa-regular fa-heart'"></i>
        </button>

        <img
          :src="pokemon.image"
          :alt="pokemon.name"
          class="pokemon-sprite-img"
          loading="lazy"
        />
      </div>
    </AppCard>
  </div>
</template>

<style scoped lang="scss">
  .pokemon-grid {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: 12px;
    width: 100%;
    margin: auto;
    max-width: 500px;
  }

  .custom-pokemon-card {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 16px;
    padding-left: 16px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    width: 100%;
    height: 102px;
    opacity: 1;
    border: none;
  }

  .card-left-info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: start;
    gap: 4px;
    z-index: 1;

    .pokemon-id {
      font-size: 0.8rem;
      font-weight: 700;
      color: rgba(0, 0, 0, 0.5);
    }

    .pokemon-title {
      font-size: 1.35rem;
      font-weight: 800;
      color: #1a1a1a;
      margin: 0 0 6px 0;
      line-height: 1.2;
    }
  }

  .pokemon-type-badges {
    display: flex;
    gap: 6px;
    flex-wrap: wrap;
  }

  .type-badge {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    padding: 4px 10px;
    border-radius: 20px;
    color: #ffffff;
    font-size: 0.75rem;
    font-weight: 600;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

    i {
      font-size: 0.7rem;
    }
  }

  .card-right-image {
    position: relative;
    width: 126;
    height: 102;
    gap: 10px;
    opacity: 1;
    border-radius: 16px;
    padding-top: 4px;
    padding-right: 16px;
    padding-bottom: 4px;
    padding-left: 16px;

    .pokemon-sprite-img {
      width: 94px;
      height: 94px;
      object-fit: contain;
      z-index: 1;
      filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.15));
    }
  }

  .favorite-heart-btn {
    position: absolute;
    top: 6px;
    right: 6px;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background: rgba(117, 117, 117, 0.6);
    backdrop-filter: blur(4px);
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    z-index: 2;
    transition: transform 0.2s ease, background 0.2s ease;

    i {
      color: rgba(255, 255, 255, 0.9);
      font-size: 0.95rem;
      transition: color 0.2s ease;
    }

    &.active {
      background: rgba(255, 255, 255, 0.85);

      i {
        color: rgba(229, 57, 53, 1);
      }
    }

    &:hover {
      transform: scale(1.1);
    }
  }

  /* Specific Colors for Grass, Fire, Water */
  .type-bg-grass { background-color: rgba(139, 195, 74, 0.5); }
  .image-bg-grass { background-color: rgba(139, 195, 74, 1); }

  .type-bg-fire { background-color: rgba(255, 152, 0, 0.5); }
  .image-bg-fire { background-color: rgba(255, 152, 0, 1); }

  .type-bg-water { background-color: #BBDEFB; }
  .image-bg-water { background-color: #64B5F6; }

  .type-bg-default { background-color: #EAEAEA; }
  .image-bg-default { background-color: #CCCCCC; }
</style>