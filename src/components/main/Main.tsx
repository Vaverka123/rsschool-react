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

  private readonly linkURL = 'https://rickandmortyapi.com/graphql/';

  componentDidMount() {
    const savedQuery = localStorage.getItem('searchQuery') || '';
    this.fetchCharacters(savedQuery);
  }

  private startLoading = () => {
    this.setState({ isLoading: true, error: null });
  };

  private handleError = (error: unknown) => {
    let message = 'An unexpected error occurred.';
    if (error instanceof ClientError) {
      const gqlErrors = error.response?.errors;
      if (gqlErrors?.length) message = gqlErrors[0].message;
      else
        message = `Error code: ${error.response.status} - it is a Client Error, please check your request.`;
    } else if (error instanceof Error) {
      message = error.message;
    }

    this.setState({
      error: message,
      isLoading: false,
      isSearched: true,
    });
  };

  private renderDangerZone = () => (
    <div className="flex flex-col justify-center items-center space-y-4 border-2 border-red-500 border-dashed rounded-lg p-4">
      <h3 className="tracking-widest uppercase text-red-500 font-bold text-xl">
        danger zone
      </h3>
      <Button onClick={this.throwError}>Crash App</Button>
      <Button onClick={this.handleBadRequest}>see 400 response</Button>
    </div>
  );

  fetchCharacters = async (query: string) => {
    this.startLoading();
    try {
      const data: CharactersResponse = await request(
        this.linkURL,
        GET_CHARACTERS,
        { name: query, page: 1 }
      );
      this.setState({
        characters: data.characters.results || [],
        isLoading: false,
        isSearched: true,
      });
    } catch (error: unknown) {
      this.handleError(error);
    }
  };

  fetchBadRequest = async () => {
    this.startLoading();
    try {
      const data: CharactersResponse = await request(this.linkURL, CRASH_4XX);
      this.setState({
        characters: data.characters.results || [],
        isLoading: false,
        isSearched: true,
      });
    } catch (error: unknown) {
      this.handleError(error);
    }
  };

  handleSearch = (query: string) => {
    const trimmedQuery = query.trim();
    this.fetchCharacters(trimmedQuery);
  };

  handleBadRequest = () => {
    this.fetchBadRequest();
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
      <div className="m-8 bg-gray-100 p-6 space-y-6 border-2 border-blue-500 border-dashed rounded-lg">
        <h1 className="mt-5 text-3xl font-bold text-center text-blue-700 tracking-widest uppercase">
          Search for your favorite Rick and Morty characters <br />
          and learn more about them!
        </h1>
        <Search onSearch={this.handleSearch} />
        <div className="mx-auto w-[90%] h-[65vh] overflow-y-auto bg-zinc-700 rounded-lg shadow-md">
          {isLoading && (
            <div>
              <LoadingBar />
            </div>
          )}
          {error && <Fallback text={error} />}
          {isSearched && <CardList items={characters} />}
        </div>
        {this.renderDangerZone()}
      </div>
    );
  }
}

export default Main;
