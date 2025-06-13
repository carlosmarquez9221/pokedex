import { setActivePinia, createPinia } from 'pinia';
import { usePokemonStore } from '@/stores/pokemon.store';
import { fetchPokemons, fetchPokemonDetails } from '@/services/api/pokemon.api';
import type { PokemonDetails } from '@/services/types/pokemon.d';
import { expect, vi, describe, it, beforeEach } from 'vitest';
import type { Mock } from 'vitest';

vi.mock('@/services/api/pokemon.api', () => ({
  fetchPokemons: vi.fn(),
  fetchPokemonDetails: vi.fn(),
}));

const mockPokemonList = [
  { name: 'pikachu', url: 'https://pokeapi.co/api/v2/pokemon/25/' },
  { name: 'charizard', url: 'https://pokeapi.co/api/v2/pokemon/6/' },
];

const mockPokemonDetails: PokemonDetails = {
  id: 25,
  name: 'pikachu',
  image: 'pikachu.png',
  weight: 60,
  height: 4,
  types: ['electric'],
};

describe('Pokemon Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    vi.clearAllMocks();

    (fetchPokemons as Mock).mockResolvedValue({ results: mockPokemonList });
    (fetchPokemonDetails as Mock).mockResolvedValue(mockPokemonDetails);
  });

  describe('State', () => {
    it('should initialize with default values', () => {
      const store = usePokemonStore();

      expect(store.state.list).toEqual([]);
      expect(store.state.currentPokemon).toBeNull();
      expect(store.state.loading).toBe(true);
      expect(store.state.isModalOpen).toBe(false);
    });
  });

  describe('Actions', () => {
    it('loadPokemons should update state correctly', async () => {
      const store = usePokemonStore();
      await store.actions.loadPokemons();
      expect(fetchPokemons).toHaveBeenCalled();
      expect(store.state.list).toEqual([
        { ...mockPokemonList[0], isFavorite: false },
        { ...mockPokemonList[1], isFavorite: false },
      ]);
      expect(store.state.loading).toBe(false);
    });

    it('loadPokemonDetails should set currentPokemon', async () => {
      const store = usePokemonStore();
      const testId = '25';
      (fetchPokemonDetails as Mock).mockResolvedValue({
        id: 25,
        name: 'pikachu',
        sprites: {
          front_default: 'pikachu.png',
          other: {
            'official-artwork': {
              front_default: 'pikachu.png'
            }
          }
        },
        weight: 60,
        height: 4,
        types: [
          { type: { name: 'electric' } }
        ]
      });
      await store.actions.loadPokemonDetails(testId);
      expect(fetchPokemonDetails).toHaveBeenCalledWith(testId);
      expect(store.state.currentPokemon).toEqual({
        id: 25,
        name: 'pikachu',
        image: 'pikachu.png',
        weight: 60,
        height: 4,
        types: ['electric']
      });
    });

    it('should handle modal state', () => {
      const store = usePokemonStore();
      store.actions.openModal();
      expect(store.state.isModalOpen).toBe(true);
      store.actions.closeModal();
      expect(store.state.isModalOpen).toBe(false);
    });
  });

  describe('Error Handling', () => {
    it('should handle API errors in loadPokemons', async () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      (fetchPokemons as Mock).mockRejectedValue(new Error('API Error'));

      const store = usePokemonStore();
      await store.actions.loadPokemons();
      expect(consoleSpy).toHaveBeenCalled();
      expect(store.state.list).toEqual([]);
    });

    it('should handle API errors in loadPokemonDetails', async () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      (fetchPokemonDetails as Mock).mockRejectedValue(new Error('Not Found'));

      const store = usePokemonStore();
      await store.actions.loadPokemonDetails('999');
      expect(consoleSpy).toHaveBeenCalled();
      expect(store.state.currentPokemon).toBeNull();
    });
  });
});