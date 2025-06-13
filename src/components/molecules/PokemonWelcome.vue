<script setup lang="ts">
  import { useI18n } from 'vue-i18n';
  import AppButton from '@/components/atoms/AppButton.vue';
  import { useRouter } from 'vue-router';
  import { usePokemonStore } from '@/stores/pokemon.store';

  const router = useRouter();

  const pokemonStore = usePokemonStore();

  const { t } = useI18n();

  const redireccionar = () => {
    pokemonStore.state.loading = true;
    router.push('/pokemon-catalog');
  };
</script>

<template>
  <div class="pokemon-welcome">
    <div class="pokemon-welcome-img">
      <img src="../../assets/images/resources/Pikachu.svg" alt="Pokemon" />
    </div>

    <div class="pokemon-welcome-text">
      <h1>{{ t('app.title') }}</h1>
      <p>{{ t('app.description') }}</p>
    </div>

    <AppButton
      variant="tertiary"
      @click="redireccionar"
    >
      {{ t('buttons.getStarted') }}
    </AppButton>
  </div>
</template>

<style scoped lang="scss">
  .pokemon-welcome {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
  }

  .pokemon-welcome-img {
    img {
      width: 325px;
      height: 288px;
    }
  }

  .pokemon-welcome-text {
    text-align: center;
    margin-bottom: 2rem;
  }
</style>
