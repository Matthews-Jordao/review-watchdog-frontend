import React, { useState, useRef, useEffect } from 'react';
import './Hero.css';
import searchIcon from '../../assets/images/searchicon.svg';
import googleLogo from '../../assets/images/google-ar21.svg';
import facebookLogo from '../../assets/images/facebook-ar21.svg';
import yelpLogo from '../../assets/images/yelp-ar21.svg';
import { searchBusinesses } from '../../services/googlePlacesApi';

function Hero({ onSearchResults, onSearchStateChange }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const searchRef = useRef(null);
  const timeoutRef = useRef(null);

  // Handle search input changes with live search
  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    // Clear previous timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // If query is empty, reset everything
    if (query.trim() === '') {
      setIsLoading(false);
      setHasSearched(false);
      onSearchResults({ businesses: [], hasMore: false, total: 0 }, '');
      onSearchStateChange(false, false);
      return;
    }

    // Show loading immediately when typing
    setIsLoading(true);
    onSearchStateChange(true, false);

    // Debounce search to avoid too many searches
    timeoutRef.current = setTimeout(() => {
      handleSearch(query);
    }, 500);
  };

  // Perform the search
  const handleSearch = async (query) => {
    if (query.trim() === '') return;

    try {
      console.log('Searching for:', query); // Debug logging
      const results = await searchBusinesses(query);
      
      console.log('Search results:', results); // Debug logging
      setIsLoading(false);
      setHasSearched(true);
      onSearchResults(results, query);
      onSearchStateChange(false, true);
      
    } catch (error) {
      console.error('Search error:', error);
      setIsLoading(false);
      setHasSearched(true);
      // Show empty results on error
      onSearchResults({ businesses: [], hasMore: false, totalCount: 0 }, query);
      onSearchStateChange(false, true);
    }
  };

  // Handle search button click
  const handleSearchSubmit = (event) => {
    event.preventDefault();
    if (searchQuery.trim() !== '') {
      handleSearch(searchQuery);
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);
  return (
    <section className="hero">
      <div className="container">
        <div className="hero__content">
          <h1 className="hero__headline">Every Review. One Watchful Eye.</h1>
          <p className="hero__subheadline">
            See the full picture. Search any business and instantly view combined 
            ratings from Google, Yelp, Facebook, and More.
          </p>
          
          <form className="hero__search" onSubmit={handleSearchSubmit} ref={searchRef}>
            <input 
              type="text" 
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Try 'Papa's Pizza' or 'Main Street Auto Repairs'..."
              className="hero__search-input"
            />
            <button type="submit" className="hero__search-btn">
              <img src={searchIcon} alt="Search" className="hero__search-icon" />
            </button>
          </form>
          
          {/* Searching text between search bar and powered by */}
          {isLoading && (
            <div className="hero__search-status">
              <p className="hero__search-status-text">Searching for businesses...</p>
            </div>
          )}
          
          <div className="hero__powered-by">
            <p className="hero__powered-by-text">Powered By</p>
            <div className="hero__powered-by-logos">
              <img src={googleLogo} alt="Google" className="hero__powered-by-logo" />
              <img src={facebookLogo} alt="Facebook" className="hero__powered-by-logo" />
              <img src={yelpLogo} alt="Yelp" className="hero__powered-by-logo" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;