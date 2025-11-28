'use client';

import Link from 'next/link';
import { SearchResult } from '../../lib/searchData';

interface SearchResultsProps {
  results: SearchResult[];
  isOpen: boolean;
  isSearching: boolean;
  query: string;
  onClose: () => void;
  onResultClick: () => void;
}

const SearchResults = ({ results, isOpen, isSearching, query, onClose, onResultClick }: SearchResultsProps) => {
  if (!isOpen) return null;

  const getTypeColor = (type: SearchResult['type']) => {
    switch (type) {
      case 'blog':
        return 'bg-blue-100 text-blue-700';
      case 'service':
        return 'bg-green-100 text-green-700';
      case 'page':
        return 'bg-purple-100 text-purple-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getTypeIcon = (type: SearchResult['type']) => {
    switch (type) {
      case 'blog':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
          </svg>
        );
      case 'service':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'page':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-xl max-h-96 overflow-y-auto z-50">
      {isSearching ? (
        <div className="p-4 text-center text-gray-500">
          <div className="inline-flex items-center space-x-2">
            <svg className="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            <span>Searching...</span>
          </div>
        </div>
      ) : results.length > 0 ? (
        <>
          <div className="p-3 border-b border-gray-100 bg-gray-50">
            <div className="text-sm text-gray-600">
              Found {results.length} result{results.length === 1 ? '' : 's'} for "{query}"
            </div>
          </div>
          <div className="max-h-80 overflow-y-auto">
            {results.map((result, index) => (
              <Link
                key={result.id}
                href={result.url}
                onClick={onResultClick}
                className="block p-4 hover:bg-gray-50 transition-colors duration-150 border-b border-gray-100 last:border-b-0"
              >
                <div className="flex items-start space-x-3">
                  <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(result.type)}`}>
                    {getTypeIcon(result.type)}
                    <span className="capitalize">{result.type}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold text-gray-900 line-clamp-1 mb-1">
                      {result.title}
                    </h4>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {result.excerpt}
                    </p>
                    {(result.category || result.author) && (
                      <div className="mt-2 flex items-center space-x-2 text-xs text-gray-500">
                        {result.category && (
                          <span className="inline-flex items-center">
                            <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                            </svg>
                            {result.category}
                          </span>
                        )}
                        {result.author && (
                          <span className="inline-flex items-center">
                            <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            {result.author}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                  <div className="flex-shrink-0">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="p-3 border-t border-gray-100 bg-gray-50 text-center">
            <button 
              onClick={onClose}
              className="text-sm text-gray-600 hover:text-gray-800 transition-colors duration-150"
            >
              Press Escape to close
            </button>
          </div>
        </>
      ) : query.trim() ? (
        <div className="p-8 text-center text-gray-500">
          <svg className="w-12 h-12 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12l6 6m-6-6l6-6" />
          </svg>
          <p className="font-medium mb-1">No results found</p>
          <p className="text-sm">Try searching for something else</p>
        </div>
      ) : null}
    </div>
  );
};

export default SearchResults;