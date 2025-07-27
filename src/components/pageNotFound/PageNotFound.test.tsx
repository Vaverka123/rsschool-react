import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router';
import { describe, it, expect } from 'vitest';
import PageNotFound from './PageNotFound';

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('PageNotFound Component', () => {
  it('renders 404 heading', () => {
    renderWithRouter(<PageNotFound />);

    expect(screen.getByText('404 - Page Not Found')).toBeInTheDocument();
  });

  it('renders error message', () => {
    renderWithRouter(<PageNotFound />);

    expect(
      screen.getByText('Sorry, the page you are looking for does not exist.')
    ).toBeInTheDocument();
  });

  it('renders home link with correct href', () => {
    renderWithRouter(<PageNotFound />);

    const homeLink = screen.getByRole('link', {
      name: /go back to home page/i,
    });
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute('href', '/');
  });

  it('renders home icon image', () => {
    renderWithRouter(<PageNotFound />);

    const homeIcon = screen.getByAltText('home icon');
    expect(homeIcon).toBeInTheDocument();
  });

  it('has correct container styling', () => {
    renderWithRouter(<PageNotFound />);

    const container = screen.getByText('404 - Page Not Found').closest('div');
    expect(container).toHaveClass(
      'm-20',
      'p-6',
      'border-2',
      'border-gray-300',
      'rounded-lg'
    );
  });
});
