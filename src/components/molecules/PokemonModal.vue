<script setup lang="ts">
import { watch, onBeforeUnmount, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import AppButton from '../atoms/AppButton.vue';

interface Pokemon {
  name: string;
  image: string;
  weight: number;
  height: number;
  types: string[];
  isFavorite: boolean;
}

const props = defineProps<{
  isOpen: boolean;
  pokemon: Pokemon;
}>();

const emit = defineEmits<{
  (e: 'close'): void;
}>();

const { t } = useI18n();
const buttonText = ref(t('pokemon.share'));

const copyToClipboard = async (pokemon: Pokemon): Promise<void> => {
  const pokemonData = [
    pokemon.name,
    `weight: ${pokemon.weight}`,
    `height: ${pokemon.height}`,
    `types: ${pokemon.types.join(', ')}`
  ];

  try {
    await navigator.clipboard.writeText(pokemonData.join(', '));
    const originalText = buttonText.value;
    buttonText.value = t('pokemon.copied');
    setTimeout(() => {
      buttonText.value = originalText;
    }, 2000);
  } catch (err) {
    console.error('Failed to copy text: ', err);
  }
};

watch(() => props.isOpen, (newVal) => {
  if (newVal) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
});

onBeforeUnmount(() => {
  document.body.style.overflow = '';
});

const closeModal = () => {
  emit('close');
};
</script>

<template>
  <div v-if="isOpen" class="modal-overlay">
    <div class="modal">
      <div class="modal-header">
        <button @click="closeModal" class="close-button" aria-label="Cerrar modal">
          <span class="close-icon">×</span>
        </button>
      </div>

      <div class="modal-image-container">
        <picture>
          <source
            :srcset="pokemon.image"
            sizes="(max-width: 600px) 320px, 640px"
            type="image/webp"
          >
          <img
            :src="pokemon.image"
            :alt="pokemon.name"
            class="pokemon-image"
            loading="lazy"
          >
        </picture>
      </div>

      <div class="modal-content">
        <div class="info-row">
          <span class="label">{{ t('pokemon.name') }}:</span>
          <span class="value">{{ pokemon.name }}</span>
        </div>
        <div class="divider"></div>
        <div class="info-row">
          <span class="label">{{ t('pokemon.weight') }}:</span>
          <span class="value">{{ pokemon.weight }}</span>
        </div>
        <div class="divider"></div>
        <div class="info-row">
          <span class="label">{{ t('pokemon.height') }}:</span>
          <span class="value">{{ pokemon.height }}</span>
        </div>
        <div class="divider"></div>
        <div class="info-row">
          <span class="label">{{ t('pokemon.types') }}:</span>
          <span class="value">{{ pokemon.types.join(', ') }}</span>
        </div>
      </div>

      <div class="modal-actions">
        <AppButton variant="tertiary" @click="copyToClipboard(pokemon)">
          {{ buttonText }}
        </AppButton>

        <div class="star-icon" :class="{ active: pokemon.isFavorite }">
          <i class="fa-solid fa-star"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    padding: 20px;
  }

  .modal {
    background: white;
    border-radius: 16px;
    width: 100%;
    max-width: 400px;
    max-height: 90vh;
    overflow-y: auto;
    position: relative;
  }

  .modal-header {
    position: absolute;
    top: 10px;
    right: 10px;
    z-index: 10;
  }

  .close-button {
    background: white;
    border: none;
    border-radius: 50%;
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-size: 24px;
    color: #3498db;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    outline: none;
  }

  .modal-image-container {
    position: relative;
    width: 100%;
    height: 200px;
    background: linear-gradient(to bottom, $background-lighter, $background-light);
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 16px 16px 0 0;
    overflow: hidden;
    background-image: url('@/assets/images/resources/Mask_Group.png');
    background-size: cover;
    background-position: center;
  }

  .pokemon-image {
    max-width: 180px;
    max-height: 180px;
    object-fit: contain;
  }

  .modal-content {
    padding: 20px;
  }

  .info-row {
    display: flex;
    justify-content: space-between;
    padding: 10px 0;
  }

  .label {
    font-weight: bold;
    color: $body-text-tertiary;
  }

  .value {
    color: $body-text-primary;
  }

  .divider {
    height: 1px;
    background-color: $body-text-tertiary;
    margin: 5px 0;
  }

  .modal-actions {
    padding: 0 20px 20px;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }

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
</style>
