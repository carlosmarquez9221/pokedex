<script setup lang="ts">
// Vue - i18n
  import { onMounted, computed, ref } from 'vue';
  import { useI18n } from 'vue-i18n';
  
  // Stores
  import { usePokemonStore } from '@/stores/pokemon.store';

  // Components
  import DefaultLayout from '@/components/templates/DefaultLayout.vue';
  import ViewToggle from '@/components/molecules/ViewToggle.vue';
  import PokemonGrid from '@/components/molecules/PokemonGrid.vue';
  import SearchBar from '@/components/molecules/SearchBar.vue';
  import PokemonError from '@/components/molecules/PokemonError.vue';
  import PageHeader from '@/components/molecules/PageHeader.vue';
  import PokemonFilter from '@/components/molecules/PokemonFilter.vue';

  const { t } = useI18n();
  const pokemonStore = usePokemonStore();
  const viewMode = ref<'pokedex' | 'regions' | 'favorites' | 'profile'>('pokedex');
  const searchQuery = ref('');
  
  // Filter state
  const isFilterOpen = ref(false);
  const selectedType = ref('');
  const sortBy = ref('');

  const isFilterActive = computed(() => Boolean(selectedType.value || sortBy.value));

  const pokemons = computed(() => {
    let filtered = [...pokemonStore.state.list];

    if (viewMode.value === 'favorites') {
      filtered = filtered.filter(pokemon => pokemon.isFavorite);
    }

    if (selectedType.value) {
      filtered = filtered.filter(pokemon =>
        pokemon.types && pokemon.types.includes(selectedType.value.toLowerCase())
      );
    }

    if (searchQuery.value) {
      const query = searchQuery.value.toLowerCase().trim();
      filtered = filtered.filter(pokemon => {
        return (
          pokemon.name.toLowerCase().includes(query) ||
          String(pokemon.id) === query
        );
      });
    }

    if (sortBy.value === 'name-asc') {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy.value === 'name-desc') {
      filtered.sort((a, b) => b.name.localeCompare(a.name));
    } else if (sortBy.value === 'id-asc') {
      filtered.sort((a, b) => a.id - b.id);
    }

    return filtered;
  });

  const hasFavorites = computed(() => {
    return pokemonStore.state.list.some(pokemon => pokemon.isFavorite);
  });

  const isViewFavorites = computed(() => viewMode.value === 'favorites');
  const isViewRegions = computed(() => viewMode.value === 'regions');
  const hasError = computed(() => (searchQuery.value || isFilterActive.value) && pokemons.value.length === 0);

  const handleSearch = (query: string) => {
    searchQuery.value = query;
  };

  const handleGoBackHome = () => {
    searchQuery.value = '';
    selectedType.value = '';
    sortBy.value = '';
    viewMode.value = 'pokedex';
  };

  const handlePokemonsList = async () => {
    await pokemonStore.actions.loadPokemons();
  };

  const handleToggleFilterModal = () => {
    isFilterOpen.value = !isFilterOpen.value;
  };

  const handleApplyFilters = (filters: { type: string; sortBy: string }) => {
    selectedType.value = filters.type;
    sortBy.value = filters.sortBy;
    isFilterOpen.value = false;
  };

  const handleResetFilters = () => {
    selectedType.value = '';
    sortBy.value = '';
    searchQuery.value = '';
    isFilterOpen.value = false;
  };
  
  onMounted(async () => {
    await handlePokemonsList();
  });
</script>

<template>
  <DefaultLayout :align-top="isViewFavorites">
    <template v-if="isViewFavorites">
      <PageHeader
        :title="t('nav.favorites')"
        :show-back="true"
        @back="handleGoBackHome"
      />
      <PokemonError
        v-if="!hasFavorites"
        :action="'favorites'"
        @on-refresh="handlePokemonsList" 
      />
      <PokemonGrid
        v-else 
        :pokemons="pokemons"
      />
    </template>

    <template v-else-if="isViewRegions || viewMode === 'profile'">
      <PokemonError :action="'regions'" />
    </template>

    <template v-else>
      <SearchBar
        v-if="viewMode === 'pokedex'"
        v-model="searchQuery"
        :is-filter-active="isFilterActive"
        :placeholder="t('buttons.searchPlaceholder')"
        @search="handleSearch"
        @toggle-filter="handleToggleFilterModal"
      />

      <div
        v-if="viewMode === 'pokedex' && (searchQuery || isFilterActive)"
        class="results-summary-bar"
      >
        <span class="results-text">
          Se han encontrado <strong class="results-count">{{ pokemons.length }} resultados</strong>
        </span>
        <button
          type="button"
          class="clear-filter-btn"
          @click="handleResetFilters"
        >
          Borrar filtro
        </button>
      </div>
      
      <PokemonError
        v-if="hasError"
        :action="'empty'"
        @on-refresh="handlePokemonsList" 
      />
      
      <PokemonGrid
        v-else 
        :pokemons="pokemons"
      />

      <PokemonFilter
        :is-open="isFilterOpen"
        :current-type="selectedType"
        :current-sort-by="sortBy"
        @close="isFilterOpen = false"
        @apply="handleApplyFilters"
        @reset="handleResetFilters"
      />
    </template>
  </DefaultLayout>

  <ViewToggle v-model="viewMode" />
</template>

<style scoped lang="scss">
  .results-summary-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    max-width: 500px;
    margin: -8px auto 16px auto;
    padding: 0 4px;
    font-size: 0.85rem;
    color: #8c92a4;

    .results-count {
      color: #1a1e29;
      font-weight: 700;
    }

    .clear-filter-btn {
      background: none;
      border: none;
      color: #3b82f6;
      font-size: 0.85rem;
      font-weight: 600;
      text-decoration: underline;
      cursor: pointer;
      padding: 0;
      transition: color 0.2s ease;

      &:hover {
        color: #1d4ed8;
      }
    }
  }
</style>