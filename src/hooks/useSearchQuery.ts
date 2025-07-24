import { useEffect, useState } from 'react';

interface UseSearchQueryOptions {
  key?: string;
}

export const useSearchQuery = (options: UseSearchQueryOptions = {}) => {
  const { key = 'searchQuery' } = options;
  const [value, setValue] = useState('');

  useEffect(() => {
    const savedQuery = localStorage.getItem(key);
    if (savedQuery) {
      setValue(savedQuery);
    }
  }, [key]);

  const saveQuery = (query: string) => {
    localStorage.setItem(key, query);
  };

  const getSavedQuery = (): string => {
    return localStorage.getItem(key) || '';
  };

  const clearSavedQuery = () => {
    localStorage.removeItem(key);
    setValue('');
  };

  return {
    saveQuery,
    getSavedQuery,
    clearSavedQuery,
    value,
    setValue,
  };
};
