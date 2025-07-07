import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import CardList from './CardList';
import type { CardListProps } from '../../types/types';

const mockItems: CardListProps['items'] = [
  {
    id: '1',
    name: 'Rick Sanchez',
    status: 'Alive',
    species: 'Human',
    image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
    location: { name: 'Earth (Replacement Dimension)' },
    origin: { name: 'Earth (C-137)' },
  },
  {
    id: '2',
    name: 'Morty Smith',
    status: 'Alive',
    species: 'Human',
    image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
    location: { name: 'Citadel of Ricks' },
    origin: { name: 'Earth (C-137)' },
  },
];

describe('CardList Component', () => {
  it('renders the correct number of CharacterCard components', () => {
    render(<CardList items={mockItems} />);
    const cards = screen.getAllByRole('img');
    expect(cards).toHaveLength(mockItems.length);
    expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    expect(screen.getByText('Morty Smith')).toBeInTheDocument();
  });

  it('displays fallback message when items array is empty', () => {
    render(<CardList items={[]} />);
    expect(screen.getByText(/no results found/i)).toBeInTheDocument();
  });

  it('handles missing or undefined fields gracefully', () => {
    const incompleteData: CardListProps['items'] = [
      {
        id: '3',
        name: '',
        status: '',
        species: '',
        image: '',
        location: { name: '' },
        origin: { name: '' },
      },
    ];
    render(<CardList items={incompleteData} />);
    expect(screen.getByAltText('')).toBeInTheDocument();
  });
});
