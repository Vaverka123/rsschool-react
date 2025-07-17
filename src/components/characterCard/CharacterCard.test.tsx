import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import CharacterCard from './CharacterCard';
import type { CharacterData } from '../../types/types';

const mockCharacter: CharacterData = {
  id: '1',
  name: 'Rick Sanchez',
  status: 'Alive',
  species: 'Human',
  image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
  location: { name: 'Earth (Replacement Dimension)' },
  origin: { name: 'Earth (C-137)' },
};

describe('CharacterCard Component', () => {
  it('displays item name and description correctly', () => {
    render(<CharacterCard {...mockCharacter} />);

    expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    expect(screen.getByText('Alive - Human')).toBeInTheDocument();
    expect(
      screen.getByText('Earth (Replacement Dimension)')
    ).toBeInTheDocument();
    expect(screen.getByText('Earth (C-137)')).toBeInTheDocument();

    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', mockCharacter.image);
    expect(image).toHaveAttribute('alt', 'Rick Sanchez');
  });

  it('handles missing props gracefully', () => {});
});
