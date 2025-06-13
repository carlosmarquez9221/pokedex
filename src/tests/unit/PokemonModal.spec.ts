import PokemonModal from '@/components/molecules/PokemonModal.vue';
import { nextTick } from 'vue';
import { useI18n } from 'vue-i18n';
import AppButton from '@/components/atoms/AppButton.vue';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import type { Mock } from 'vitest';
import { mount } from '@vue/test-utils';

vi.mock('vue-i18n');
vi.stubGlobal('navigator', {
  clipboard: {
    writeText: vi.fn(),
  },
});

describe('PokemonModal', () => {
  const mockPokemon = {
    name: 'pikachu',
    image: 'pikachu.png',
    weight: 60,
    height: 4,
    types: ['electric'],
    isFavorite: true,
  };

  const mockT = (key: string) => {
    const translations: Record<string, string> = {
      'pokemon.share': 'Share',
      'pokemon.copied': 'Copied!',
      'pokemon.name': 'Name',
      'pokemon.weight': 'Weight',
      'pokemon.height': 'Height',
      'pokemon.types': 'Types',
    };
    return translations[key] || key;
  };

  beforeEach(() => {
    (useI18n as any).mockReturnValue({ t: mockT });
  });

  afterEach(() => {
    vi.clearAllMocks();
    document.body.style.overflow = '';
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
    expect(wrapper.text()).toContain(mockPokemon.name);
    expect(wrapper.text()).toContain(mockPokemon.weight);
    expect(wrapper.text()).toContain(mockPokemon.types.join(', '));
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

  it('copies pokemon data to clipboard and updates button text', async () => {
    const wrapper = mount(PokemonModal, {
      props: {
        isOpen: true,
        pokemon: mockPokemon,
      },
    });

    const button = wrapper.findComponent(AppButton);
    await button.trigger('click');

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
      'pikachu, weight: 60, height: 4, types: electric'
    );
    expect(button.text()).toBe('Copied!');

    // Avanzar el tiempo para verificar que el texto vuelve al original
    await new Promise((resolve) => setTimeout(resolve, 2000));
    await nextTick();
    expect(button.text()).toBe('Share');
  });

  it('handles clipboard error gracefully', async () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    (navigator.clipboard.writeText as Mock).mockRejectedValue(new Error('Clipboard error'));

    const wrapper = mount(PokemonModal, {
      props: {
        isOpen: true,
        pokemon: mockPokemon,
      },
    });

    await wrapper.findComponent(AppButton).trigger('click');
    expect(consoleSpy).toHaveBeenCalledWith('Failed to copy text: ', expect.any(Error));
  });

  it('sets body overflow to hidden when modal opens and resets when closes', async () => {
    const wrapper = mount(PokemonModal, {
      props: {
        isOpen: false,
        pokemon: mockPokemon,
      },
    });

    // Abrir modal
    await wrapper.setProps({ isOpen: true });
    expect(document.body.style.overflow).toBe('hidden');

    // Cerrar modal
    await wrapper.setProps({ isOpen: false });
    expect(document.body.style.overflow).toBe('');
  });

  it('resets body overflow when component is unmounted', async () => {
    const wrapper = mount(PokemonModal, {
      props: {
        isOpen: true,
        pokemon: mockPokemon,
      },
    });

    wrapper.unmount();
    expect(document.body.style.overflow).toBe('');
  });

  it('displays favorite star correctly', () => {
    const wrapper = mount(PokemonModal, {
      props: {
        isOpen: true,
        pokemon: mockPokemon,
      },
    });

    const star = wrapper.find('.star-icon');
    expect(star.classes()).toContain('active');
  });
});