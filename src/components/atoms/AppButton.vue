<script setup lang="ts">
  defineProps<{
    variant?: 'primary' | 'secondary' | 'tertiary' | 'disabled';
  }>();

  const emit = defineEmits<{
    (e: 'click', event: MouseEvent): void;
  }>();
</script>

<template>
  <v-btn
    :class="['app-button', `app-button--${variant}`]"
    @click="(event: MouseEvent) => emit('click', event)"
  >
    <slot></slot>
  </v-btn>
</template>

<style scoped lang="scss">
  .app-button {
    :deep(.v-btn__overlay),
    :deep(.v-btn__underlay) {
      opacity: 0 !important;
    }

    @mixin button-base {
      width: 100%;
      max-width: 328px !important;
      height: 58px !important;
      font-family: $font-family-button !important;
      font-size: $font-size-button !important;
      font-weight: $font-weight-button !important;
      line-height: $line-height-button !important;
      letter-spacing: $letter-spacing-button !important;
      text-align: $text-align-button !important;
      padding: 16px 24px !important;
      border-radius: 100px !important;
      gap: 8px;
      opacity: 1;
      color: $white !important;
      border: none !important;
      outline: none !important;
      box-shadow: none !important;
      cursor: pointer;
    }

    &--primary {
      @include button-base;
      &, &:focus, &:active, &.v-btn--focused, &.v-btn--active {
        background-color: $primary !important;
        color: $white !important;
      }
    }

    &--secondary {
      @include button-base;
      &, &:focus, &:active, &.v-btn--focused, &.v-btn--active {
        background-color: $secondary !important;
        color: $white !important;
      }
    }

    &--tertiary {
      @include button-base;
      &, &:focus, &:active, &.v-btn--focused, &.v-btn--active {
        background-color: $tertiary !important;
        color: $white !important;
      }
    }

    &--disabled {
      @include button-base;
      &, &:focus, &:active, &.v-btn--focused, &.v-btn--active {
        background-color: $disabled !important;
        color: $white !important;
      }
    }
  }
</style>