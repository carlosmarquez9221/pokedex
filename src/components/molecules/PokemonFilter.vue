<script setup lang="ts">
  import { ref, watch } from 'vue';
  import { useAnimationClass } from "@/helpers/useAnimationClass";

  const props = withDefaults(
    defineProps<{
      isOpen: boolean;
      currentType?: string;
      currentSortBy?: string;
    }>(),
    {
      isOpen: false,
      currentType: '',
      currentSortBy: ''
    }
  );

  const emit = defineEmits<{
    (e: 'close'): void;
    (e: 'apply', filters: { type: string; sortBy: string }): void;
    (e: 'reset'): void;
  }>();

  const { animationClass } = useAnimationClass();

  const type = ref(props.currentType);
  const sortBy = ref(props.currentSortBy);

  watch(
    () => [props.currentType, props.currentSortBy],
    ([newType, newSortBy]) => {
      type.value = newType || '';
      sortBy.value = newSortBy || '';
    }
  );

  const pokemonTypes = [
    { value: '', label: 'Todos los tipos' },
    { value: 'grass', label: 'Planta' },
    { value: 'fire', label: 'Fuego' },
    { value: 'water', label: 'Agua' },
    { value: 'poison', label: 'Veneno' },
    { value: 'electric', label: 'Eléctrico' },
    { value: 'bug', label: 'Bicho' },
    { value: 'flying', label: 'Volador' },
    { value: 'normal', label: 'Normal' },
    { value: 'ground', label: 'Tierra' },
    { value: 'fairy', label: 'Hada' },
    { value: 'fighting', label: 'Lucha' },
    { value: 'psychic', label: 'Psíquico' },
    { value: 'rock', label: 'Roca' },
    { value: 'ice', label: 'Hielo' },
    { value: 'ghost', label: 'Fantasma' },
    { value: 'dragon', label: 'Dragón' },
    { value: 'steel', label: 'Acero' },
    { value: 'dark', label: 'Siniestro' },
  ];

  const handleClose = () => {
    emit('close');
  };

  const handleApply = () => {
    emit('apply', {
      type: type.value,
      sortBy: sortBy.value
    });
  };

  const handleReset = () => {
    type.value = '';
    sortBy.value = '';
    emit('reset');
  };
</script>

<template>
  <div v-if="isOpen" class="modal-backdrop" @click.self="handleClose">
    <div class="modal" :class="animationClass">
      <button type="button" class="close-btn" @click="handleClose" aria-label="Cerrar">
        <i class="fa-solid fa-xmark"></i>
      </button>

      <div class="modal-header">
        <h3 class="modal-title">Filtra por tus preferencias</h3>
      </div>

      <form @submit.prevent="handleApply" class="filter-form">
        <div class="form-group">
          <label class="form-label">Tipos</label>
          <div class="select-wrapper">
            <v-select
              :items="pokemonTypes"
              item-title="label"
              item-value="value"
              v-model="type"
              density="compact"
            ></v-select>
            <i class="fa-solid fa-chevron-down select-icon"></i>
          </div>
        </div>

        <div class="actions-group">
          <button type="submit" class="btn-submit">
            Aplicar Filtros
          </button>
          <button type="button" class="btn-cancel" @click="handleClose">
            Cancelar
          </button>
          
          <button type="button" class="btn-reset" @click="handleReset">
            Limpiar Filtros
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<style lang="scss">
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(35, 30, 48, 0.65);
  backdrop-filter: blur(4px);
  z-index: 1000;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  transition: opacity 0.3s ease-in-out;
}

.modal {
  position: relative;
  width: 100%;
  max-width: 500px;
  max-height: 90vh;
  background: #ffffff;
  border-top-right-radius: 1.5rem;
  border-top-left-radius: 1.5rem;
  padding: 2.25rem 1.75rem 2rem 1.75rem;
  box-shadow: 0 -4px 24px rgba(0, 0, 0, 0.2);
  z-index: 1001;
  overflow-y: auto;
  box-sizing: border-box;

  @media (min-width: 768px) {
    padding: 2.5rem 2.25rem 2.25rem 2.25rem;
    max-width: 520px;
  }
}

.close-btn {
  position: absolute;
  top: 1.25rem;
  left: 1.25rem;
  background: none;
  border: none;
  font-size: 1.25rem;
  color: rgba(66, 66, 66, 1);
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s ease;

  &:hover {
    color: #1a1a1a;
  }
}

.modal-header {
  margin-bottom: 1.5rem;

  .modal-title {
    font-size: 1.2rem;
    font-weight: 700;
    color: #1a1e29;
    margin: 0;
  }
}

.filter-form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-label {
  font-size: 0.9rem;
  font-weight: 600;
  color: #1a1e29;
}

.select-wrapper {
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;

  .select-icon {
    position: absolute;
    right: 1.25rem;
    pointer-events: none;
    font-size: 0.85rem;
    color: #9aa0b4;
  }
}

.form-select {
  width: 100%;
  appearance: none;
  background-color: #f4f5f9;
  border: 1.5px solid transparent;
  border-radius: 0.85rem;
  padding: 0.95rem 2.5rem 0.95rem 1.25rem;
  font-size: 0.9rem;
  color: #1a1e29;
  outline: none;
  cursor: pointer;
  transition: border-color 0.2s ease, background-color 0.2s ease;
}

.actions-group {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-top: 0.5rem;
}

.btn-submit {
  width: 100%;
  background-color: rgba(30, 136, 229, 1);
  color: #ffffff;
  border: none;
  border-radius: 0.85rem;
  padding: 0.95rem;
  font-size: 0.95rem;
  font-weight: 700;
  cursor: pointer;
  transition: background-color 0.2s ease, transform 0.1s ease;

  &:active {
    transform: scale(0.99);
  }
}
.btn-cancel {
  width: 100%;
  background-color: rgba(238, 238, 238, 1);
  color: #000;
  border: none;
  border-radius: 0.85rem;
  padding: 0.95rem;
  font-size: 0.95rem;
  font-weight: 700;
  cursor: pointer;
  transition: background-color 0.2s ease, transform 0.1s ease;


  &:active {
    transform: scale(0.99);
  }
}

.btn-reset {
  width: 100%;
  background: transparent;
  color: #8c92a4;
  border: none;
  padding: 0.5rem;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: color 0.2s ease;

  &:hover {
    color: #e53935;
  }
}
</style>