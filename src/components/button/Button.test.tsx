import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Button from './Button';

describe('Button Component', () => {
  it('renders without crashing', () => {
    render(<Button>Click Me</Button>);
    expect(
      screen.getByRole('button', { name: /click me/i })
    ).toBeInTheDocument();
  });

  it('displays the provided children', () => {
    const buttonText = 'Submit';
    render(<Button>{buttonText}</Button>);
    expect(screen.getByRole('button', { name: /submit/i })).toHaveTextContent(
      buttonText
    );
  });

  it('applies the correct CSS classes', () => {
    render(<Button>Click Me</Button>);
    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toHaveClass(
      'h-fit',
      'bg-blue-600',
      'hover:bg-blue-700',
      'text-white',
      'font-semibold',
      'tracking-widest',
      'uppercase',
      'py-2',
      'px-8',
      'rounded',
      'shadow-md',
      'transition',
      'cursor-pointer'
    );
  });

  it('calls onClick handler when clicked', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click Me</Button>);
    const button = screen.getByRole('button', { name: /click me/i });
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('is disabled when disabled prop is passed', () => {
    render(<Button disabled>Click Me</Button>);
    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toBeDisabled();
  });
});
