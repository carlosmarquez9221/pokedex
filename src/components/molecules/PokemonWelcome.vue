<script setup lang="ts">
  // Vue - i18n - router
  import { ref, computed } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { useRouter } from 'vue-router';
  
  // Assets
  import group28Img from '@/assets/images/resources/Group-28.png';
  import frameImg from '@/assets/images/resources/Frame.png';
  
  // Components
  import AppButton from '@/components/atoms/AppButton.vue';
  
  // Stores
  import { usePokemonStore } from '@/stores/pokemon.store';

  const router = useRouter();

  const pokemonStore = usePokemonStore();

  const { t } = useI18n();

  const continueBase = {
    title: t('app.continue.title'),
    description: t('app.continue.description'),
    button: t('app.continue.button'),
    image: group28Img
  }
  
  const startBase = {
    title: t('app.start.title'),
    description: t('app.start.description'),
    button: t('app.start.button'),
    image: frameImg
  }
  
  const next = ref(true);
  
  const activeStep = computed(() => (next.value ? 0 : 1));
  const bodyView = computed(() => {
    return next.value ? continueBase : startBase;
  });

  const goToStep = (step: number) => {
    next.value = step === 0;
  };
  
  const nextStep = () => {
    if (next.value) {
      next.value = !next.value;
      return;
    }
    
    pokemonStore.state.loading = true;
    router.push('/pokemon-catalog');
  };
</script>

<template>
  <div class="pokemon-welcome">
    <div class="pokemon-welcome-img">
      <img :src="bodyView.image" alt="Pokemon" />
    </div>

    <div class="pokemon-welcome-text">
      <h1>{{ bodyView.title }}</h1>
      <p>{{ bodyView.description }}</p>
    </div>

    <v-item-group
      class="pokemon-welcome-dots"
      :model-value="activeStep"
      mandatory
    >
      <v-item v-for="step in 2" :key="step">
        <span
          class="dot"
          :class="{ 'dot--active': step - 1 === activeStep }"
          @click="goToStep(step - 1)"
        />
      </v-item>
    </v-item-group>

    <AppButton variant="primary" @click="nextStep">
      {{ bodyView.button }}
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
      width: 342px;
      height: 264.89306640625px;
      opacity: 1;
      top: 207px;
      left: 17px;
    }
  }

  .pokemon-welcome-text {
    p {
      text-align: center;
    }
  }

  .pokemon-welcome-dots {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;

    .dot {
      display: inline-block;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background-color: #d1d5db;
      cursor: pointer;
      transition: all 0.25s ease;

      &--active {
        width: 24px;
        border-radius: 4px;
        background-color: #2563eb;
      }
    }
  }
</style>