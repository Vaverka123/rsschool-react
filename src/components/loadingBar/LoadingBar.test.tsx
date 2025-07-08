import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import LoadingBar from './LoadingBar';

describe('LoadingBar Component', () => {
  it('renders loading text and bar', () => {
    render(<LoadingBar />);
    expect(screen.getByText(/Loading\.\.\./i)).toBeInTheDocument();
    expect(screen.getByRole('status')).toHaveAttribute('aria-busy', 'true');
  });

  it('has accessible ARIA attributes', () => {
    render(<LoadingBar />);
    const status = screen.getByRole('status');
    expect(status).toBeInTheDocument();
    expect(status).toHaveAttribute('aria-busy', 'true');
  });

  it('can be conditionally shown or hidden via parent', () => {
    const Parent = ({ isLoading }: { isLoading: boolean }) => (
      <div>{isLoading && <LoadingBar />}</div>
    );

    const { rerender } = render(<Parent isLoading={true} />);
    expect(screen.getByText(/Loading\.\.\./i)).toBeInTheDocument();

    rerender(<Parent isLoading={false} />);
    expect(screen.queryByText(/Loading\.\.\./i)).not.toBeInTheDocument();
  });
});
