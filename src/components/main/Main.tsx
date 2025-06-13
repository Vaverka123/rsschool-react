import { Component } from 'react';
import axios from 'axios';
import Search from '../search/Search';
import CardList from '../cardList/CardList';
import Button from '../button/Button';
import { type PokemonData } from '../../types/types';

interface MainState {
  pokemons: PokemonData[];
  error: string | null;
  isLoading: boolean;
  isSearched: boolean;
}

class Main extends Component<object, MainState> {
  state: MainState = {
    pokemons: [],
    error: null,
    isLoading: false,
    isSearched: false,
  };

  fetchCharacters = async (query: string) => {
    this.setState({ isLoading: true, error: null });
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${query}`
      );

      const result = response.data;
      console.log(result, 'result from API');

      const pokemon: PokemonData = {
        id: result.id,
        name: result.name,
        types: result.types.map((type: string) => type),
        height: result.height,
        weight: result.weight,
        base_experience: result.base_experience,
        abilities: result.abilities,
        image: result.sprites.front_default,
      };
      const pokemons = [pokemon];

      this.setState({ pokemons, isLoading: false, isSearched: true });
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'Failed to fetch characters. Please try again later.';
      this.setState({
        error: errorMessage,
        isLoading: false,
        isSearched: true,
      });
    }
  };

  handleSearch = (query: string) => {
    if (query) {
      localStorage.setItem('searchQuery', query);
    } else {
      localStorage.removeItem('searchQuery');
    }
    this.fetchCharacters(query);
  };

  render() {
    const { pokemons, error, isLoading, isSearched } = this.state;
    return (
      <div className="min-h-screen bg-gray-100 p-6 space-y-6">
        <h1 className="mt-5 text-3xl font-bold text-center text-blue-700">
          Search for your favorite Pokémons and learn more about them!
        </h1>
        <Search onSearch={this.handleSearch} />
        {isLoading && <div className="mt-4">Loading...</div>}
        {!isLoading && error && (
          <div className="mt-4 text-red-500">{error}</div>
        )}
        {!isLoading && !error && isSearched && <CardList items={pokemons} />}
        <Button>ERROR btn</Button>
      </div>
    );
  }
}

export default Main;
