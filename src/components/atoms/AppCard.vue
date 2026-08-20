<script setup lang="ts">
  const emit = defineEmits(['click']);
</script>

<template>
  <div
    class="custom-card"
    @click="emit('click')"
  >
    <div class="card-content">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .custom-card {
    width: 100%;
    min-height: 60px;
    border-radius: $border-radius-unit;
    background-color: $white;
    margin: 0;
    cursor: pointer;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    transition: all 0.2s ease;
    -webkit-tap-highlight-color: transparent;
    user-select: none;
    border: 1px solid #e0e0e0;

    &:hover {
      filter: brightness(0.97);
    }

    &:active {
      transform: scale(0.98);
    }

    .card-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 100%;
      width: 100%;
    }
  }
</style>