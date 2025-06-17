import { Component } from 'react';
import Search from '../search/Search';
import Button from '../button/Button';
import CardList from '../cardList/CardList';
import { request } from 'graphql-request';
import { type CharacterData, type CharactersResponse } from '../../types/types';
import { GET_CHARACTERS } from '../../graphql/queries/characters';

interface MainProps {
  data: {
    loading: boolean;
    error?: Error;
    characters?: {
      results: CharacterData[];
    };
  };
}

interface MainState {
  characters: CharacterData[];
  error: string | null;
  isLoading: boolean;
  isSearched: boolean;
}

class Main extends Component<MainProps, MainState> {
  state: MainState = {
    characters: [],
    error: null,
    isLoading: false,
    isSearched: false,
  };

  fetchCharacters = async (query: string) => {
    this.setState({ isLoading: true, error: null });
    try {
      const data: CharactersResponse = await request(
        'https://rickandmortyapi.com/graphql/',
        GET_CHARACTERS,
        { name: query, page: 1 }
      );
      console.log(data);
      this.setState({
        characters: data.characters.results || [],
        isLoading: false,
        isSearched: true,
      });
    } catch (error) {
      this.setState({
        error:
          error instanceof Error
            ? error.message
            : 'Failed to fetch characters.',
        isLoading: false,
        isSearched: true,
      });
    }
  };

  handleSearch = (query: string) => {
    const trimmedQuery = query.trim();
    console.log(`Searching for: ${trimmedQuery}`);
    this.fetchCharacters(trimmedQuery);
  };

  render() {
    const { characters, isLoading, error, isSearched } = this.state;

    return (
      <div className="min-h-screen bg-gray-100 p-6 space-y-6">
        <h1 className="mt-5 text-3xl font-bold text-center text-blue-700">
          Search for your favorite Rick and Morty characters and learn more
          about them!
        </h1>
        <Search onSearch={this.handleSearch} />
        <div className="mx-auto w-[90%] h-[70vh] overflow-y-auto bg-zinc-700 rounded-lg shadow-md">
          {isLoading && <div>Loading...</div>}
          {error && <div className="text-red-500">{error}</div>}
          {isSearched && <CardList items={characters} />}
        </div>
        <Button>ERROR btn</Button>
      </div>
    );
  }
}

export default Main;
