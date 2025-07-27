import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach, type Mock } from 'vitest';
import DetailsCard from './DetailsCard';
import type { CharacterByIDResponse } from '../../types/types';

vi.mock('../loadingBar/LoadingBar', () => ({
  default: () => <div data-testid="loading-bar">Loading...</div>,
}));

vi.mock('../../graphql/queries/characters', () => ({
  GET_CHARACTER_BY_ID: 'mock-query',
}));

vi.mock('graphql-request', () => {
  const mockRequest = vi.fn();
  return {
    request: mockRequest,
  };
});

const { request: mockRequest } = await import('graphql-request');

describe('DetailsCard Component', () => {
  const mockCancel = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('shows loading bar initially', () => {
    (mockRequest as Mock).mockImplementation(() => new Promise(() => {}));

    render(<DetailsCard id="1" cancel={mockCancel} />);

    expect(screen.getByTestId('loading-bar')).toBeInTheDocument();
  });

  it('renders character details when data is loaded', async () => {
    const mockData: CharacterByIDResponse = {
      character: {
        id: '1',
        name: 'Rick Sanchez',
        status: 'Alive',
        species: 'Human',
        type: 'Scientist',
        gender: 'Male',
        image: 'rick.jpg',
        location: { name: 'Earth' },
        origin: { name: 'Earth C-137' },
        created: '2017-11-04',
      },
    };

    (mockRequest as Mock).mockResolvedValue(mockData);

    render(<DetailsCard id="1" cancel={mockCancel} />);

    await waitFor(() => {
      expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    });

    expect(screen.getByText('#1')).toBeInTheDocument();
    expect(screen.getByText('Alive - Human')).toBeInTheDocument();
    expect(screen.getByText('Scientist')).toBeInTheDocument();
  });

  it('calls cancel function when close button is clicked', async () => {
    const mockData: CharacterByIDResponse = {
      character: {
        id: '1',
        name: 'Rick Sanchez',
        status: 'Alive',
        species: 'Human',
        type: 'Scientist',
        gender: 'Male',
        image: 'rick.jpg',
        location: { name: 'Earth' },
        origin: { name: 'Earth C-137' },
        created: '2017-11-04',
      },
    };

    (mockRequest as Mock).mockResolvedValue(mockData);

    render(<DetailsCard id="1" cancel={mockCancel} />);

    await waitFor(() => {
      expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    });

    const closeButton = screen.getByText('X close details view X');
    await userEvent.click(closeButton);

    expect(mockCancel).toHaveBeenCalledTimes(1);
  });

  it('does not make API call when no ID is provided', () => {
    render(<DetailsCard id="" cancel={mockCancel} />);

    expect(mockRequest).not.toHaveBeenCalled();
    expect(screen.getByTestId('loading-bar')).toBeInTheDocument();
  });

  it('handles API errors without crashing', async () => {
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

    (mockRequest as Mock).mockRejectedValue(new Error('Network error'));

    render(<DetailsCard id="1" cancel={mockCancel} />);

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith(
        'Error fetching character by ID:',
        expect.any(Error)
      );
    });

    expect(screen.getByTestId('loading-bar')).toBeInTheDocument();

    consoleSpy.mockRestore();
  });
});
