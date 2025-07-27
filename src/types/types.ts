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
  action: () => void;
  isActive?: boolean;
};

export type CharactersResponse = {
  characters: {
    info: InfoData;
    results: CharacterData[];
  };
};

export type CardListProps = {
  items: CharacterData[];
  setDetailsId: (id: string) => void;
  detailsId?: string | null;
};

export type InfoData = {
  count: number;
  pages: number;
  next: number | null;
  prev: number | null;
};

export type CharacterByIDResponse = {
  character: CharacterByIDData;
};

export type CharacterByIDData = {
  id: string;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  created: string;
  cancel?: () => void;
};

export type DetailsCardProps = {
  id: string | null;
  cancel: () => void;
};
