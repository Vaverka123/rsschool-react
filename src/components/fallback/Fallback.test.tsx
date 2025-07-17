import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Fallback from './Fallback';

describe('Fallback Component', () => {
  it('renders without crashing', () => {
    render(<Fallback text="Test error message" />);
    expect(screen.getByText('Oops! Something went wrong')).toBeInTheDocument();
  });

  it('displays the provided text prop', () => {
    const testMessage = 'Custom error message';
    render(<Fallback text={testMessage} />);
    expect(screen.getByText(testMessage)).toBeInTheDocument();
  });

  it('has correct CSS classes on container elements', () => {
    render(<Fallback text="Test error message" />);

    const innerDiv = screen
      .getByText('Oops! Something went wrong')
      .closest('div');
    const outerDiv = innerDiv?.parentElement;

    expect(outerDiv).toHaveClass(
      'w-full',
      'h-screen',
      'flex',
      'items-center',
      'justify-center',
      'bg-gray-900'
    );

    expect(innerDiv).toHaveClass(
      'flex',
      'flex-col',
      'items-center',
      'justify-center',
      'p-8',
      'text-center',
      'text-white',
      'bg-gray-800',
      'rounded',
      'shadow-md'
    );
  });

  it('renders heading and paragraph with correct content', () => {
    const testMessage = 'Custom error message';
    render(<Fallback text={testMessage} />);

    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading).toHaveTextContent('Oops! Something went wrong');
    expect(heading).toHaveClass('text-2xl', 'font-bold', 'mb-2');

    const paragraph = screen.getByText(testMessage);
    expect(paragraph).toHaveClass('text-lg');
  });
});
