import type { FC } from 'react';
import type { Character } from '../../types/Character';

interface CharacterCardProps {
  character: Character;
}

const CharacterCard: FC<CharacterCardProps> = ({ character }) => (
  <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden p-6">
    <div className="flex items-center space-x-4">
      <img
        className="w-24 h-24 rounded-full object-cover border-2 border-gray-300"
        src={character.image}
        alt={character.fullname}
      />
      <div>
        <h2 className="text-xl font-bold text-gray-900">
          {character.fullname}
        </h2>
        <p className="text-sm text-gray-600 italic">{character.nickname}</p>
        <p className="text-sm text-gray-700 mt-1">
          🏠 {character.hogwartsHouse}
        </p>
        <p className="text-sm text-gray-500">🎂 {character.birthDate}</p>
      </div>
    </div>
  </div>
);

export default CharacterCard;
