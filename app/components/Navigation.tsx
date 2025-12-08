'use client';

import Link from 'next/link';
import Image from 'next/image';
import { siteConfig } from '../../lib/siteConfig';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import SearchBar from './SearchBar';

const Navigation = () => {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'Blog', href: '/blog' },
    { name: 'Team', href: '/team' },
    { name: 'Contact', href: '/contact' },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link href="/" onClick={closeMobileMenu} className="flex items-center group relative" aria-label={siteConfig.name}>
              <Image
                src={siteConfig.logoPath || '/next.svg'}
                alt={`${siteConfig.name} logo`}
                width={56}
                height={56}
                className="h-14 w-14 rounded-xl object-cover border border-gray-300 shadow-sm group-hover:border-blue-400 group-hover:shadow-md transition-all duration-200"
                priority
                onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                  const target = e.target as HTMLImageElement;
                  if (!target.src.endsWith('/next.svg')) {
                    target.src = '/next.svg';
                  }
                }}
              />
              {/* Hover-only brand text tooltip - slides out from icon */}
              <span className="absolute left-full top-1/2 -translate-y-1/2 ml-0 px-3 py-1 rounded-lg bg-blue-600 text-white text-sm font-semibold whitespace-nowrap opacity-0 scale-x-0 origin-left group-hover:opacity-100 group-hover:scale-x-100 group-hover:ml-3 transition-all duration-300 ease-out pointer-events-none shadow-lg">
                {siteConfig.name}
              </span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            {/* Search Bar */}
            <SearchBar className="w-64 lg:w-80" />
            
            {/* Navigation Links */}
            <div className="flex items-baseline space-x-6 lg:space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ease-in-out transform hover:scale-105 ${
                    pathname === item.href
                      ? 'bg-blue-100 text-blue-700 shadow-sm'
                      : 'text-gray-700 hover:bg-gray-100 hover:text-blue-600 hover:shadow-sm'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button 
              onClick={toggleMobileMenu}
              className="text-gray-700 hover:text-blue-600 focus:outline-none focus:text-blue-600 p-2"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div className={`md:hidden transition-all duration-300 ease-in-out ${
        isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
      } overflow-hidden bg-white border-t border-gray-200 shadow-lg`}>
        <div className="px-3 pt-3 pb-4 space-y-2">
          {navItems.map((item, index) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={closeMobileMenu}
              className={`block px-4 py-4 rounded-lg text-base font-medium transition-all duration-200 ease-in-out min-h-[48px] flex items-center ${
                pathname === item.href
                  ? 'bg-blue-100 text-blue-700 shadow-sm'
                  : 'text-gray-700 hover:bg-gray-100 hover:text-blue-600 hover:shadow-sm active:bg-gray-200'
              }`}
              style={{ 
                animationDelay: `${index * 50}ms`,
                animation: isMobileMenuOpen ? 'slideInFromLeft 0.3s ease-out forwards' : 'none'
              }}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;