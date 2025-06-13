<template>
  <div class="layout">
    <main class="layout__main">
      <slot />
    </main>
  </div>
</template>

<style scoped lang="scss">
  .layout {
    background-color: $background-light;
    padding: 1rem;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    &__main {
      width: 100%;
      max-width: 900px;
      margin: 0 auto;
      padding: 1rem 0 4rem;
      height: 100%;

      @include respond-to('md') {
        padding: 2rem 0;
      }
    }
  }
</style>