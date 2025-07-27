import { FC } from 'react';
import { CharacterData } from '../../types/types';

const CharacterCard: FC<CharacterData> = ({
  id,
  name,
  status,
  species,
  image,
  location,
  origin,
  isActive,
  action,
}) => {
  const handleClick = () => {
    action();
  };

  return (
    <button
      className={`w-full max-w-lg h-auto sm:h-[220px] flex rounded overflow-hidden cursor-pointer ${isActive ? 'bg-zinc-800' : ' bg-zinc-600'}`}
      onClick={handleClick}
    >
      <div>
        <img src={image || ''} alt={name} className="h-full object-cover" />
      </div>

      <div className="flex flex-col justify-between text-left p-4 flex-1 text-white">
        <p className="text-sm text-gray-300">#{id}</p>
        <h2 className="text-xl font-semibold">{name}</h2>

        <h4>{`${status} - ${species}`}</h4>
        <div>
          <p className="text-sm text-gray-300">{`Location:`}</p>
          <span>
            <strong>{location.name}</strong>
          </span>
        </div>
        <div>
          <p className="text-sm text-gray-300">{`Origin:`}</p>{' '}
          <strong>{origin.name}</strong>
        </div>
      </div>
    </button>
  );
};

export default CharacterCard;
