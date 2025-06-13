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
    }
  });

  const emit = defineEmits(['update:modelValue', 'search']);

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
      <button v-if="searchQuery" @click="clearSearch" class="clear-button">
        <i class="fas fa-times"></i>
      </button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.search-container {
  margin: 0 auto;
}

.search-input-container {
  position: relative;
  display: flex;
  align-items: center;
  background-color: $background-light;
  border-radius: $border-radius-unit;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: $spacing-unit;
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
  padding: $spacing-unit;

  &::placeholder {
    color: $body-text-tertiary;
  }
}

.clear-button {
  background: none;
  border: none;
  color: $body-text-tertiary;
  cursor: pointer;
  padding: $spacing-unit;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s ease;

  &:hover {
    color: $body-text-secondary;
  }

  i {
    font-size: 16px;
  }
}
</style>
