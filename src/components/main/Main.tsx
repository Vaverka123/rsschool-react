import { Component } from 'react';
import Search from '../search/Search';
import Button from '../button/Button';
import CardList from '../cardList/CardList';
import { request, ClientError } from 'graphql-request';
import {
  type CharactersResponse,
  type MainProps,
  type MainState,
} from '../../types/types';
import { CRASH_4XX, GET_CHARACTERS } from '../../graphql/queries/characters';
import LoadingBar from '../loadingBar/LoadingBar';
import Fallback from '../fallback/Fallback';

class Main extends Component<MainProps, MainState> {
  state: MainState = {
    characters: [],
    error: null,
    isLoading: false,
    isSearched: false,
    crash: false,
  };

  fetchCharacters = async (query: string) => {
    this.setState({ isLoading: true, error: null });
    try {
      const data: CharactersResponse = await request(
        'https://rickandmortyapi.com/graphql/',
        GET_CHARACTERS,
        { name: query, page: 1 }
      );
      this.setState({
        characters: data.characters.results || [],
        isLoading: false,
        isSearched: true,
      });
    } catch (error: unknown) {
      let message = 'Something went wrong.';

      if (error instanceof ClientError) {
        const gqlErrors = error.response?.errors;
        if (gqlErrors?.length) {
          message = gqlErrors[0].message;
        }
      } else if (error instanceof Error) {
        message = error.message;
      }

      this.setState({
        error: message,
        isLoading: false,
        isSearched: true,
      });
    }
  };

  handleSearch = (query: string) => {
    const trimmedQuery = query.trim();
    this.fetchCharacters(trimmedQuery);
  };

  runBadRequest = async () => {
    this.setState({ isLoading: true, error: null });
    try {
      const data: CharactersResponse = await request(
        'https://rickandmortyapi.com/graphql/',
        CRASH_4XX
      );
      this.setState({
        characters: data.characters.results || [],
        isLoading: false,
        isSearched: true,
      });
    } catch (error: unknown) {
      const message =
        error instanceof ClientError
          ? `Error code: ${error.response.status} - it is a Client Error, please check your request.`
          : 'Something went wrong.';

      this.setState({
        error: message,
        isLoading: false,
        isSearched: true,
      });
    }
  };

  handleBadRequest = () => {
    this.runBadRequest();
  };

  throwError = () => {
    this.setState({ crash: true });
  };

  render() {
    if (this.state.crash) {
      throw new Error('This is a test error!');
    }

    const { characters, isLoading, error, isSearched } = this.state;

    return (
      <div className="min-h-screen bg-gray-100 p-6 space-y-6">
        <h1 className="mt-5 text-3xl font-bold text-center text-blue-700">
          Search for your favorite Rick and Morty characters and learn more
          about them!
        </h1>
        <Search onSearch={this.handleSearch} />
        <div className="mx-auto w-[90%] h-[70vh] overflow-y-auto bg-zinc-700 rounded-lg shadow-md">
          {isLoading && (
            <div>
              <LoadingBar />
            </div>
          )}
          {error && <Fallback text={error} />}
          {isSearched && <CardList items={characters} />}
        </div>
        <div className="flex justify-center space-x-4 mt-4">
          <Button onClick={this.throwError}>Crash App</Button>
          <Button onClick={this.handleBadRequest}>see 4xx response</Button>
          <Button>see 5xx response</Button>
        </div>
      </div>
    );
  }
}

export default Main;
