import { Component } from 'react';
import PokemonCard from '../pokemonCard/PokemonCard';
import type { CardListProps } from '../../types/types';

class CardList extends Component<CardListProps> {
  render() {
    const { items } = this.props;
    if (items.length === 0) {
      return <p>No results found.</p>;
    }
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4  ">
        {items.map((item) => (
          <PokemonCard key={item.id} data={item} />
        ))}
      </div>
    );
  }
}

export default CardList;
