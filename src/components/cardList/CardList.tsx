import { Component } from 'react';
import type { CardListProps } from '../../types/types';
import CharacterCard from '../characterCard/CharacterCard';

class CardList extends Component<CardListProps> {
  render() {
    const { items } = this.props;
    if (items.length === 0) {
      return <p>No results found.</p>;
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
          />
        ))}
      </div>
    );
  }
}

export default CardList;
