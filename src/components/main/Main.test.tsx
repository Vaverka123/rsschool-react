import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, afterEach, type Mock } from 'vitest';
import Main from './Main';
import { GraphQLError } from 'graphql';

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
  it('renders without crashing', () => {
    render(<Main data={mockData} />);
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

    render(<Main data={mockData} />);
  });
});
