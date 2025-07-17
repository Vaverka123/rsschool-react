import { render, screen, waitFor, act } from '@testing-library/react';
import { describe, it, expect, vi, afterEach, type Mock } from 'vitest';
import Main from './Main';
import { GraphQLError } from 'graphql';
import type { CharacterData } from '../../types/types';

const mockData = {
  loading: false,
  error: undefined,
  characters: undefined,
};

vi.mock('graphql-request', () => ({
  request: vi.fn(),
  ClientError: class ClientError extends Error {
    response: { errors?: GraphQLError[]; status: number } = {
      errors: [],
      status: 400,
    };
  },
}));

afterEach(() => {
  vi.clearAllMocks();
});

describe('Main Component', () => {
  it('renders without crashing', async () => {
    await act(async () => {
      render(<Main data={mockData} />);
    });
    expect(
      screen.getByText(/Search for your favorite Rick and Morty characters/i)
    ).toBeInTheDocument();
  });

  it('handles GraphQL ClientError correctly', async () => {
    const error = new GraphQLError('Bad Request');

    const { request } = await import('graphql-request');
    (request as Mock).mockRejectedValueOnce({
      response: {
        errors: [error],
        status: 400,
      },
    });

    await act(async () => {
      render(<Main data={mockData} />);
    });
  });
});

vi.mock('../search/Search', () => ({
  default: (props: { onSearch: (query: string) => void }) => (
    <button onClick={() => props.onSearch('Rick')}>Mock Search</button>
  ),
}));
vi.mock('../button/Button', () => ({
  default: (props: { onClick: () => void; children: React.ReactNode }) => (
    <button onClick={props.onClick}>{props.children}</button>
  ),
}));
vi.mock('../cardList/CardList', () => ({
  default: (props: { items: CharacterData[] }) => (
    <div>
      CardList:{' '}
      {props.items && props.items.length > 0
        ? props.items.map((item) => (
            <span key={item.id} data-testid="character-name">
              {item.name}
            </span>
          ))
        : 'No items'}
    </div>
  ),
}));
vi.mock('../loadingBar/LoadingBar', () => ({
  default: () => <div>Loading...</div>,
}));
vi.mock('../fallback/Fallback', () => ({
  default: (props: { text: string }) => <div>{props.text}</div>,
}));

const mockCharacters = [
  { id: '1', name: 'Rick Sanchez' },
  { id: '2', name: 'Morty Smith' },
];

vi.mock('graphql-request', () => ({
  request: vi.fn(),
  ClientError: class extends Error {},
}));

afterEach(() => {
  vi.clearAllMocks();
  localStorage.clear();
});

describe('Main Component', () => {
  it('renders character list on successful API response', async () => {
    const { request } = await import('graphql-request');
    (request as Mock).mockResolvedValueOnce({
      characters: {
        results: mockCharacters,
      },
    });

    localStorage.setItem('searchQuery', 'Rick');

    await act(async () => {
      render(<Main data={{ loading: false, characters: undefined }} />);
    });

    await waitFor(() => {
      expect(screen.getByText(/CardList/)).toBeInTheDocument();
      expect(screen.getAllByTestId('character-name').length).toBe(2);
      expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
      expect(screen.getByText('Morty Smith')).toBeInTheDocument();
    });
  });
});
