'use client';

import Link from 'next/link';
import Image from 'next/image';
import { siteConfig } from '../../lib/siteConfig';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import SearchBar from './SearchBar';
import { useAuth } from '../contexts/AuthContext';
import UserDropdown from './UserDropdown';
import AuthModal from './AuthModal';

const Navigation = () => {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const { user, isLoading } = useAuth();
  
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

  const openAuthModal = (mode: 'login' | 'signup') => {
    setAuthMode(mode);
    setAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setAuthModalOpen(false);
  };

  const switchAuthMode = () => {
    setAuthMode(authMode === 'login' ? 'signup' : 'login');
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
          <div className="hidden md:flex md:items-center md:space-x-2">
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

            {/* Auth Section */}
            <div className="flex items-center ml-3">   
              {!isLoading && (
                user ? (
                  <UserDropdown />
                ) : (
                  <div className="relative group">
                    {/* Avatar Icon */}
                    <div className="w-10 h-10 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center cursor-pointer hover:from-blue-50 hover:to-blue-100 transition-all duration-200 border-2 border-gray-300 hover:border-blue-400 shadow-sm hover:shadow-md relative">
                      <svg className="w-6 h-6 text-gray-600 group-hover:text-blue-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      {/* Small indicator dot */}
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full border-2 border-white opacity-75 group-hover:opacity-100 transition-opacity"></div>
                    </div>
                    
                    {/* Hover Dropdown */}
                    <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 transform translate-y-2 group-hover:translate-y-0">
                      <div className="py-2">
                        <div className="px-4 py-2 border-b border-gray-100">
                          <p className="text-xs text-gray-500 font-medium">Get Started</p>
                        </div>
                        <button
                          onClick={() => openAuthModal('login')}
                          className="flex items-center w-full px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 transition-colors group/item"
                        >
                          <svg className="w-4 h-4 mr-3 text-gray-400 group-hover/item:text-blue-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                          </svg>
                          <div>
                            <div className="font-medium">Sign In</div>
                            <div className="text-xs text-gray-500">Access your account</div>
                          </div>
                        </button>
                        <button
                          onClick={() => openAuthModal('signup')}
                          className="flex items-center w-full px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors group/item"
                        >
                          <svg className="w-4 h-4 mr-3 text-gray-400 group-hover/item:text-blue-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                          </svg>
                          <div>
                            <div className="font-medium">Sign Up</div>
                            <div className="text-xs text-gray-500">Create new account</div>
                          </div>
                        </button>
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>

          {/* Mobile menu button and auth */}
          <div className="md:hidden flex items-center space-x-3">
            {/* Mobile Auth Avatar - when not logged in */}
            {!isLoading && !user && (
              <div className="relative group">
                <div className="w-8 h-8 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center cursor-pointer hover:from-blue-50 hover:to-blue-100 transition-all duration-200 border-2 border-gray-300 hover:border-blue-400 shadow-sm">
                  <svg className="w-5 h-5 text-gray-600 group-hover:text-blue-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                
                {/* Mobile hover dropdown */}
                <div className="absolute right-0 top-full mt-1 w-44 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 transform translate-y-2 group-hover:translate-y-0">
                  <div className="py-1">
                    <div className="px-3 py-2 border-b border-gray-100">
                      <p className="text-xs text-gray-500 font-medium">Get Started</p>
                    </div>
                    <button
                      onClick={() => openAuthModal('login')}
                      className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      Sign In
                    </button>
                    <button
                      onClick={() => openAuthModal('signup')}
                      className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                    >
                      <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                      </svg>
                      Sign Up
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Mobile User Dropdown when logged in */}
            {!isLoading && user && (
              <div className="md:hidden">
                <UserDropdown />
              </div>
            )}

            {/* Hamburger Menu Button */}
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
        isMobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
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

      {/* Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={closeAuthModal}
        mode={authMode}
        onSwitchMode={switchAuthMode}
      />
    </nav>
  );
};

export default Navigation;