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
  isSelected,
  action,
  onToggleSelection,
}) => {
  const handleClick = () => {
    action();
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    onToggleSelection?.();
  };

  return (
    <div className="flex items-start">
      <label className="cursor-pointer">
        <span className="sr-only">Select Character</span>
        <input
          type="checkbox"
          className="form-checkbox h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          checked={isSelected}
          onChange={handleCheckboxChange}
        />
      </label>
      <button
        onClick={handleClick}
        className={`w-full max-w-lg h-auto sm:h-[220px] flex rounded overflow-hidden cursor-pointer ${isActive ? 'bg-zinc-800' : ' bg-zinc-600'}`}
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
    </div>
  );
};

export default CharacterCard;
