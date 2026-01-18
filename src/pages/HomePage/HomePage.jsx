import React, { useState } from 'react';
import './HomePage.css';
import Hero from '../../components/Hero/Hero';
import BusinessCards from '../../components/BusinessCards/BusinessCards';
import ReviewCardsRow from '../../components/ReviewCardsRow/ReviewCardsRow';
import AudienceCards from '../../components/AudienceCards/AudienceCards';
import TestimonialsCarousel from '../../components/TestimonialsCarousel/TestimonialsCarousel';
import WhyChooseSection from '../../components/WhyChooseSection/WhyChooseSection';
import BottomCTA from '../../components/BottomCTA/BottomCTA';
import { searchMockBusinesses } from '../../data/mockBusinesses';

function HomePage() {
  const [searchResults, setSearchResults] = useState([]);
  const [hasMore, setHasMore] = useState(false);
  const [currentQuery, setCurrentQuery] = useState('');
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [hasResults, setHasResults] = useState(false);
  const [showLoadingSpinner, setShowLoadingSpinner] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  const handleSearchResults = (results, query) => {
    // If query is empty and we had results before, trigger exit animation
    if (query.length === 0 && hasResults) {
      setIsExiting(true);
      setTimeout(() => {
        setSearchResults([]);
        setHasMore(false);
        setCurrentQuery('');
        setHasSearched(false);
        setHasResults(false);
        setIsExiting(false);
      }, 500); // Match animation duration
      return;
    }
    
    setIsExiting(false);
    setSearchResults(results.businesses);
    setHasMore(results.hasMore);
    setCurrentQuery(query);
    setHasSearched(query.length > 0);
    setHasResults(results.businesses.length > 0);
    
    // Delay hiding spinner to create smooth transition
    if (results.businesses.length > 0) {
      setTimeout(() => {
        setShowLoadingSpinner(false);
      }, 200); // 200ms delay for smooth transition
    } else {
      setShowLoadingSpinner(false);
    }
  };

  const handleSearchStateChange = (isLoading, hasCompletedSearch) => {
    setIsSearching(isLoading);
    if (isLoading) {
      setShowLoadingSpinner(true);
    }
    if (hasCompletedSearch) {
      setHasSearched(true);
    }
  };

  const handleLoadMore = async () => {
    if (!hasMore || isLoadingMore) return;

    setIsLoadingMore(true);
    try {
      const results = await searchMockBusinesses(currentQuery, searchResults.length);
      setSearchResults(prev => [...prev, ...results.businesses]);
      setHasMore(results.hasMore);
    } catch (err) {
      console.error('Load more failed:', err);
    } finally {
      setIsLoadingMore(false);
    }
  };

  return (
    <div className="homepage">
      <Hero 
        onSearchResults={handleSearchResults}
        onSearchStateChange={handleSearchStateChange}
      />
      
      {/* Business search section - appears when searching/has results */}
      {(isSearching || hasSearched || isExiting) && (
        <div className={`homepage__search-section ${
          isExiting ? 'homepage__search-section--exiting' : ''
        }`}>
          {/* Loading spinner with fade out transition */}
          {showLoadingSpinner && (
            <div className={`homepage__search-loading ${
              hasResults ? 'homepage__search-loading--fade-out' : ''
            }`}>
              <div className="container">
                <div className="circle-preloader"></div>
              </div>
            </div>
          )}
          
          {/* Business cards with delayed appearance */}
          {(hasSearched && hasResults) || isExiting ? (
            <div className={`homepage__business-results ${
              isExiting ? 'homepage__business-results--exiting' : ''
            }`}>
              <BusinessCards 
                businesses={searchResults}
                onLoadMore={handleLoadMore}
                hasMore={hasMore}
                isLoadingMore={isLoadingMore}
                isExiting={isExiting}
              />
            </div>
          ) : null}
          
          {hasSearched && !hasResults && !isSearching && (
            <div className="homepage__no-results">
              <div className="container">
                <h2>No businesses found</h2>
                <p>Try searching for a different business name or category.</p>
              </div>
            </div>
          )}
        </div>
      )}
      
      {/* Original homepage content - always visible */}
      <div className={`homepage__original-content ${
        isSearching || hasSearched ? 'homepage__original-content--pushed-down' : ''
      }`}>
        <ReviewCardsRow />
        <AudienceCards />
        <TestimonialsCarousel />
        <WhyChooseSection />
        <BottomCTA />
      </div>
    </div>
  );
}

export default HomePage;