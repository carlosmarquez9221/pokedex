import axios from 'axios';
import type { PokemonListResponse, PokemonApiResponse, PokemonFormResponse } from '../types/pokemon.d';

const api = axios.create({ baseURL: 'https://pokeapi.co/api/v2/pokemon' });

export const fetchPokemons = async (): Promise<PokemonListResponse> => {
  const { data } = await api.get(`${api.defaults.baseURL}`);
  return data;
};

export const fetchPokemonDetails = async (id: string): Promise<PokemonApiResponse> => {
  const { data } = await api.get(`/${id}`);
  return data as PokemonApiResponse;
};

export const fetchPokemonForm = async (id: string): Promise<PokemonFormResponse> => {
  const { data } = await api.get(`${api.defaults.baseURL}-form/${id}`);
  return data as PokemonFormResponse;
};
