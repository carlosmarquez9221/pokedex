<script setup lang="ts">
  import 'animate.css';
  import Spinner from '@/components/atoms/Spinner.vue';
</script>

<template>
  <div class="loading-container">
    <Spinner class="loading-spinner" />
  </div>
</template>

<style scoped lang="scss">
  .loading-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: $background-light;
    z-index: 9999;
  }
</style>