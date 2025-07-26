import { useState, useEffect, useCallback, FC } from 'react';
import Search from '../search/Search';
import CardList from '../cardList/CardList';
import { request, ClientError } from 'graphql-request';
import {
  type CharactersResponse,
  type MainProps,
  type MainState,
} from '../../types/types';
import { GET_CHARACTERS } from '../../graphql/queries/characters';
import LoadingBar from '../loadingBar/LoadingBar';
import Fallback from '../fallback/Fallback';
import { Link, Outlet } from 'react-router';
import arrow from '../../assets/arrow-next.svg';
import cross from '../../assets/cross.svg';

const Main: FC<MainProps> = () => {
  const [state, setState] = useState<MainState>({
    info: {
      count: 0,
      pages: 0,
      next: null,
      prev: null,
    },
    characters: [],
    error: null,
    isLoading: false,
    isSearched: false,
    crash: false,
  });

  const [currentPage, setCurrerntPage] = useState<number>(1);

  const linkURL = 'https://rickandmortyapi.com/graphql/';

  const startLoading = useCallback(() => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));
  }, []);

  const handleError = useCallback((error: unknown) => {
    let message = 'An unexpected error occurred.';
    if (error instanceof ClientError) {
      const gqlErrors = error.response?.errors;
      if (gqlErrors?.length) message = gqlErrors[0].message;
      else
        message = `Error code: ${error.response.status} - it is a Client Error, please check your request.`;
    } else if (error instanceof Error) {
      message = error.message;
    }

    setState((prev) => ({
      ...prev,
      error: message,
      isLoading: false,
      isSearched: true,
    }));
  }, []);

  const { info, characters, isLoading, error, isSearched } = state;

  const fetchCharacters = useCallback(
    async (query: string) => {
      startLoading();
      try {
        const data: CharactersResponse = await request(
          linkURL,
          GET_CHARACTERS,
          {
            name: query,
            page: currentPage,
          }
        );
        setState((prev) => ({
          ...prev,
          info: data.characters.info,
          characters: data.characters.results || [],
          isLoading: false,
          isSearched: true,
        }));
      } catch (error: unknown) {
        handleError(error);
      }
    },
    [linkURL, startLoading, handleError, currentPage]
  );

  useEffect(() => {
    const savedQuery = localStorage.getItem('searchQuery') || '';
    fetchCharacters(savedQuery);
  }, [fetchCharacters]);

  const handleSearch = useCallback(
    (query: string) => {
      const trimmedQuery = query.trim();
      fetchCharacters(trimmedQuery);
    },
    [fetchCharacters]
  );

  if (state.crash) {
    throw new Error('This is a test error!');
  }

  const handlePrevPress = () => {
    setCurrerntPage((prev) => prev - 1);
    fetchCharacters(localStorage.getItem('searchQuery') || '');
  };

  const handleNextPress = () => {
    setCurrerntPage((prev) => prev + 1);
    fetchCharacters(localStorage.getItem('searchQuery') || '');
  };

  return (
    <>
      <div className="m-8 bg-gray-100 p-6 space-y-6 border-2 border-blue-500 border-dashed rounded-lg">
        <h1 className="mt-5 text-3xl font-bold text-center text-blue-700 tracking-widest uppercase">
          Search for your favorite Rick and Morty characters <br />
          and learn more about them!
        </h1>
        <Search onSearch={handleSearch} />
        <div className="mx-auto w-[90%] h-[65vh] overflow-y-auto bg-zinc-700 rounded-lg shadow-md">
          {isLoading && (
            <div>
              <LoadingBar />
            </div>
          )}
          {error && <Fallback text={error} />}
          {isSearched && <CardList items={characters} />}
        </div>
        {(info.prev || info.next) && (
          <div className="flex justify-center items-center mt-4 gap-4">
            {info.prev == null ? (
              <img
                src={cross}
                alt="prev page unavailable"
                className="size-8 cursor-auto"
              />
            ) : (
              <button onClick={handlePrevPress} className="cursor-pointer">
                <img
                  src={arrow}
                  alt="arrow prev"
                  className="rotate-180 size-8"
                />
              </button>
            )}
            <p>
              Page {currentPage} of {info.pages}
            </p>
            {info.next == null ? (
              <img
                src={cross}
                alt="next page unavailable"
                className="size-8 cursor-auto"
              />
            ) : (
              <button onClick={handleNextPress} className="cursor-pointer">
                <img src={arrow} alt="arrow next" className="size-8" />
              </button>
            )}
          </div>
        )}
      </div>
      <nav>
        <Link
          to="/about"
          className="m-8 flex flex-col justify-center items-center border-2 border-red-500 border-dashed rounded-lg p-4 hover:bg-red-100 transition-colors duration-300 cursor-pointer tracking-widest uppercase text-red-500 font-bold text-xl"
        >
          about this app author
        </Link>
      </nav>
      <Outlet />
    </>
  );
};

export default Main;
