import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import CardList from './CardList';
import type { CharacterData } from '../../types/types';

vi.mock('../characterCard/CharacterCard', () => ({
  default: (props: CharacterData) => (
    <div data-testid="character-card" onClick={props.action}>
      {props.name}
    </div>
  ),
}));

vi.mock('../fallback/Fallback', () => ({
  default: (props: { text: string }) => (
    <div data-testid="fallback">{props.text}</div>
  ),
}));

describe('CardList Component', () => {
  const mockSetDetailsId = vi.fn();

  const mockCharacters: CharacterData[] = [
    {
      id: '1',
      name: 'Rick Sanchez',
      status: 'Alive',
      species: 'Human',
      image: 'rick.jpg',
      location: { name: 'Earth' },
      origin: { name: 'Earth C-137' },
      action: () => {},
    },
    {
      id: '2',
      name: 'Morty Smith',
      status: 'Alive',
      species: 'Human',
      image: 'morty.jpg',
      location: { name: 'Earth' },
      origin: { name: 'Earth C-137' },
      action: () => {},
    },
  ];

  it('renders fallback when no items', () => {
    render(
      <CardList items={[]} setDetailsId={mockSetDetailsId} detailsId={null} />
    );

    expect(screen.getByTestId('fallback')).toBeInTheDocument();
    expect(screen.getByText('No results found.')).toBeInTheDocument();
  });

  it('renders character cards when items exist', () => {
    render(
      <CardList
        items={mockCharacters}
        setDetailsId={mockSetDetailsId}
        detailsId={null}
      />
    );

    expect(screen.getAllByTestId('character-card')).toHaveLength(2);
    expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    expect(screen.getByText('Morty Smith')).toBeInTheDocument();
  });

  it('calls setDetailsId when character card is clicked', async () => {
    render(
      <CardList
        items={mockCharacters}
        setDetailsId={mockSetDetailsId}
        detailsId={null}
      />
    );

    const rickCard = screen.getByText('Rick Sanchez');
    await userEvent.click(rickCard);

    expect(mockSetDetailsId).toHaveBeenCalledWith('1');
  });

  it('has correct container styling', () => {
    render(
      <CardList
        items={mockCharacters}
        setDetailsId={mockSetDetailsId}
        detailsId={null}
      />
    );

    const container = screen
      .getByText('Rick Sanchez')
      .closest('div')?.parentElement;
    expect(container).toHaveClass('flex', 'flex-wrap', 'gap-6', 'p-6');
  });

  it('passes isActive prop correctly', () => {
    render(
      <CardList
        items={mockCharacters}
        setDetailsId={mockSetDetailsId}
        detailsId="1"
      />
    );

    expect(screen.getAllByTestId('character-card')).toHaveLength(2);
  });
});
