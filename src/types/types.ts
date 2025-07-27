export interface MainProps {
  data: {
    loading: boolean;
    error?: Error;

    characters?: {
      results: CharacterData[];
    };
  };
}

export interface MainState {
  info: InfoData;
  characters: CharacterData[];
  error: string | null;
  isLoading: boolean;
  isSearched: boolean;
  crash: boolean;
}

export type CharacterData = {
  id: string;
  name: string;
  status: string;
  species: string;
  image: string | null;
  location: { name: string };
  origin: { name: string };
};

export type CharactersResponse = {
  characters: {
    info: InfoData;
    results: CharacterData[];
  };
};

export type CardListProps = {
  items: CharacterData[];
};

export type InfoData = {
  count: number;
  pages: number;
  next: number | null;
  prev: number | null;
};
