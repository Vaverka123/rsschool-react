import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Search from './Search';

vi.mock('../button/Button', () => ({
  default: ({
    onClick,
    children,
  }: {
    onClick: () => void;
    children: React.ReactNode;
  }) => <button onClick={onClick}>{children}</button>,
}));

const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value;
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

describe('Search Component', () => {
  const onSearchMock = vi.fn();

  beforeEach(() => {
    localStorage.clear();
    onSearchMock.mockClear();
  });

  it('renders input and search button', () => {
    render(<Search onSearch={onSearchMock} />);
    expect(screen.getByPlaceholderText(/enter name/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
  });

  it('displays saved search term from localStorage on mount', () => {
    localStorage.setItem('searchQuery', 'saved term');
    render(<Search onSearch={onSearchMock} />);
    const input = screen.getByPlaceholderText(
      /enter name/i
    ) as HTMLInputElement;
    expect(input.value).toBe('saved term');
  });

  it('shows empty input when no saved term exists', () => {
    render(<Search onSearch={onSearchMock} />);
    const input = screen.getByPlaceholderText(
      /enter name/i
    ) as HTMLInputElement;
    expect(input.value).toBe('');
  });

  it('updates input value when user types', () => {
    render(<Search onSearch={onSearchMock} />);
    const input = screen.getByPlaceholderText(
      /enter name/i
    ) as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'hello' } });
    expect(input.value).toBe('hello');
  });

  it('saves search term to localStorage and calls onSearch on button click', () => {
    render(<Search onSearch={onSearchMock} />);
    const input = screen.getByPlaceholderText(/enter name/i);
    fireEvent.change(input, { target: { value: 'test' } });
    fireEvent.click(screen.getByRole('button', { name: /search/i }));

    expect(localStorage.getItem('searchQuery')).toBe('test');
    expect(onSearchMock).toHaveBeenCalledWith('test');
  });

  it('trims whitespace before saving and searching', () => {
    render(<Search onSearch={onSearchMock} />);
    const input = screen.getByPlaceholderText(/enter name/i);
    fireEvent.change(input, { target: { value: '   spaced  ' } });
    fireEvent.click(screen.getByRole('button', { name: /search/i }));

    expect(localStorage.getItem('searchQuery')).toBe('spaced');
    expect(onSearchMock).toHaveBeenCalledWith('spaced');
  });

  it('retrieves search term from localStorage on mount', () => {
    localStorage.setItem('searchQuery', 'persisted');
    render(<Search onSearch={onSearchMock} />);
    expect(screen.getByDisplayValue('persisted')).toBeInTheDocument();
  });

  it('overwrites existing localStorage value when new search is performed', () => {
    localStorage.setItem('searchQuery', 'old value');
    render(<Search onSearch={onSearchMock} />);
    const input = screen.getByPlaceholderText(/enter name/i);
    fireEvent.change(input, { target: { value: 'new value' } });
    fireEvent.click(screen.getByRole('button', { name: /search/i }));
    expect(localStorage.getItem('searchQuery')).toBe('new value');
  });
});
