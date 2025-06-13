import axios from 'axios';
import type { PokemonListResponse, PokemonApiResponse } from '../types/pokemon.d';

const api = axios.create({ baseURL: 'https://pokeapi.co/api/v2' });

export const fetchPokemons = async (): Promise<PokemonListResponse> => {
  const { data } = await api.get('/pokemon');
  return data;
};

export const fetchPokemonDetails = async (id: string): Promise<PokemonApiResponse> => {
  const { data } = await api.get(`/pokemon/${id}`);
  return data as PokemonApiResponse;
};