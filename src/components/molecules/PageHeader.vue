<script setup lang="ts">
  defineProps<{
    title: string;
    showBack?: boolean;
  }>();

  const emit = defineEmits(['back']);
</script>

<template>
  <div class="page-header">
    <button
      v-if="showBack !== false"
      type="button"
      class="back-button"
      @click="emit('back')"
      aria-label="Volver"
    >
      <i class="fa-solid fa-chevron-left"></i>
    </button>

    <h2 class="header-title">{{ title }}</h2>
  </div>
</template>

<style scoped lang="scss">
  .page-header {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    max-width: 500px;
    margin: 0 auto 16px auto;
    padding: 12px 0;
    min-height: 44px;

    .back-button {
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      background: transparent;
      border: none;
      font-size: 20px;
      color: #2c3e50;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 8px;
      z-index: 2;
      transition: transform 0.2s ease;

      &:hover {
        transform: translateY(-50%) translateX(-2px);
      }
    }

    .header-title {
      font-size: 18px;
      font-weight: 700;
      color: #1a1a1a;
      margin: 0;
      text-align: center;
    }
  }
</style>
