import { useState, useEffect } from "react";

interface UseDebounceSearchOptions {
  delay?: number;
}

export function useDebounceSearch<T extends { search: string }>(
  filters: T,
  setFilters: (updates: Partial<T>) => void,
  options: UseDebounceSearchOptions = {}
) {
  const { delay = 500 } = options;
  const [localSearch, setLocalSearch] = useState(filters.search);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (localSearch !== filters.search) {
        setFilters({ search: localSearch } as Partial<T>);
      }
    }, delay);

    return () => clearTimeout(timeoutId);
  }, [localSearch, setFilters, filters.search, delay]);

  useEffect(() => {
    setLocalSearch(filters.search);
  }, [filters.search]);

  return {
    searchValue: localSearch,
    setSearchValue: setLocalSearch,
  };
}