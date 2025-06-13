type PokemonAbility = {
  is_hidden: boolean;
  slot: number;
  ability: {
    name: string;
    url: string;
  };
};

type TypePokemon = {
  slot: number;
  type: { name: string; url: string };
};

export type PokemonData = {
  id: number;
  name: string;
  types: TypePokemon[];
  height: number;
  weight: number;
  base_experience: number;
  abilities: PokemonAbility[];
  image: string;
};

export type PokemonCardProps = {
  data: PokemonData;
};

export type CardListProps = {
  items: {
    id: number;
    name: string;
    types: TypePokemon[];
    height: number;
    weight: number;
    base_experience: number;
    abilities: PokemonAbility[];
    image: string;
  }[];
};
