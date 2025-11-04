import { FC, useEffect, useState } from 'react';
import {
  CharacterByIDData,
  CharacterByIDResponse,
  DetailsCardProps,
} from '../../types/types';
import { GET_CHARACTER_BY_ID } from '../../graphql/queries/characters';
import { request } from 'graphql-request';
import LoadingBar from '../loadingBar/LoadingBar';

const DetailsCard: FC<DetailsCardProps> = ({ id, cancel }) => {
  const [dataByID, setDataByID] = useState<CharacterByIDData>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const linkURL = 'https://rickandmortyapi.com/graphql';
  const fetchCharacterByID = async (id: string) => {
    setIsLoading(true);
    try {
      const data: CharacterByIDResponse = await request(
        linkURL,
        GET_CHARACTER_BY_ID,
        { id: id }
      );
      setDataByID(data.character);
    } catch (error: unknown) {
      console.log('Error fetching character by ID:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!id) return;
    fetchCharacterByID(id);
  }, [id]);

  return (
    <>
      {!isLoading && dataByID ? (
        <div className={`flex flex-col rounded bg-zinc-400 sticky top-4`}>
          <button
            className="bg-red-300 mx-auto p-2 m-2 w-fit rounded-md text-black font-semibold hover:bg-red-400 transition-colors duration-300 cursor-pointer"
            onClick={cancel}
          >
            X close details view X
          </button>
          <div className="flex p-4">
            <div className="flex flex-col justify-between text-left p-4 flex-1 text-white">
              <p className="text-sm text-gray-300">#{dataByID.id}</p>
              <h2 className="text-xl font-semibold">{dataByID.name}</h2>

              <h4>{`${dataByID.status} - ${dataByID.species}`}</h4>
              <div>
                <p className="text-sm text-gray-300">{`Type:`}</p>
                <span>
                  <strong>{dataByID.type}</strong>
                </span>
              </div>
              <div>
                <p className="text-sm text-gray-300">{`Gender:`}</p>
                <span>
                  <strong>{dataByID.gender}</strong>
                </span>
              </div>
              <div>
                <p className="text-sm text-gray-300">{`Location:`}</p>
                <span>
                  <strong>{dataByID.location.name}</strong>
                </span>
              </div>
              <div>
                <p className="text-sm text-gray-300">{`Origin:`}</p>{' '}
                <strong>{dataByID.origin.name}</strong>
              </div>
              <div>
                <p className="text-sm text-gray-300">{`Created at:`}</p>
                <span>
                  <strong>{dataByID.created}</strong>
                </span>
              </div>
            </div>
            <div className="flex justify-center w-[150px] h-[150px] rounded overflow-hidden">
              <img
                src={dataByID.image || ''}
                alt={dataByID.name}
                className="h-full object-cover"
              />
            </div>
          </div>
        </div>
      ) : (
        <LoadingBar />
      )}
    </>
  );
};

export default DetailsCard;
