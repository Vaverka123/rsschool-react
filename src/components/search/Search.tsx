import { useEffect, useRef } from 'react';
import Button from '../button/Button';

interface SearchProps {
  onSearch: (query: string) => void;
}

const Search = ({ onSearch }: SearchProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const savedQuery = localStorage.getItem('searchQuery');
    if (savedQuery && inputRef.current) {
      inputRef.current.value = savedQuery;
    }
  }, []);

  const handleSearch = () => {
    const query = inputRef.current?.value.trim() || '';
    localStorage.setItem('searchQuery', query);
    onSearch(query);
  };

  return (
    <div className="flex items-center space-x-9 max-w-md mx-auto">
      <input
        ref={inputRef}
        type="text"
        className="px-4 py-2 border rounded"
        placeholder="enter name"
      />
      <Button onClick={handleSearch}>Search</Button>
    </div>
  );
};

export default Search;
