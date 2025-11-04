import { FC } from 'react';
import type { CardListProps } from '../../types/types';
import CharacterCard from '../characterCard/CharacterCard';
import Fallback from '../fallback/Fallback';

const CardList: FC<CardListProps> = ({
  items,
  setDetailsId,
  detailsId,
  selectedCharacters,
  onToggleSelection,
}) => {
  if (items.length === 0) {
    return <Fallback text="No results found." />;
  }

  return (
    <div className="flex flex-wrap gap-4 p-2 justify-center items-center">
      {items?.map((item) => (
        <CharacterCard
          key={item.id}
          id={item.id}
          name={item.name}
          status={item.status}
          species={item.species}
          image={item.image}
          location={item.location}
          origin={item.origin}
          action={() => {
            setDetailsId(item.id);
          }}
          isActive={item.id === detailsId}
          isSelected={selectedCharacters?.has(item.id) || false}
          onToggleSelection={() => onToggleSelection?.(item.id)}
        />
      ))}
    </div>
  );
};

export default CardList;
