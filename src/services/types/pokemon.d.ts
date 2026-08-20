export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Array<{
    name: string;
    url: string;
  }>;
}

export interface PokemonApiResponse {
  id: number;
  name: string;
  sprites: {
    front_default: string;
    other: {
      'official-artwork': {
        front_default: string;
      };
    };
  };
  types: Array<{
    type: {
      name: string;
    };
  }>;
  height: number;
  weight: number;
  abilities: Array<{
    ability: {
      name: string;
    };
  }>;
  species: {
    name: string;
    url: string;
  };
  gender_rate: number;
  stats: Array<{
    base_stat: number;
    stat: {
      name: string;
    };
  }>;

}

export interface PokemonDetails {
  id: number;
  name: string;
  image: string;
  height: number;
  weight: number;
  types: string[];
  ability?: string;
  category?: string;
  description?: string;
  genderRate?: number;
  isFavorite?: boolean;
}

export interface PokemonFormResponse {
  form_name: string;
  form_names: any[];
  form_order: number;
  id: number;
  is_battle_only: boolean;
  is_default: boolean;
  is_mega: boolean;
  name: string;
  names: any[];
  order: number;
  pokemon: {
    name: string;
    url: string;
  };
  sprites: {
    back_default: string | null;
    back_female: string | null;
    back_shiny: string | null;
    back_shiny_female: string | null;
    front_default: string | null;
    front_female: string | null;
    front_shiny: string | null;
    front_shiny_female: string | null;
    versions: Record<string, Record<string, {
      front_default: string | null;
      front_female: string | null;
    }>>;
  };
  trigger_conditions: any[];
  types: Array<{
    slot: number;
    type: {
      name: string;
      url: string;
    };
  }>;
  version_group: {
    name: string;
    url: string;
  };
}

