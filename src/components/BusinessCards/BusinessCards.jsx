import React from 'react';
import './BusinessCards.css';
import googleIcon from '../../assets/images/google circle icon.svg';
import facebookIcon from '../../assets/images/facebook circle icon.svg';
import yelpIcon from '../../assets/images/yelp circle icon.svg';

function BusinessCards({ businesses, onLoadMore, hasMore, isLoadingMore, isExiting }) {
  const renderStars = (rating, filled = true) => {
    const stars = [];
    const fullStars = filled ? Math.floor(rating) : 0;
    const hasHalfStar = filled && rating % 1 !== 0;
    
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<span key={i} className="star star--filled">★</span>);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(<span key={i} className="star star--half">★</span>);
      } else {
        stars.push(<span key={i} className="star">★</span>);
      }
    }
    return stars;
  };

  const handleVisitWebsite = (website, businessName) => {
    if (!website) {
      // Fallback: Search for the business on Google
      const searchQuery = encodeURIComponent(`${businessName} official website`);
      const searchUrl = `https://www.google.com/search?q=${searchQuery}`;
      window.open(searchUrl, '_blank', 'noopener,noreferrer');
      return;
    }
    
    // Ensure website has proper protocol
    let url = website;
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      url = 'https://' + url;
    }
    
    // Open website in new tab
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section className={`business-cards ${
      isExiting ? 'business-cards--exiting' : ''
    }`}>
      <div className="container">
        <div className="business-cards__header">
          <h2 className="business-cards__title">Search Results</h2>
          <p className="business-cards__count">{businesses.length} businesses found</p>
        </div>
        
        <div className="business-cards__list">
          {businesses.map((business) => (
            <article key={business.id} className="business-card">
              <div className="business-card__image">
                <img 
                  src={business.image} 
                  alt={business.name}
                  className="business-card__img"
                />
              </div>
              
              <div className="business-card__content">
                {/* Section 1: Business Info */}
                <div className="business-card__info-section">
                  <div className="business-card__header">
                    <div className="business-card__info">
                      <h3 className="business-card__name">{business.name}</h3>
                      <p className="business-card__address">{business.address}</p>
                    </div>
                    <button className="business-card__bookmark">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/>
                      </svg>
                    </button>
                  </div>
                </div>
                
                {/* Section 2 & 3: Reviews and Actions side by side */}
                <div className="business-card__bottom-section">
                  <div className="business-card__reviews-section">
                    <div className="business-card__platforms">
                      <div className="business-card__platform">
                        <div className="business-card__platform-header">
                          <img 
                            src={googleIcon} 
                            alt="Google" 
                            className="business-card__platform-icon business-card__platform-icon--google" 
                          />
                          <div className="business-card__stars">
                            {renderStars(business.rating, true)}
                          </div>
                          <span className="business-card__rating-text">
                            {business.rating.toFixed(1)}/5
                          </span>
                        </div>
                      </div>
                      
                      <div className="business-card__platform">
                        <div className="business-card__platform-header">
                          <img 
                            src={facebookIcon} 
                            alt="Facebook" 
                            className="business-card__platform-icon business-card__platform-icon--facebook" 
                          />
                          <div className="business-card__stars">
                            {renderStars(0, false)}
                          </div>
                          <span className="business-card__rating-text business-card__rating-text--unavailable">
                            0.0/5
                          </span>
                        </div>
                      </div>
                      
                      <div className="business-card__platform">
                        <div className="business-card__platform-header">
                          <img 
                            src={yelpIcon} 
                            alt="Yelp" 
                            className="business-card__platform-icon business-card__platform-icon--yelp" 
                          />
                          <div className="business-card__stars">
                            {renderStars(0, false)}
                          </div>
                          <span className="business-card__rating-text business-card__rating-text--unavailable">
                            0.0/5
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="business-card__actions-section">
                    <div className="business-card__actions">
                      <div className="business-card__button-row">
                        <button className="business-card__btn business-card__btn--primary">
                          Leave a Review
                        </button>
                        <button className="business-card__btn business-card__btn--secondary">
                          View All Reviews
                        </button>
                      </div>
                      <div className="business-card__button-row">
                        <button 
                          className="business-card__btn business-card__btn--secondary"
                          onClick={() => handleVisitWebsite(business.website, business.name)}
                          title={business.website ? "Visit business website" : "Search for business website"}
                        >
                          {business.website ? "Visit Website" : "Find Website"}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
        
        {hasMore && (
          <div className="business-cards__load-more">
            <button 
              className="business-cards__load-btn"
              onClick={onLoadMore}
              disabled={isLoadingMore}
            >
              {isLoadingMore ? (
                <>
                  <div className="circle-preloader circle-preloader--small"></div>
                  Loading...
                </>
              ) : (
                'Load More Businesses'
              )}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

export default BusinessCards;