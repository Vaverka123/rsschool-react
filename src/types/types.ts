export type CharacterData = {
  id: string;
  name: string;
  status: string;
  species: string;
  image: string;
  location: { name: string };
  origin: { name: string };
};

export type CharactersResponse = {
  characters: {
    results: CharacterData[];
  };
};

export type CardListProps = {
  items: CharacterData[];
};
