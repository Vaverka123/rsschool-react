import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import CharacterCard from './CharacterCard';
import type { CharacterData } from '../../types/types';

describe('CharacterCard Component', () => {
  const mockAction = vi.fn();

  const mockCharacter: CharacterData = {
    id: '1',
    name: 'Rick Sanchez',
    status: 'Alive',
    species: 'Human',
    image: 'rick.jpg',
    location: { name: 'Earth' },
    origin: { name: 'Earth C-137' },
    isActive: false,
    action: mockAction,
  };

  it('renders character name', () => {
    render(<CharacterCard {...mockCharacter} />);

    expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
  });

  it('renders character id', () => {
    render(<CharacterCard {...mockCharacter} />);

    expect(screen.getByText('#1')).toBeInTheDocument();
  });

  it('renders status and species', () => {
    render(<CharacterCard {...mockCharacter} />);

    expect(screen.getByText('Alive - Human')).toBeInTheDocument();
  });

  it('renders location', () => {
    render(<CharacterCard {...mockCharacter} />);

    expect(screen.getByText('Location:')).toBeInTheDocument();
    expect(screen.getByText('Earth')).toBeInTheDocument();
  });

  it('renders origin', () => {
    render(<CharacterCard {...mockCharacter} />);

    expect(screen.getByText('Origin:')).toBeInTheDocument();
    expect(screen.getByText('Earth C-137')).toBeInTheDocument();
  });

  it('renders character image', () => {
    render(<CharacterCard {...mockCharacter} />);

    const image = screen.getByAltText('Rick Sanchez');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'rick.jpg');
  });

  it('calls action when clicked', async () => {
    render(<CharacterCard {...mockCharacter} />);

    const button = screen.getByRole('button');
    await userEvent.click(button);

    expect(mockAction).toHaveBeenCalledTimes(1);
  });

  it('applies active styling when isActive is true', () => {
    render(<CharacterCard {...mockCharacter} isActive={true} />);

    const button = screen.getByRole('button');
    expect(button).toHaveClass('bg-zinc-800');
  });

  it('applies inactive styling when isActive is false', () => {
    render(<CharacterCard {...mockCharacter} isActive={false} />);

    const button = screen.getByRole('button');
    expect(button).toHaveClass('bg-zinc-600');
  });
});
