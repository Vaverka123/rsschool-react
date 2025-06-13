import { Component } from 'react';
import type { PokemonCardProps } from '../../types/types';

class PokemonCard extends Component<PokemonCardProps> {
  render() {
    const {
      id,
      name,
      types,
      height,
      weight,
      base_experience,
      abilities = [],
      image,
    } = this.props.data;

    return (
      <div className="flex items-center gap-4 max-w-sm rounded-2xl overflow-hidden shadow-md bg-white dark:bg-zinc-800 p-4 text-zinc-900 dark:text-white">
        <div>
          <h2 className="text-xl font-bold mb-2 capitalize">
            {name} <span className="text-sm text-zinc-500">#{id}</span>
          </h2>
          <img
            src={image}
            alt={name}
            className="w-full h-36 object-contain mb-4 "
          />
        </div>
        <div>
          <p>
            <strong>Type: </strong>
            {types.map((type) => type.type.name).join(', ')}
          </p>
          <p>
            <strong>Height: </strong> {height / 10} m
          </p>
          <p>
            <strong>Weight: </strong> {weight / 10} kg
          </p>
          <p>
            <strong>Base XP: </strong> {base_experience}
          </p>
          <p>
            <strong>Abilities: </strong>
            {abilities.map((ability) => ability.ability.name).join(', ')}
          </p>
        </div>
      </div>
    );
  }
}

export default PokemonCard;
