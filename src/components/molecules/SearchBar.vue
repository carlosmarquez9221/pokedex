<script setup lang="ts">
  import { ref, watch } from 'vue';

  const props = defineProps({
    modelValue: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: 'Search'
    },
    showFilter: {
      type: Boolean,
      default: true
    },
    isFilterActive: {
      type: Boolean,
      default: false
    }
  });

  const emit = defineEmits(['update:modelValue', 'search', 'toggle-filter']);

  const searchQuery = ref(props.modelValue);

  watch(() => props.modelValue, (newVal) => {
    searchQuery.value = newVal;
  });

  const onSearch = () => {
    const query = searchQuery.value.trim();
    emit('update:modelValue', query);
    emit('search', query);
  };

  const clearSearch = () => {
    searchQuery.value = '';
    emit('update:modelValue', '');
    emit('search', '');
  };

  const onToggleFilter = () => {
    emit('toggle-filter');
  };
</script>

<template>
  <div class="search-container">
    <div class="search-input-container">
      <i class="fas fa-search search-icon"></i>
      <input
        v-model="searchQuery"
        type="text"
        :placeholder="placeholder"
        class="search-input"
        @input="onSearch"
        @keyup.enter="onSearch"
      />
      <button v-if="searchQuery" type="button" @click="clearSearch" class="clear-button" aria-label="Limpiar búsqueda">
        <i class="fas fa-times"></i>
      </button>

      <button
        v-if="showFilter"
        type="button"
        class="filter-button"
        :class="{ 'filter-button--active': isFilterActive }"
        @click="onToggleFilter"
        aria-label="Filtros"
      >
        <i class="fa-solid fa-sliders"></i>
      </button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.search-container {
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
}

.search-input-container {
  display: flex;
  align-items: center;
  border-radius: 30px;
  border: 1.5px solid rgba(224, 224, 224, 1);
  padding: 6px 16px;
  margin-bottom: 16px;
  gap: 8px;
  background-color: #ffffff;
}

.search-icon {
  color: $body-text-tertiary;
  margin-right: $spacing-unit;
  font-size: 16px;
}

.search-input {
  flex: 1;
  border: none;
  background: transparent;
  outline: none;
  font-size: 14px;
  color: $body-text-primary;
  padding: 8px $spacing-unit;

  &::placeholder {
    color: $body-text-tertiary;
  }
}

.clear-button, .filter-button {
  background: none;
  border: none;
  color: $body-text-tertiary;
  cursor: pointer;
  padding: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s ease, transform 0.2s ease;

  &:hover {
    color: #6C5CE7;
    transform: scale(1.1);
  }

  i {
    font-size: 16px;
  }
}

.filter-button--active {
  color: #6C5CE7;
}
</style>
