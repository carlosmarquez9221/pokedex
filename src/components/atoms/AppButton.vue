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
    :color="variant"
    :class="['app-button', `app-button--${variant}`]"
    @click="(event: MouseEvent) => emit('click', event)"
  >
    <slot></slot>
  </v-btn>
</template>

<style scoped lang="scss">
  .app-button {
    @mixin button-base {
      width: auto;
      height: 44px;
      font-family: $font-family;
      font-size: $font-size-subtitle;
      font-weight: $font-weight-title;
      line-height: $line-height;
      letter-spacing: $letter-spacing;
      padding: 11px 20px;
      border-radius: 60px;
      gap: 10px;
      color: $white;
      border: none;
      cursor: pointer;
    }

    &--primary {
      @include button-base;
      background: $primary;
    }

    &--secondary {
      @include button-base;
      background: $secondary;
    }

    &--tertiary {
      @include button-base;
      background: $tertiary;
    }

    &--disabled {
      @include button-base;
      background: $disabled;
    }
  }
</style>