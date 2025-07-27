import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router';
import { describe, it, expect } from 'vitest';
import About from './About';

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('About Component', () => {
  it('renders about heading', () => {
    renderWithRouter(<About />);

    expect(screen.getByText('About the Author')).toBeInTheDocument();
  });

  it('renders author name', () => {
    renderWithRouter(<About />);

    expect(
      screen.getByText(/This app was created by Vera Maslava/)
    ).toBeInTheDocument();
  });

  it('renders home link with correct href', () => {
    renderWithRouter(<About />);

    const homeLink = screen.getByRole('link', {
      name: /go back to home page/i,
    });
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute('href', '/');
  });

  it('renders github link', () => {
    renderWithRouter(<About />);

    const githubLink = screen.getByLabelText(
      "Visit Vera Maslava's GitHub profile"
    );
    expect(githubLink).toBeInTheDocument();
    expect(githubLink).toHaveAttribute('href', 'https://github.com/Vaverka123');
  });

  it('renders linkedin link', () => {
    renderWithRouter(<About />);

    const linkedinLink = screen.getByLabelText(
      "Visit Vera Maslava's LinkedIn profile"
    );
    expect(linkedinLink).toBeInTheDocument();
    expect(linkedinLink).toHaveAttribute(
      'href',
      'https://www.linkedin.com/in/vera-maslava-589765124/'
    );
  });

  it('renders rsschool course link', () => {
    renderWithRouter(<About />);

    const courseLink = screen.getByText(
      'learn more about RSSchool React Course'
    );
    expect(courseLink).toBeInTheDocument();
    expect(courseLink).toHaveAttribute(
      'href',
      'https://rs.school/courses/reactjs'
    );
  });

  it('renders social media icons', () => {
    renderWithRouter(<About />);

    expect(screen.getByAltText('github logo')).toBeInTheDocument();
    expect(
      screen.getByAltText("link to author's LinkedIn profile")
    ).toBeInTheDocument();
  });
});
