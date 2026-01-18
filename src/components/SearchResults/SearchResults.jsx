import React from 'react';
import './SearchResults.css';
import './SearchResults.css';

function SearchResults({ 
  businesses, 
  loading, 
  error, 
  onBusinessSelect, 
  onClearResults 
}) {
  
  if (loading) {
    return (
      <div className="search-results search-results--loading">
        <div className="search-results__spinner">
          <div className="spinner"></div>
          <p>Searching for businesses...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="search-results search-results--error">
        <div className="search-results__error">
          <h3>Search Error</h3>
          <p>{error}</p>
          <button onClick={onClearResults} className="search-results__retry-btn">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!businesses || businesses.length === 0) {
    return null;
  }

  return (
    <div className="search-results">
      <div className="search-results__header">
        <h3 className="search-results__title">Search Results</h3>
        <button onClick={onClearResults} className="search-results__close-btn">
          ×
        </button>
      </div>
      
      <div className="search-results__list">
        {businesses.map((business) => (
          <div 
            key={business.place_id}
            className="search-results__item"
            onClick={() => onBusinessSelect(business)}
          >
            <div className="search-results__item-info">
              <h4 className="search-results__item-name">{business.name}</h4>
              <p className="search-results__item-address">{business.formatted_address}</p>
              
              {business.rating && (
                <div className="search-results__item-rating">
                  <span className="search-results__rating-score">{business.rating}</span>
                  <div className="search-results__rating-stars">
                    {Array.from({ length: 5 }, (_, index) => (
                      <span 
                        key={index}
                        className={`star ${index < Math.floor(business.rating) ? 'star--filled' : 'star--empty'}`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  {business.user_ratings_total && (
                    <span className="search-results__rating-count">
                      ({business.user_ratings_total} reviews)
                    </span>
                  )}
                </div>
              )}
              
              {business.price_level && (
                <div className="search-results__item-price">
                  {'$'.repeat(business.price_level)}
                </div>
              )}
            </div>
            
            {business.photos && business.photos.length > 0 && (
              <div className="search-results__item-photo">
                <img 
                  src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=100&photoreference=${business.photos[0].photo_reference}&key=${process.env.REACT_APP_GOOGLE_PLACES_API_KEY}`}
                  alt={business.name}
                  loading="lazy"
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchResults;