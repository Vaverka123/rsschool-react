import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, afterEach, type Mock } from 'vitest';
import Main from './Main';
import { GraphQLError } from 'graphql';

// Mock data matching MainProps type (adjust fields to your actual MainProps)
const mockData = {
  loading: false,
  error: undefined,
  characters: undefined,
};

// Mock fetch or graphql-request if needed
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
    render(<Main data={mockData} />); // Pass required props here
    expect(
      screen.getByText(/Search for your favorite Rick and Morty characters/i)
    ).toBeInTheDocument();
  });

  it('handles GraphQL ClientError correctly', async () => {
    // Simulate throwing a GraphQLError with full properties
    const error = new GraphQLError('Bad Request');

    // Mock request to throw error
    const { request } = await import('graphql-request');
    (request as Mock).mockRejectedValueOnce({
      response: {
        errors: [error],
        status: 400,
      },
    });

    render(<Main data={mockData} />);

    // Trigger your fetch or error handling (e.g., via some button or method)
    // For example:
    // fireEvent.click(screen.getByText(/see 400 response/i));

    // Wait for fallback/error message to appear
    // await waitFor(() => expect(screen.getByText(/Bad Request/i)).toBeInTheDocument());
  });

  // Add more tests here as needed
});
