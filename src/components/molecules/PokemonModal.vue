<script setup lang="ts">
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import type { PokemonDetails } from '@/services/types/pokemon.d';
import AppButton from '@/components/atoms/AppButton.vue';

const props = defineProps<{
  isOpen: boolean;
  pokemon: PokemonDetails | null;
}>();

const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'toggle-favorite', id: number): void;
}>();

const { t } = useI18n();

const isCopied = ref(false);
let copiedTimeout: ReturnType<typeof setTimeout> | null = null;

const TYPE_META: Record<string, { label: string; color: string; icon: string }> = {
  normal:   { label: 'Normal',   color: '#A8A878', icon: 'fa-circle' },
  fire:     { label: 'Fuego',    color: '#F08030', icon: 'fa-fire' },
  water:    { label: 'Agua',     color: '#6890F0', icon: 'fa-droplet' },
  electric: { label: 'Eléctrico',color: '#F8D030', icon: 'fa-bolt' },
  grass:    { label: 'Planta',   color: '#78C850', icon: 'fa-leaf' },
  ice:      { label: 'Hielo',    color: '#98D8D8', icon: 'fa-snowflake' },
  fighting: { label: 'Lucha',    color: '#C03028', icon: 'fa-hand-fist' },
  poison:   { label: 'Veneno',   color: '#A040A0', icon: 'fa-flask' },
  ground:   { label: 'Tierra',   color: '#E0C068', icon: 'fa-mountain' },
  flying:   { label: 'Volador',  color: '#3DC7E0', icon: 'fa-feather' },
  psychic:  { label: 'Psíquico', color: '#8B5CF6', icon: 'fa-brain' },
  bug:      { label: 'Bicho',    color: '#A8B820', icon: 'fa-bug' },
  rock:     { label: 'Roca',     color: '#B8A038', icon: 'fa-gem' },
  ghost:    { label: 'Fantasma', color: '#705898', icon: 'fa-ghost' },
  dragon:   { label: 'Dragón',   color: '#7038F8', icon: 'fa-dragon' },
  dark:     { label: 'Siniestro',color: '#705848', icon: 'fa-moon' },
  steel:    { label: 'Acero',    color: '#B8B8D0', icon: 'fa-shield-halved' },
  fairy:    { label: 'Hada',     color: '#EE99AC', icon: 'fa-star' },
};

const TYPE_CHART: Record<string, { strong: string[]; weak: string[]; none: string[] }> = {
  normal:   { strong: [], weak: ['rock', 'steel'], none: ['ghost'] },
  fire:     { strong: ['grass', 'ice', 'bug', 'steel'], weak: ['fire', 'water', 'rock', 'dragon'], none: [] },
  water:    { strong: ['fire', 'ground', 'rock'], weak: ['water', 'grass', 'dragon'], none: [] },
  electric: { strong: ['water', 'flying'], weak: ['electric', 'grass', 'dragon'], none: ['ground'] },
  grass:    { strong: ['water', 'ground', 'rock'], weak: ['fire', 'grass', 'poison', 'flying', 'bug', 'dragon', 'steel'], none: [] },
  ice:      { strong: ['grass', 'ground', 'flying', 'dragon'], weak: ['fire', 'water', 'ice', 'steel'], none: [] },
  fighting: { strong: ['normal', 'ice', 'rock', 'dark', 'steel'], weak: ['poison', 'flying', 'psychic', 'bug', 'fairy'], none: ['ghost'] },
  poison:   { strong: ['grass', 'fairy'], weak: ['poison', 'ground', 'rock', 'ghost'], none: ['steel'] },
  ground:   { strong: ['fire', 'electric', 'poison', 'rock', 'steel'], weak: ['grass', 'bug'], none: ['flying'] },
  flying:   { strong: ['grass', 'fighting', 'bug'], weak: ['electric', 'rock', 'steel'], none: [] },
  psychic:  { strong: ['fighting', 'poison'], weak: ['psychic', 'steel'], none: ['dark'] },
  bug:      { strong: ['grass', 'psychic', 'dark'], weak: ['fire', 'fighting', 'poison', 'flying', 'ghost', 'steel', 'fairy'], none: [] },
  rock:     { strong: ['fire', 'ice', 'flying', 'bug'], weak: ['fighting', 'ground', 'steel'], none: [] },
  ghost:    { strong: ['psychic', 'ghost'], weak: ['dark'], none: ['normal'] },
  dragon:   { strong: ['dragon'], weak: ['steel'], none: ['fairy'] },
  dark:     { strong: ['psychic', 'ghost'], weak: ['fighting', 'dark', 'fairy'], none: [] },
  steel:    { strong: ['ice', 'rock', 'fairy'], weak: ['fire', 'water', 'electric', 'steel'], none: [] },
  fairy:    { strong: ['fighting', 'dragon', 'dark'], weak: ['fire', 'poison', 'steel'], none: [] },
};

const paddedId = computed(() =>
  props.pokemon ? String(props.pokemon.id).padStart(3, '0') : ''
);

const displayName = computed(() =>
  props.pokemon
    ? props.pokemon.name.charAt(0).toUpperCase() + props.pokemon.name.slice(1)
    : ''
);

const formattedWeight = computed(() => {
  if (!props.pokemon) return '';
  return `${(props.pokemon.weight / 10).toFixed(1).replace('.', ',')} kg`;
});

const formattedHeight = computed(() => {
  if (!props.pokemon) return '';
  return `${(props.pokemon.height / 10).toFixed(1).replace('.', ',')} m`;
});

const genderInfo = computed(() => {
  const rate = props.pokemon?.genderRate;
  if (rate === undefined || rate === -1) return null;
  const femalePercent = Math.round((rate / 8) * 100);
  return {
    femalePercent,
    malePercent: 100 - femalePercent,
  };
});

const weaknesses = computed(() => {
  if (!props.pokemon) return [];
  const multipliers: Record<string, number> = {};

  Object.keys(TYPE_META).forEach((attacker) => {
    let multiplier = 1;
    props.pokemon!.types.forEach((defenderType) => {
      const chart = TYPE_CHART[attacker];
      if (!chart) return;
      if (chart.none.includes(defenderType)) multiplier *= 0;
      else if (chart.strong.includes(defenderType)) multiplier *= 2;
      else if (chart.weak.includes(defenderType)) multiplier *= 0.5;
    });
    multipliers[attacker] = multiplier;
  });

  return Object.keys(multipliers).filter((type) => multipliers[type] > 1);
});

const typeLabel = (type: string) => TYPE_META[type]?.label ?? type;
const typeIcon = (type: string) => ['fa-solid', TYPE_META[type]?.icon ?? 'fa-circle'];
const badgeStyle = (type: string) => ({ backgroundColor: TYPE_META[type]?.color ?? '#999' });

const heroBackground = computed(() => {
  const primary = props.pokemon?.types[0];
  const color = primary ? TYPE_META[primary]?.color : '#78C850';
  return {
    background: `radial-gradient(circle at 50% 20%, ${color}55, ${color}22)`,
  };
});

const closeModal = () => emit('close');
const toggleFavorite = () => {
  if (props.pokemon) emit('toggle-favorite', props.pokemon.id);
};

const sharePokemon = async () => {
  if (!props.pokemon) return;

  const attributes: string[] = [displayName.value || props.pokemon.name];

  if (props.pokemon.types && props.pokemon.types.length) {
    attributes.push(...props.pokemon.types);
  }
  if (formattedWeight.value) {
    attributes.push(formattedWeight.value);
  }
  if (formattedHeight.value) {
    attributes.push(formattedHeight.value);
  }
  if (props.pokemon.category) {
    attributes.push(props.pokemon.category);
  }
  if (props.pokemon.ability) {
    attributes.push(props.pokemon.ability);
  }

  const shareText = attributes.filter(Boolean).join(', ');

  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(shareText);
    } else {
      const textArea = document.createElement('textarea');
      textArea.value = shareText;
      textArea.style.position = 'fixed';
      textArea.style.opacity = '0';
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
    }

    isCopied.value = true;
    if (copiedTimeout) clearTimeout(copiedTimeout);
    copiedTimeout = setTimeout(() => {
      isCopied.value = false;
    }, 5000);
  } catch (err) {
    console.error('Error al copiar en el portapapeles:', err);
  }
};
</script>

<template>
  <div v-if="isOpen && pokemon" class="modal-overlay" @click.self="closeModal">
    <div class="modal">
      <header class="modal-header">
        <button
          class="icon-btn close-button"
          type="button"
          @click="closeModal"
          :aria-label="t('common.back')"
        >
          <i class="fa-solid fa-arrow-left"></i>
        </button>

        <div class="header-actions">
          <button
            class="icon-btn favorite-btn"
            :class="{ active: pokemon.isFavorite }"
            type="button"
            @click="toggleFavorite"
            :aria-label="pokemon.isFavorite ? t('pokemon.removeFavorite') : t('pokemon.addFavorite')"
          >
            <i :class="pokemon.isFavorite ? 'fa-solid fa-heart' : 'fa-regular fa-heart'"></i>
          </button>
        </div>
      </header>

      <div class="hero" :style="heroBackground">
        <div class="hero-blob"></div>
        <img :src="pokemon.image" :alt="pokemon.name" class="pokemon-image" loading="lazy" />
      </div>

      <div class="info">
        <div class="title-row">
          <h2 class="name">{{ displayName }}</h2>
          <span class="number">N°{{ paddedId }}</span>
        </div>

        <div class="type-badges">
          <span v-for="type in pokemon.types" :key="type" class="badge" :style="badgeStyle(type)">
            <i :class="typeIcon(type)"></i>
            {{ typeLabel(type) }}
          </span>
        </div>

        <p v-if="pokemon.description" class="description">{{ pokemon.description }}</p>

        <div class="divider"></div>

        <div class="stats-grid">
          <div class="stat-box">
            <span class="stat-label"><i class="fa-solid fa-box"></i> {{ t('pokemon.weight') }}</span>
            <div class="stat-value">{{ formattedWeight }}</div>
          </div>
          <div class="stat-box">
            <span class="stat-label"><i class="fa-solid fa-ruler-vertical"></i> {{ t('pokemon.height') }}</span>
            <div class="stat-value">{{ formattedHeight }}</div>
          </div>
          <div class="stat-box">
            <span class="stat-label"><i class="fa-solid fa-table-cells"></i> {{ t('pokemon.category') }}</span>
            <div class="stat-value">{{ (pokemon.category || '—').toUpperCase() }}</div>
          </div>
          <div class="stat-box">
            <span class="stat-label"><i class="fa-solid fa-circle-info"></i> {{ t('pokemon.ability') }}</span>
            <div class="stat-value">{{ pokemon.ability || '—' }}</div>
          </div>
        </div>

        <div v-if="genderInfo" class="gender-section">
          <span class="section-title">{{ t('pokemon.gender') }}</span>
          <div class="gender-bar">
            <div class="gender-bar-male" :style="{ width: genderInfo.malePercent + '%' }"></div>
            <div class="gender-bar-female" :style="{ width: genderInfo.femalePercent + '%' }"></div>
          </div>
          <div class="gender-labels">
            <span><i class="fa-solid fa-mars"></i> {{ genderInfo.malePercent }}%</span>
            <span><i class="fa-solid fa-venus"></i> {{ genderInfo.femalePercent }}%</span>
          </div>
        </div>

        <div v-if="weaknesses.length" class="weaknesses-section">
          <h3 class="section-title">{{ t('pokemon.weaknesses') }}</h3>
          <div class="type-badges">
            <span v-for="type in weaknesses" :key="type" class="badge" :style="badgeStyle(type)">
              <i :class="typeIcon(type)"></i>
              {{ typeLabel(type) }}
            </span>
          </div>
        </div>

        <div class="modal-footer">
          <AppButton variant="primary" class="share-button" @click="sharePokemon">
            <i :class="isCopied ? 'fa-solid fa-check' : 'fa-solid fa-share-nodes'"></i>
            {{ isCopied ? t('pokemon.copied') : t('pokemon.share') }}
          </AppButton>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.modal-overlay {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 20px;
}

.modal {
  background: white;
  border-radius: 24px;
  width: 100%;
  max-width: 400px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
}

.modal-header {
  position: absolute;
  top: 16px;
  left: 16px;
  right: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 10;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 8px;
}

.icon-btn {
  background: rgba(255, 255, 255, 0.35);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.4);
  border-radius: 50%;
  color: #1a1e29;
  font-size: 1.1rem;
  cursor: pointer;
  width: 38px;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    background: rgba(255, 255, 255, 0.65);
    transform: scale(1.08);
  }

  &:active {
    transform: scale(0.95);
  }

  &.favorite-btn {
    &.active {
      background: rgba(255, 255, 255, 0.95);
      
      i {
        color: #e53935;
      }
    }

    i {
      transition: color 0.2s ease;
    }
  }
}

.hero {
  position: relative;
  height: 260px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  border-radius: 24px 24px 0 0;
}

.hero-blob {
  position: absolute;
  inset: -20% -10% 0 -10%;
  background: inherit;
  border-radius: 0 0 50% 50% / 0 0 40% 40%;
}

.pokemon-image {
  position: relative;
  max-width: 200px;
  max-height: 200px;
  object-fit: contain;
  image-rendering: pixelated;
  z-index: 1;
}

.info {
  padding: 20px 24px 28px;
}

.title-row {
  display: flex;
  align-items: baseline;
  gap: 12px;
}

.name {
  font-size: 28px;
  font-weight: 700;
  margin: 0;
}

.number {
  color: #9aa0a6;
  font-size: 14px;
}

.type-badges {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 10px;
}

.badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: white;
  padding: 6px 14px;
  border-radius: 999px;
  font-size: 13px;
  font-weight: 600;
}

.description {
  margin-top: 16px;
  color: #6b7280;
  font-size: 14px;
  line-height: 1.5;
}

.divider {
  height: 1px;
  background-color: #e5e7eb;
  margin: 20px 0;
}

.stats-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.stat-box {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.stat-label {
  font-size: 12px;
  font-weight: 600;
  color: #9aa0a6;
  display: flex;
  align-items: center;
  gap: 6px;
}

.stat-value {
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 10px 14px;
  font-size: 18px;
  font-weight: 600;
}

.gender-section,
.weaknesses-section {
  margin-top: 24px;
}

.section-title {
  display: block;
  font-size: 12px;
  font-weight: 700;
  color: #9aa0a6;
  letter-spacing: 0.05em;
  margin-bottom: 8px;
}

.gender-bar {
  display: flex;
  height: 8px;
  border-radius: 999px;
  overflow: hidden;
}

.gender-bar-male {
  background-color: #4f6ef7;
}

.gender-bar-female {
  background-color: #f78fb3;
}

.gender-labels {
  display: flex;
  justify-content: space-between;
  margin-top: 6px;
  font-size: 13px;
  color: #4b5563;
}

.modal-footer {
  margin-top: 24px;
  display: flex;
  justify-content: center;

  .share-button {
    width: 100%;
    i {
      margin-right: 4px;
    }
  }
}
</style>