<script setup lang="ts">
  import { ref, watch } from 'vue';
  import { useI18n } from 'vue-i18n';

  type NavValue = 'pokedex' | 'regions' | 'favorites' | 'profile';

  const props = withDefaults(
    defineProps<{
      modelValue?: NavValue;
    }>(),
    {
      modelValue: 'pokedex',
    }
  );

  const emit = defineEmits<{
    (e: 'update:modelValue', value: NavValue): void;
  }>();

  const { t } = useI18n();

  const navItems: { value: NavValue; icon: string; label: string }[] = [
    { value: 'pokedex', icon: 'fa-solid fa-house', label: t('nav.pokedex') },
    { value: 'regions', icon: 'fa-solid fa-globe', label: t('nav.regions') },
    { value: 'favorites', icon: 'fa-solid fa-heart', label: t('nav.favorites') },
    { value: 'profile', icon: 'fa-solid fa-user', label: t('nav.profile') },
  ];
  
  const localValue = ref<NavValue>(props.modelValue);

  watch(localValue, (newValue) => {
    emit('update:modelValue', newValue);
  });

  watch(
    () => props.modelValue,
    (newValue) => {
      if (newValue !== localValue.value) {
        localValue.value = newValue;
      }
    }
  );
</script>

<template>
  <v-footer class="responsive-footer d-flex align-center justify-center py-2 px-2" color="white">
    <v-row no-gutters justify="center" align="center" class="w-100 max-width-container">
      <v-col
        v-for="item in navItems"
        :key="item.value"
        cols="3"
        class="d-flex justify-center"
      >
        <button
          type="button"
          class="nav-item"
          :class="{ 'nav-item--active': localValue === item.value }"
          @click="localValue = item.value"
        >
          <i :class="item.icon" class="nav-item-icon"></i>
          <span class="nav-item-label">{{ item.label }}</span>
        </button>
      </v-col>
    </v-row>
  </v-footer>
</template>

<style scoped lang="scss">
  .responsive-footer {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    width: 100%;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    box-shadow: 0 -4px 16px rgba(0, 0, 0, 0.08);
    background: #ffffff !important;
  }

  .max-width-container {
    max-width: 500px;
    margin: 0 auto;
  }

  .nav-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 4px;
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 6px 4px;
    color: #424242;
    transition: color 0.2s ease;

    .nav-item-icon {
      font-size: 1.1rem;
    }

    .nav-item-label {
      font-size: 0.7rem;
      font-weight: 500;
    }

    &--active {
      color: #1565C0;

      .nav-item-label {
        font-weight: 700;
      }
    }
  }
</style>