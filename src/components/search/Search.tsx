import { useRef, useEffect } from 'react';
import Button from '../button/Button';
import { useSearchQuery } from '../../hooks/useSearchQuery';

interface SearchProps {
  onSearch: (query: string) => void;
}

const Search = ({ onSearch }: SearchProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { value, setValue, saveQuery } = useSearchQuery();

  useEffect(() => {
    if (inputRef.current && value) {
      inputRef.current.value = value;
    }
  }, [value]);

  const handleSearch = () => {
    const query = inputRef.current?.value.trim() || '';
    saveQuery(query);
    setValue(query);
    onSearch(query);
  };

  const handleInputChange = () => {
    const query = inputRef.current?.value || '';
    setValue(query);
  };

  return (
    <div className="flex items-center space-x-9 max-w-md mx-auto">
      <input
        ref={inputRef}
        type="text"
        className="px-4 py-2 border rounded"
        placeholder="enter name"
        onChange={handleInputChange}
      />
      <Button onClick={handleSearch}>Search</Button>
    </div>
  );
};

export default Search;
