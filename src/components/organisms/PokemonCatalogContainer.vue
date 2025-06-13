<script setup lang="ts">
  import { defineAsyncComponent, onMounted, computed, ref } from 'vue';
  import { usePokemonStore } from '@/stores/pokemon.store';
  import { useI18n } from 'vue-i18n';

  import DefaultLayout from '@/components/templates/DefaultLayout.vue';
  import ViewToggle from '@/components/molecules/ViewToggle.vue';
  const PokemonGrid = defineAsyncComponent(() => import('@/components/molecules/PokemonGrid.vue'));
  const SearchBar = defineAsyncComponent(() => import('@/components/molecules/SearchBar.vue'));
  const AppButton = defineAsyncComponent(() => import('@/components/atoms/AppButton.vue'));

  const { t } = useI18n();
  const pokemonStore = usePokemonStore();
  const viewMode = ref<'all' | 'favorites'>('all');
  const searchQuery = ref('');

  const pokemons = computed(() => {
    let filtered = [...pokemonStore.state.list];

    if (viewMode.value === 'favorites') {
      filtered = filtered.filter(pokemon => pokemon.isFavorite);
    }

    if (searchQuery.value) {
      const query = searchQuery.value.toLowerCase().trim();
      filtered = filtered.filter(pokemon => {
        const idFromUrl = pokemon.url.split('/').filter(Boolean).pop();

        return (
          pokemon.name.toLowerCase().includes(query) ||
          idFromUrl === query
        );
      });
    }

    return filtered;
  });

  const hasFavorites = computed(() => {
    return pokemonStore.state.list.some(pokemon => pokemon.isFavorite);
  });

  const handleSearch = (query: string) => {
    searchQuery.value = query;
  };

  const handleGoBackHome = () => {
    searchQuery.value = '';
    viewMode.value = 'all';
  };

  onMounted(() => {
    pokemonStore.state.loading = true;
    pokemonStore.actions.loadPokemons();
  });
</script>

<template>
  <DefaultLayout>
    <template v-if="viewMode === 'favorites' && !hasFavorites">
      <div class="no-results">
        <h2>{{ t('favorites.emptyTitle') }}</h2>
        <p>{{ t('favorites.emptyMessage') }}</p>
      </div>
    </template>
    <template v-else>
      <SearchBar
        v-model="searchQuery"
        :placeholder="t('buttons.searchPlaceholder')"
        @search="handleSearch"
      />
      <template v-if="searchQuery && pokemons.length === 0">
        <div class="no-results">
          <h1>{{ t('noResults.title') }}</h1>
          <p>{{ t('noResults.message') }}</p>
          <AppButton
            variant="tertiary"
            @click="handleGoBackHome"
            class="mt-8"
          >
            {{ t('buttons.goBackHome') }}
          </AppButton>
        </div>
      </template>
      <PokemonGrid v-else :pokemons="pokemons" />
    </template>
  </DefaultLayout>

  <ViewToggle v-model="viewMode" />
</template>

<style scoped lang="scss">
  .no-results {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    height: 60vh;
    text-align: center;
    padding: 2rem;
    color: #2c3e50;
  }
</style>