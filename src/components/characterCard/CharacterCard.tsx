import { Component } from 'react';
import type { CharacterData } from '../../types/types';

class CharacterCard extends Component<CharacterData> {
  render() {
    const { id, name, status, species, image, location, origin } = this.props;
    return (
      <div>
        <img src={image} alt={name} />
        <p>{`#${id}`}</p>
        <div>
          <h2>{name}</h2>
          <h4>{`${status} - ${species}`}</h4>
          <div>
            <p>
              {`Location:`} <strong>{location.name}</strong>
            </p>
          </div>
          <div>
            <p>
              {`Origin:`} <strong>{origin.name}</strong>
            </p>
          </div>
        </div>
      </div>
    );
  }
}
export default CharacterCard;
