<script setup lang="ts">
  import { ref, watch, defineProps, defineEmits } from 'vue';
  import { useI18n } from 'vue-i18n';
  import AppButton from '@/components/atoms/AppButton.vue';

  const { t } = useI18n();

  const props = defineProps<{
    modelValue: 'all' | 'favorites';
  }>();

  const emit = defineEmits<{
    (e: 'update:modelValue', value: 'all' | 'favorites'): void;
  }>();

  const localValue = ref<'all' | 'favorites'>(props.modelValue);

  watch(localValue, (newValue) => {
    emit('update:modelValue', newValue);
  });

  watch(() => props.modelValue, (newValue) => {
    if (newValue !== localValue.value) {
      localValue.value = newValue;
    }
  });
</script>

<template>
  <div class="view-toggle-container">
    <AppButton
      variant="disabled"
      :class="{ 'active-toggle': localValue === 'all' }"
      @click="localValue = 'all'"
    >
      <i class="fa-solid fa-list"></i>
      <span class="d-none d-sm-inline">{{ t('viewToggle.all') }}</span>
    </AppButton>

    <AppButton
      variant="disabled"
      :class="{ 'active-toggle': localValue === 'favorites' }"
      @click="localValue = 'favorites'"
    >
      <i class="fa-solid fa-star"></i>
      <span class="d-none d-sm-inline">{{ t('viewToggle.favorites') }}</span>
    </AppButton>
  </div>
</template>

<style scoped lang="scss">
.view-toggle-container {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1rem;
  background: $white;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  display: flex;
  justify-content: center;
  gap: 1rem;
}

:deep(.v-btn) {
  &.active-toggle {
    background-color: $primary !important;
    color: $white !important;
    opacity: 1 !important;
    border-color: $primary !important;

    .v-btn__overlay {
      opacity: 0 !important;
    }
  }

  &.v-btn--disabled {
    background-color: $disabled !important;
    color: $white !important;
    opacity: 1 !important;
    border: 1px solid $disabled !important;
  }
}
</style>
