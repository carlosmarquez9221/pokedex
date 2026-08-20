<script setup lang="ts">
  // Vue - i18n - router
  import { ref, computed } from 'vue';
  import { useI18n } from 'vue-i18n';
  
  // Assets
  import magikarpImg from '@/assets/images/resources/Magikarp.png';
  import jumpImg from '@/assets/images/resources/Jump.png';
  
  // Components
  import AppButton from '@/components/atoms/AppButton.vue';
  
  const { t } = useI18n();

  const emits = defineEmits(['on-refresh']);

  const props = defineProps({
    action: {
      type: String,
      required: true
    }
  });

  const errorBase = {
    title: t('error.title'),
    description: t('error.description'),
    button: t('error.button'),
    image: magikarpImg
  }
  
  const errorFavorites = {
    title: t('favorites.emptyTitle'),
    description: t('favorites.emptyMessage'),
    button: t('favorites.button'),
    image: magikarpImg
  }

  const errorRegions = {
    title: t('regions.emptyTitle'),
    description: t('regions.emptyMessage'),
    button: t('regions.button'),
    image: jumpImg
  }

  const isFavorites = computed(() => props.action === 'favorites');
  const isEmpty = computed(() => props.action === 'empty');
  const isRegions = computed(() => props.action === 'regions');
  
  const bodyView = computed(() => {
    if (isFavorites.value) return errorFavorites;
    if (isRegions.value) return errorRegions;
    return errorBase;
  });
  
  const refresh = () => {
    emits('on-refresh');
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

    <AppButton v-if="isEmpty" variant="primary" @click="refresh">
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
</style>