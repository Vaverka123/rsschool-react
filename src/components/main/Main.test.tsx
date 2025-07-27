import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach, type Mock } from 'vitest';
import { BrowserRouter } from 'react-router';
import Main from './Main';
import type { CharactersResponse, CharacterData } from '../../types/types';

vi.mock('../search/Search', () => ({
  default: (props: { onSearch: (query: string) => void }) => (
    <div data-testid="search-component">
      <button onClick={() => props.onSearch('test')}>Search</button>
    </div>
  ),
}));

vi.mock('../cardList/CardList', () => ({
  default: (props: {
    items: CharacterData[];
    setDetailsId: (id: string | null) => void;
    detailsId: string | null;
  }) => (
    <div data-testid="card-list">
      {props.items.length > 0 ? (
        props.items.map((item) => (
          <div key={item.id} data-testid="character-card">
            {item.name}
          </div>
        ))
      ) : (
        <div data-testid="no-characters">No characters</div>
      )}
    </div>
  ),
}));

vi.mock('../loadingBar/LoadingBar', () => ({
  default: () => <div data-testid="loading-bar">Loading...</div>,
}));

vi.mock('../fallback/Fallback', () => ({
  default: (props: { text: string }) => (
    <div data-testid="fallback">{props.text}</div>
  ),
}));

vi.mock('../detailsCard/DetailsCard', () => ({
  default: (props: { id: string; cancel: () => void }) => (
    <div data-testid="details-card">
      Details for {props.id}
      <button onClick={props.cancel}>Close</button>
    </div>
  ),
}));

vi.mock('../../graphql/queries/characters', () => ({
  GET_CHARACTERS: 'mock-query',
}));

vi.mock('graphql-request', () => {
  const mockRequest = vi.fn();
  return { request: mockRequest };
});

const { request: mockRequest } = await import('graphql-request');

const mockLocalStorage = {
  getItem: vi.fn().mockReturnValue(''),
  setItem: vi.fn(),
};
Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage,
});

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('Main Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders main heading', async () => {
    (mockRequest as Mock).mockResolvedValue({
      characters: {
        results: [],
        info: { count: 0, pages: 0, next: null, prev: null },
      },
    });

    renderWithRouter(<Main data={{ loading: false }} />);

    expect(
      screen.getByText(/Search for your favorite Rick and Morty characters/)
    ).toBeInTheDocument();
  });

  it('renders search component', async () => {
    (mockRequest as Mock).mockResolvedValue({
      characters: {
        results: [],
        info: { count: 0, pages: 0, next: null, prev: null },
      },
    });

    renderWithRouter(<Main data={{ loading: false }} />);

    expect(screen.getByTestId('search-component')).toBeInTheDocument();
  });

  it('shows loading bar during API call', async () => {
    (mockRequest as Mock).mockImplementation(() => new Promise(() => {}));

    renderWithRouter(<Main data={{ loading: false }} />);

    expect(screen.getByTestId('loading-bar')).toBeInTheDocument();
  });

  it('renders about link', async () => {
    (mockRequest as Mock).mockResolvedValue({
      characters: {
        results: [],
        info: { count: 0, pages: 0, next: null, prev: null },
      },
    });

    renderWithRouter(<Main data={{ loading: false }} />);

    const aboutLink = screen.getByRole('link', {
      name: /about this app author/i,
    });
    expect(aboutLink).toBeInTheDocument();
    expect(aboutLink).toHaveAttribute('href', '/about');
  });

  it('displays characters when API returns data', async () => {
    const mockData: CharactersResponse = {
      characters: {
        results: [
          {
            id: '1',
            name: 'Rick Sanchez',
            status: 'Alive',
            species: 'Human',
            image: 'rick.jpg',
            location: { name: 'Earth' },
            origin: { name: 'Earth' },
            action: () => {},
          },
        ],
        info: { count: 1, pages: 1, next: null, prev: null },
      },
    };

    (mockRequest as Mock).mockResolvedValue(mockData);

    renderWithRouter(<Main data={{ loading: false }} />);

    await waitFor(() => {
      expect(screen.getByTestId('card-list')).toBeInTheDocument();
      expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    });
  });

  it('handles search correctly', async () => {
    (mockRequest as Mock).mockResolvedValue({
      characters: {
        results: [],
        info: { count: 0, pages: 0, next: null, prev: null },
      },
    });

    renderWithRouter(<Main data={{ loading: false }} />);

    const searchButton = screen.getByText('Search');
    await userEvent.click(searchButton);

    expect(mockRequest).toHaveBeenCalledWith(
      'https://rickandmortyapi.com/graphql/',
      'mock-query',
      { name: 'test', page: 1 }
    );
  });

  it('shows pagination controls', async () => {
    (mockRequest as Mock).mockResolvedValue({
      characters: {
        results: [],
        info: { count: 0, pages: 2, next: 'next-url', prev: null },
      },
    });

    renderWithRouter(<Main data={{ loading: false }} />);

    await waitFor(() => {
      expect(screen.getByText('Page 1 of 2')).toBeInTheDocument();
    });
  });
});
