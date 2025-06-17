import { Component } from 'react';
import type { CharacterData } from '../../types/types';

class CharacterCard extends Component<CharacterData> {
  render() {
    const { name, status, species, image, location, origin } = this.props;
    return (
      <div className="w-full max-w-lg h-auto sm:h-[220px] flex bg-zinc-600 rounded overflow-hidden">
        <div>
          <img src={image} alt={name} className="h-full object-cover" />
        </div>

        <div className="flex flex-col justify-between p-4 flex-1 text-white">
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
      </div>
    );
  }
}
export default CharacterCard;
