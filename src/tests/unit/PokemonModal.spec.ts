import PokemonModal from '@/components/molecules/PokemonModal.vue';
import { useI18n } from 'vue-i18n';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { mount } from '@vue/test-utils';

vi.mock('vue-i18n');

describe('PokemonModal', () => {
  const mockPokemon = {
    id: 25,
    name: 'pikachu',
    image: 'pikachu.png',
    weight: 60,
    height: 4,
    types: ['electric'],
    isFavorite: true,
  };

  const mockT = (key: string) => {
    const translations: Record<string, string> = {
      'common.back': 'Back',
      'pokemon.addFavorite': 'Add to favorites',
      'pokemon.removeFavorite': 'Remove from favorites',
      'pokemon.weight': 'Weight',
      'pokemon.height': 'Height',
      'pokemon.category': 'Category',
      'pokemon.ability': 'Ability',
    };
    return translations[key] || key;
  };

  beforeEach(() => {
    (useI18n as any).mockReturnValue({ t: mockT });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders correctly when isOpen is true', () => {
    const wrapper = mount(PokemonModal, {
      props: {
        isOpen: true,
        pokemon: mockPokemon,
      },
    });

    expect(wrapper.find('.modal-overlay').exists()).toBe(true);
    expect(wrapper.find('.pokemon-image').attributes('src')).toBe(mockPokemon.image);
    expect(wrapper.find('.pokemon-image').attributes('alt')).toBe(mockPokemon.name);
    expect(wrapper.text().toLowerCase()).toContain(mockPokemon.name);
    expect(wrapper.text()).toContain('6,0 kg');
    expect(wrapper.text()).toContain('0,4 m');
  });

  it('does not render when isOpen is false', () => {
    const wrapper = mount(PokemonModal, {
      props: {
        isOpen: false,
        pokemon: mockPokemon,
      },
    });

    expect(wrapper.find('.modal-overlay').exists()).toBe(false);
  });

  it('emits close event when close button is clicked', async () => {
    const wrapper = mount(PokemonModal, {
      props: {
        isOpen: true,
        pokemon: mockPokemon,
      },
    });

    await wrapper.find('.close-button').trigger('click');
    expect(wrapper.emitted('close')).toBeTruthy();
  });

  it('emits toggle-favorite event when favorite heart button is clicked', async () => {
    const wrapper = mount(PokemonModal, {
      props: {
        isOpen: true,
        pokemon: mockPokemon,
      },
    });

    const favBtn = wrapper.find('.favorite-btn');
    expect(favBtn.exists()).toBe(true);
    expect(favBtn.classes()).toContain('active');

    await favBtn.trigger('click');
    expect(wrapper.emitted('toggle-favorite')).toBeTruthy();
    expect(wrapper.emitted('toggle-favorite')![0]).toEqual([mockPokemon.id]);
  });
});