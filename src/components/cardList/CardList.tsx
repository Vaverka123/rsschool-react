import { FC } from 'react';
import type { CardListProps } from '../../types/types';
import CharacterCard from '../characterCard/CharacterCard';
import Fallback from '../fallback/Fallback';

const CardList: FC<CardListProps> = ({ items, setDetailsId, detailsId }) => {
  if (items.length === 0) {
    return <Fallback text="No results found." />;
  }

  return (
    <div className="flex flex-wrap gap-6 p-6 justify-center items-center">
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
        />
      ))}
    </div>
  );
};

export default CardList;
