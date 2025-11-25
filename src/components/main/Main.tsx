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
import { Link, Outlet, useSearchParams } from 'react-router';
import arrow from '../../assets/arrow-next.svg';
import cross from '../../assets/cross.svg';
import DetailsCard from '../detailsCard/DetailsCard';
import { useSearchQuery } from '../../hooks/useSearchQuery';
import SelectedCardsMenu from '../selectedCardsMenu/SelectedCardsMenu';

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

  const [params, setParams] = useSearchParams({ page: '1' });
  const [detailsId, setDetailsId] = useState<string | null>(null);
  const { setValue, getSavedQuery } = useSearchQuery({
    key: 'searchQuery',
  });
  const [selectedCharacters, setSelectedCharacters] = useState<Set<string>>(
    new Set()
  );

  const currentPage = Number(params.get('page')) || 1;
  const linkURL = 'https://rickandmortyapi.com/graphql/';

  useEffect(() => {
    const characterId = params.get('character');
    if (characterId) {
      setDetailsId(characterId);
    }
  }, [params]);

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
            page: Number(params.get('page')),
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
    [linkURL, startLoading, handleError, params]
  );

  useEffect(() => {
    const savedQuery = getSavedQuery() || '';
    fetchCharacters(savedQuery);
  }, [fetchCharacters]);

  const toggleCharacterSelection = useCallback((characterId: string) => {
    setSelectedCharacters((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(characterId)) {
        newSet.delete(characterId);
      } else {
        newSet.add(characterId);
      }
      return newSet;
    });
  }, []);

  const handleSearch = useCallback(
    (query: string) => {
      const trimmedQuery = query.trim();
      setValue(trimmedQuery);
      const newParams = new URLSearchParams();
      newParams.set('page', '1');
      setParams(newParams);
      setDetailsId(null);
      setSelectedCharacters(new Set());
      fetchCharacters(trimmedQuery);
    },
    [setValue, setParams, fetchCharacters]
  );

  const setDetailsIdWithParams = useCallback(
    (id: string | null) => {
      setDetailsId(id);

      const newParams = new URLSearchParams(params);
      if (id) {
        newParams.set('character', id);
      } else {
        newParams.delete('character');
      }
      setParams(newParams);
    },
    [params, setParams]
  );

  const cancel = useCallback(() => {
    setDetailsId(null);
    const newParams = new URLSearchParams(params);
    newParams.delete('character');
    setParams(newParams);
  }, [params, setParams]);

  const handlePrevPress = () => {
    const newParams = new URLSearchParams(params);
    newParams.set('page', String(currentPage - 1));
    setParams(newParams);
    fetchCharacters(localStorage.getItem('searchQuery') || '');
  };

  const handleNextPress = () => {
    const newParams = new URLSearchParams(params);
    newParams.set('page', String(currentPage + 1));
    setParams(newParams);
    fetchCharacters(localStorage.getItem('searchQuery') || '');
  };

  const handleDownloadSelectedCharacters = () => {
    const charactersToDownload = Array.from(selectedCharacters);

    if (charactersToDownload.length === 0) {
      return;
    }

    const selectedCharacterData = characters.filter((character) =>
      charactersToDownload.includes(character.id)
    );

    const csvHeaders = [
      'ID',
      'Name',
      'Status',
      'Species',
      'Origin',
      'Location',
      'Image URL',
      'Details URL',
    ];

    const csvRows = selectedCharacterData.map((character) => [
      character.id,
      `"${character.name}"`,
      character.status,
      character.species,
      `"${character.origin?.name || 'Unknown'}"`,
      `"${character.location?.name || 'Unknown'}"`,
      character.image,
      `"https://rickandmortyapi.com/character/${character.id}"`,
    ]);

    const csvContent = [
      csvHeaders.join(','),
      ...csvRows.map((row) => row.join(',')),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');

    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute(
        'download',
        `${charactersToDownload.length}_characters.csv`
      );
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }
  };

  return (
    <>
      <div className="m-4 p-4 bg-gray-300/40 space-y-6 border-2 border-blue-500 border-dashed rounded-lg">
        <h1 className="mt-5 text-xl font-bold text-center text-blue-700/90 tracking-widest uppercase">
          Search for your favorite Rick and Morty characters <br />
          and learn more about them!
        </h1>
        <Search onSearch={handleSearch} />
        <div className=" h-[80vh] overflow-y-auto bg-zinc-700 rounded-lg shadow-md">
          {isLoading && (
            <div>
              <LoadingBar />
            </div>
          )}
          {error && <Fallback text={error} />}
          {isSearched && !isLoading && (
            <div className="parent flex flex-col-reverse lg:flex-row gap-4 justify-evenly p-4">
              <CardList
                items={characters}
                setDetailsId={setDetailsIdWithParams}
                detailsId={detailsId}
                selectedCharacters={selectedCharacters}
                onToggleSelection={toggleCharacterSelection}
              />

              {detailsId && (
                <div>
                  <DetailsCard id={detailsId} cancel={cancel} />
                </div>
              )}
            </div>
          )}

          {selectedCharacters.size > 0 && (
            <div className="flex-shrink-0">
              <SelectedCardsMenu
                selected={selectedCharacters.size}
                removeAll={() => setSelectedCharacters(new Set())}
                download={() => handleDownloadSelectedCharacters()}
              />
            </div>
          )}
        </div>

        <div className="flex justify-center items-center mt-4 gap-4">
          {info.prev == null ? (
            <img
              src={cross}
              alt="prev page unavailable"
              className="size-8 cursor-auto"
            />
          ) : (
            <button onClick={handlePrevPress} className="cursor-pointer">
              <img src={arrow} alt="arrow prev" className="rotate-180 size-8" />
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
      </div>

      <Outlet />

      <nav>
        <Link
          to="/about"
          className="m-4 flex flex-col justify-center items-center border-2 border-red-500 border-dashed rounded-lg p-2 hover:bg-red-100 transition-colors duration-300 cursor-pointer tracking-widest uppercase text-red-500 font-bold text-l"
        >
          about this app author
        </Link>
      </nav>
    </>
  );
};

export default Main;
