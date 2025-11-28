'use client';

import { useState, useEffect } from 'react';
import { searchContent, SearchResult } from '../lib/searchData';

interface UseSearchOptions {
  debounceMs?: number;
  maxResults?: number;
  minQueryLength?: number;
}

interface UseSearchReturn {
  query: string;
  setQuery: (query: string) => void;
  results: SearchResult[];
  isSearching: boolean;
  hasResults: boolean;
  clearSearch: () => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export function useSearch(options: UseSearchOptions = {}): UseSearchReturn {
  const {
    debounceMs = 300,
    maxResults = 10,
    minQueryLength = 1
  } = options;

  const [query, setQueryState] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);

  // Debounce the search query
  useEffect(() => {
    setIsSearching(true);
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
      setIsSearching(false);
    }, debounceMs);

    return () => clearTimeout(timer);
  }, [query, debounceMs]);

  // Perform the search when debounced query changes
  useEffect(() => {
    if (!debouncedQuery.trim() || debouncedQuery.length < minQueryLength) {
      setResults([]);
      return;
    }
    const searchResults = searchContent(debouncedQuery, maxResults);
    setResults(searchResults);
  }, [debouncedQuery, maxResults, minQueryLength]);

  const hasResults = results.length > 0;

  const clearSearch = () => {
    setQueryState('');
    setDebouncedQuery('');
    setResults([]);
    setIsOpen(false);
  };

  // Update the query and manage search state
  const setQuery = (newQuery: string) => {
    setQueryState(newQuery);
    if (newQuery.trim()) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  };

  return {
    query,
    setQuery,
    results,
    isSearching: isSearching && !!query.trim(),
    hasResults,
    clearSearch,
    isOpen,
    setIsOpen
  };
}