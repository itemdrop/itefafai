'use client';

import { useEffect, useRef } from 'react';
import { useSearch } from '../../hooks/useSearch';
import SearchResults from './SearchResults';

interface SearchBarProps {
  className?: string;
}

const SearchBar = ({ className = '' }: SearchBarProps) => {
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  const { 
    query, 
    setQuery, 
    results, 
    isSearching, 
    hasResults, 
    clearSearch, 
    isOpen, 
    setIsOpen 
  } = useSearch({ debounceMs: 300, maxResults: 8, minQueryLength: 1 });

  // Close search on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [setIsOpen]);

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        clearSearch();
        inputRef.current?.blur();
      }
      
      // Focus search with Cmd/Ctrl + K
      if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
        event.preventDefault();
        inputRef.current?.focus();
        setIsOpen(true);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [clearSearch, setIsOpen]);

  const handleInputChange = (e: any) => {
    const value = e.target.value;
    setQuery(value);
  };

  const handleInputFocus = () => {
    if (query.trim()) {
      setIsOpen(true);
    }
  };

  const handleResultClick = () => {
    clearSearch();
  };

  const handleClearClick = () => {
    clearSearch();
    inputRef.current?.focus();
  };

  return (
    <div ref={searchRef} className={`relative ${className}`}>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        
        <input
          ref={inputRef}
          type="text"
          placeholder="Search..."
          value={query}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          className="w-full pl-10 pr-10 py-2 text-sm text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/90 backdrop-blur-sm placeholder-gray-500 transition-all duration-200"
        />
        
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
          {query ? (
            <button
              onClick={handleClearClick}
              className="text-gray-400 hover:text-gray-600 transition-colors duration-150"
              aria-label="Clear search"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          ) : (
            <div className="hidden sm:flex items-center space-x-1 text-xs text-gray-400 bg-gray-100 rounded px-1.5 py-0.5">
              <span>⌘</span>
              <span>K</span>
            </div>
          )}
        </div>
      </div>
      
      <SearchResults
        results={results}
        isOpen={isOpen}
        isSearching={isSearching}
        query={query}
        onClose={() => setIsOpen(false)}
        onResultClick={handleResultClick}
      />
    </div>
  );
};

export default SearchBar;