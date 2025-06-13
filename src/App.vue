<script setup lang="ts">
  import { computed } from 'vue';

  import Loading from '@/components/molecules/Loading.vue';
  import { usePokemonStore } from './stores/pokemon.store';

  const pokemonStore = usePokemonStore();

  const loadingFlag = computed(() => pokemonStore.state.loading);
</script>

<template>
  <v-app>
    <Loading v-if="loadingFlag" />

    <router-view v-slot="{ Component }">
      <transition
        name="fade"
        mode="out-in"
        enter-active-class="animate__animated animate__fadeIn"
        leave-active-class="animate__animated animate__fadeOut"
      >
        <component :is="Component" />
      </transition>
    </router-view>
  </v-app>
</template>

<style lang="scss">
  @import '@/assets/animations/transitions.scss';
</style>