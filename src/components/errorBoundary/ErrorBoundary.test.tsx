import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import ErrorBoundary from './ErrorBoundary';

vi.mock('../fallback/Fallback', () => ({
  default: ({ text }: { text: string }) => (
    <div data-testid="fallback">{text}</div>
  ),
}));

const ProblemChild = () => {
  throw new Error('Test error');
};

const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

describe('ErrorBoundary', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders children when no error occurs', () => {
    render(
      <ErrorBoundary>
        <div data-testid="child">Normal content</div>
      </ErrorBoundary>
    );

    expect(screen.getByTestId('child')).toHaveTextContent('Normal content');
    expect(screen.queryByTestId('fallback')).not.toBeInTheDocument();
    expect(consoleErrorSpy).not.toHaveBeenCalled();
  });

  it('renders fallback when an error occurs', () => {
    render(
      <ErrorBoundary>
        <ProblemChild />
      </ErrorBoundary>
    );

    expect(screen.getByTestId('fallback')).toHaveTextContent(
      'refresh the page now!'
    );
    expect(screen.queryByTestId('child')).not.toBeInTheDocument();
    expect(consoleErrorSpy).toHaveBeenCalled();
  });

  it('calls componentDidCatch with error and info', () => {
    const error = new Error('Test error');

    const componentDidCatchSpy = vi.spyOn(
      ErrorBoundary.prototype,
      'componentDidCatch'
    );

    render(
      <ErrorBoundary>
        <ProblemChild />
      </ErrorBoundary>
    );

    expect(componentDidCatchSpy).toHaveBeenCalledWith(
      error,
      expect.objectContaining({
        componentStack: expect.any(String),
      })
    );
    expect(screen.getByTestId('fallback')).toBeInTheDocument();
  });

  it('updates state via getDerivedStateFromError when error occurs', () => {
    const getDerivedStateFromErrorSpy = vi.spyOn(
      ErrorBoundary,
      'getDerivedStateFromError'
    );

    render(
      <ErrorBoundary>
        <ProblemChild />
      </ErrorBoundary>
    );

    expect(getDerivedStateFromErrorSpy).toHaveBeenCalled();
    expect(getDerivedStateFromErrorSpy).toHaveReturnedWith({ hasError: true });
    expect(screen.getByTestId('fallback')).toBeInTheDocument();
  });
});
