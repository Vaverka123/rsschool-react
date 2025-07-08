import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import App from './App';

vi.mock('./components/main/Main', () => ({
  default: ({
    data,
  }: {
    data: { loading: boolean; characters: { results: unknown[] } };
  }) => (
    <div data-testid="main-component">
      Main Component: {data.loading ? 'Loading' : 'Loaded'},{' '}
      {data.characters.results.length} items
    </div>
  ),
}));

vi.mock('./components/errorBoundary/ErrorBoundary', () => ({
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="error-boundary">{children}</div>
  ),
}));

describe('App Component', () => {
  it('renders without crashing', () => {
    render(<App />);
    expect(
      screen.getByText(/Main Component: Loaded, 0 items/i)
    ).toBeInTheDocument();
    expect(screen.getByTestId('error-boundary')).toBeInTheDocument();
  });

  it('passes correct props to Main component', () => {
    render(<App />);
    const mainComponent = screen.getByTestId('main-component');
    expect(mainComponent).toHaveTextContent('Main Component: Loaded, 0 items');
  });

  it('is wrapped in ErrorBoundary', () => {
    render(<App />);
    const errorBoundary = screen.getByTestId('error-boundary');
    expect(errorBoundary).toBeInTheDocument();
    expect(errorBoundary).toContainElement(
      screen.getByTestId('main-component')
    );
  });
});
