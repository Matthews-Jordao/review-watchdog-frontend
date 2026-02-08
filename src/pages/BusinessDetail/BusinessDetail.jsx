import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './BusinessDetail.css';
import { getBusinessDetails } from '../../utils/googlePlacesApi';
import { fetchBusinessReviews, fetchMoreReviews } from '../../services/outscraperApi';
import googleIcon from '../../assets/images/google circle icon.svg';
import facebookIcon from '../../assets/images/facebook circle icon.svg';
import yelpIcon from '../../assets/images/yelp circle icon.svg';

function BusinessDetail() {
  const { placeId } = useParams();
  const navigate = useNavigate();
  const [business, setBusiness] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [displayedReviews, setDisplayedReviews] = useState([]);
  const reviewsToShow = 5;
  const [isLoadingMoreReviews, setIsLoadingMoreReviews] = useState(false);
  const [outscraperError, setOutscraperError] = useState(null);
  const [hasMoreReviews, setHasMoreReviews] = useState(true);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [ratingFilter, setRatingFilter] = useState('');
  // Track how many Outscraper reviews have been fetched so far
  const [outscraperFetched, setOutscraperFetched] = useState(0);

  // Helper: count reviews by platform
  const getPlatformReviewCount = (platform) => {
    if (!business || !Array.isArray(business.reviews)) return 0;
    return business.reviews.filter(r => r.platform === platform).length;
  };
  // Helper: get total review count for each platform
  const googleTotal = business?.reviewCount || getPlatformReviewCount('google');
  const facebookTotal = getPlatformReviewCount('facebook');
  const yelpTotal = getPlatformReviewCount('yelp');
  // Displayed reviews by platform
  const displayedGoogle = displayedReviews.filter(r => r.platform === 'google').length;
  const displayedFacebook = displayedReviews.filter(r => r.platform === 'facebook').length;
  const displayedYelp = displayedReviews.filter(r => r.platform === 'yelp').length;
  // All reviews loaded?
  const allGoogleLoaded = displayedGoogle >= googleTotal;
  const allFacebookLoaded = displayedFacebook >= facebookTotal;
  const allYelpLoaded = displayedYelp >= yelpTotal;
  const allReviewsLoaded = allGoogleLoaded && allFacebookLoaded && allYelpLoaded;
  const [dateFilter, setDateFilter] = useState('');
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [isFilterActive, setIsFilterActive] = useState(false);

  useEffect(() => {
    const fetchBusinessDetails = async () => {
      if (!placeId) {
        setError('No business ID provided');
        setLoading(false);
        return;
      }
      try {
        const businessData = await getBusinessDetails(placeId);
        setBusiness(businessData);
        // Fetch the first 5 reviews from Outscraper for this business
        const outscraperData = await fetchBusinessReviews(placeId, 5, 0, 'newest');
        if (outscraperData.reviews && outscraperData.reviews.length > 0) {
          setDisplayedReviews(outscraperData.reviews);
          setOutscraperFetched(outscraperData.reviews.length);
          // Set hasMoreReviews if there are more reviews to load
          const total = outscraperData.totalReviews || googleTotal;
          setHasMoreReviews(outscraperData.reviews.length < total);
        } else {
          setDisplayedReviews([]);
          setHasMoreReviews(false);
        }
      } catch (err) {
        console.error('Error fetching business details:', err);
        setError('Failed to load business details');
      } finally {
        setLoading(false);
      }
    };
    fetchBusinessDetails();
  }, [placeId]);

  // No need to set initial reviews from Google API anymore

  // ESC key support for filter modal
  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.key === 'Escape' && showFilterModal) {
        setShowFilterModal(false);
      }
    };

    if (showFilterModal) {
      document.addEventListener('keydown', handleEscapeKey);
    }
    
    // Cleanup listener on unmount or when modal closes
    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [showFilterModal]);

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
      const searchQuery = encodeURIComponent(`${businessName} official website`);
      const searchUrl = `https://www.google.com/search?q=${searchQuery}`;
      window.open(searchUrl, '_blank', 'noopener,noreferrer');
      return;
    }
    
    let url = website;
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      url = 'https://' + url;
    }
    
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleLeaveReview = (businessName) => {
    const searchQuery = encodeURIComponent(`${businessName} google reviews`);
    const reviewUrl = `https://www.google.com/search?q=${searchQuery}`;
    window.open(reviewUrl, '_blank', 'noopener,noreferrer');
  };

  const formatBusinessHours = (hours) => {
    if (!hours || !hours.weekdayDescriptions) {
      return 'Hours not available';
    }
    
    const today = new Date().getDay(); // 0 = Sunday, 1 = Monday, etc.
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    
    // Find today's hours
    const todayHours = hours.weekdayDescriptions.find(day => 
      day.toLowerCase().includes(daysOfWeek[today].toLowerCase())
    );
    
    return todayHours || hours.weekdayDescriptions[0] || 'Hours not available';
  };

  const handleLoadMoreReviews = async () => {
    if (!business?.placeId || isLoadingMoreReviews) return;
    setIsLoadingMoreReviews(true);
    setOutscraperError(null);
    try {
      let reviewsToSkip, batchSize;
      if (outscraperFetched === 0) {
        // First load: replace initial 5 with 5 from Outscraper
        reviewsToSkip = 0;
        batchSize = 5;
      } else {
        // Subsequent loads: add 3 more
        reviewsToSkip = outscraperFetched;
        batchSize = 3;
      }
      const outscraperData = await fetchBusinessReviews(business.placeId, batchSize, reviewsToSkip, 'newest');
      if (outscraperData.reviews && outscraperData.reviews.length > 0) {
        if (outscraperFetched === 0) {
          setDisplayedReviews(outscraperData.reviews);
          setOutscraperFetched(outscraperData.reviews.length);
        } else {
          setDisplayedReviews(prevDisplayed => {
            const updated = [...prevDisplayed, ...outscraperData.reviews];
            return updated;
          });
          setOutscraperFetched(prev => prev + outscraperData.reviews.length);
        }
        // Check if there are more reviews to load
        const total = outscraperData.totalReviews || googleTotal;
        const newDisplayed = (outscraperFetched === 0 ? outscraperData.reviews.length : outscraperFetched + outscraperData.reviews.length);
        setHasMoreReviews(newDisplayed < total);
      } else {
        setHasMoreReviews(false);
        setOutscraperError('No more reviews.');
      }
    } catch (error) {
      console.error('Error loading more reviews:', error);
      if (error.message && error.message.includes('402')) {
        setOutscraperError('⚠️ Payment Required: The review service needs account verification. Please check your Outscraper account billing to load more reviews.');
        setHasMoreReviews(false);
      } else {
        setOutscraperError('Unable to load more reviews. Please try again later.');
      }
    } finally {
      setIsLoadingMoreReviews(false);
    }
  };

  const applyFilters = () => {
    let filtered = displayedReviews;
    
    // Filter by rating
    if (ratingFilter) {
      const targetRating = parseInt(ratingFilter);
      filtered = filtered.filter(review => review.rating === targetRating);
    }
    
    // Filter by date
    if (dateFilter) {
      const filterDate = new Date(dateFilter);
      filtered = filtered.filter(review => {
        const reviewDate = new Date(review.time);
        return reviewDate >= filterDate;
      });
    }
    
    setFilteredReviews(filtered);
    setIsFilterActive(ratingFilter !== '' || dateFilter !== '');
    setShowFilterModal(false);
  };

  const clearFilters = () => {
    setRatingFilter('');
    setDateFilter('');
    setFilteredReviews([]);
    setIsFilterActive(false);
    setShowFilterModal(false);
  };


  const renderReviewPhotos = (review) => {
    // Note: Google Places API reviews don't typically include photos in the current API
    // This is prepared for future API updates or integration with other platforms
    if (!review.photos || review.photos.length === 0) {
      return null;
    }

    return (
      <div className="review__photos">
        {review.photos.slice(0, 3).map((photo, index) => (
          <img 
            key={index}
            src={photo.url}
            alt={`Review photo ${index + 1}`}
            className="review__photo"
            onClick={() => window.open(photo.url, '_blank')}
          />
        ))}
        {review.photos.length > 3 && (
          <div className="review__photos-more">
            +{review.photos.length - 3} more
          </div>
        )}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="business-detail">
        <div className="container">
          <div className="business-detail__loading">
            <div className="circle-preloader"></div>
            <p>Loading business details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !business) {
    return (
      <div className="business-detail">
        <div className="container">
          <div className="business-detail__error">
            <h2>Business not found</h2>
            <p>{error || 'Unable to load business details'}</p>
            <button 
              className="business-detail__back-btn"
              onClick={() => navigate('/')}
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="business-detail">
      <div className="container">
        {/* Back button */}
        <button 
          className="business-detail__back-btn business-detail__back-btn--top"
          onClick={() => navigate('/')}
        >
          ← Back to Search
        </button>

        {/* Business Header */}
        <div className="business-detail__header">
          <div className="business-detail__image">
            <img 
              src={business.image} 
              alt={business.name}
              className="business-detail__img"
            />
          </div>
          
          <div className="business-detail__info">
            <h1 className="business-detail__name">{business.name}</h1>
            <p className="business-detail__address">{business.address}</p>
            <div className="business-detail__hours">
              <span className="business-detail__hours-label">Hours:</span>
              <span className="business-detail__hours-text">
                {formatBusinessHours(business.hours)}
              </span>
            </div>
            
            <div className="business-detail__actions">
              <button 
                className="business-detail__btn business-detail__btn--primary"
                onClick={() => handleLeaveReview(business.name)}
              >
                Leave a Review
              </button>
              <button 
                className="business-detail__btn business-detail__btn--secondary"
                onClick={() => handleVisitWebsite(business.website, business.name)}
              >
                {business.website ? "Visit Website" : "Find Website"}
              </button>
            </div>
          </div>
        </div>

        {/* Platform Ratings Summary */}
        <div className="business-detail__platforms">
          <div className="business-detail__platform business-detail__platform--active">
            <div className="business-detail__platform-header">
              <div className="business-detail__platform-row">
                <img 
                  src={googleIcon} 
                  alt="Google" 
                  className="business-detail__platform-icon" 
                />
                <div className="business-detail__stars">
                  {renderStars(business.rating, true)}
                </div>
                <span className="business-detail__rating-text">
                  {business.rating.toFixed(1)}/5
                </span>
              </div>
              <span className="business-detail__review-count">
                {business.reviewCount || getPlatformReviewCount('google')} reviews
              </span>
            </div>
          </div>
          <div className="business-detail__platform business-detail__platform--inactive">
            <div className="business-detail__platform-header">
              <div className="business-detail__platform-row">
                <img 
                  src={facebookIcon} 
                  alt="Facebook" 
                  className="business-detail__platform-icon" 
                />
                <div className="business-detail__stars business-detail__stars--grayed">
                  {renderStars(0, false)}
                </div>
                <span className="business-detail__rating-text business-detail__rating-text--grayed">
                  0.0/5
                </span>
              </div>
              <span className="business-detail__review-count business-detail__review-count--grayed">
                {getPlatformReviewCount('facebook')} reviews
              </span>
            </div>
          </div>
          <div className="business-detail__platform business-detail__platform--inactive">
            <div className="business-detail__platform-header">
              <div className="business-detail__platform-row">
                <img 
                  src={yelpIcon} 
                  alt="Yelp" 
                  className="business-detail__platform-icon" 
                />
                <div className="business-detail__stars business-detail__stars--grayed">
                  {renderStars(0, false)}
                </div>
                <span className="business-detail__rating-text business-detail__rating-text--grayed">
                  0.0/5
                </span>
              </div>
              <span className="business-detail__review-count business-detail__review-count--grayed">
                {getPlatformReviewCount('yelp')} reviews
              </span>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="business-detail__reviews">
          <div className="business-detail__reviews-header">
            <h2 className="business-detail__reviews-title">Customer Reviews</h2>
            <button 
              className="business-detail__filter-button"
              onClick={() => setShowFilterModal(true)}
              title="Filter reviews"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path 
                  d="M4 6H20M7 12H17M10 18H14" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
          
          {(isFilterActive ? filteredReviews : displayedReviews) && (isFilterActive ? filteredReviews : displayedReviews).length > 0 ? (
            <>
              {isFilterActive && (
                <div className="business-detail__filter-info">
                  <span>Showing {filteredReviews.length} filtered reviews</span>
                  <button className="business-detail__clear-filters" onClick={clearFilters}>
                    Clear filters
                  </button>
                </div>
              )}
              <div className="business-detail__reviews-list">
                {(isFilterActive ? filteredReviews : displayedReviews).map((review, index) => (
                  <div key={review.id || index} className="business-detail__review">
                    <div className="business-detail__review-header">
                      <div className="business-detail__review-author">
                        <div className="business-detail__review-avatar">
                          {typeof review.authorName === 'string' && review.authorName.length > 0
                            ? review.authorName.charAt(0).toUpperCase()
                            : '?'}
                        </div>
                        <div className="business-detail__review-info">
                          <h4 className="business-detail__review-name">{typeof review.authorName === 'string' && review.authorName.length > 0 ? review.authorName : 'Anonymous'}</h4>
                          <div className="business-detail__review-rating">
                            {renderStars(review.rating, true)}
                            <span className="business-detail__review-date">
                              {new Date(review.time).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>
                      <img 
                        src={
                          review.platform === 'google' ? googleIcon :
                          review.platform === 'facebook' ? facebookIcon :
                          review.platform === 'yelp' ? yelpIcon : googleIcon
                        }
                        alt={
                          review.platform === 'google' ? 'Google Review' :
                          review.platform === 'facebook' ? 'Facebook Review' :
                          review.platform === 'yelp' ? 'Yelp Review' : 'Review'
                        }
                        className="business-detail__review-platform business-detail__review-platform--border"
                      />
                    </div>
                    {review.text ? (
                      <p className="business-detail__review-text">{review.text}</p>
                    ) : (
                      <p className="business-detail__review-text business-detail__review-text--empty">
                        <em>This reviewer left only a star rating</em>
                      </p>
                    )}
                    {renderReviewPhotos(review)}
                  </div>
                ))}
              </div>
              
              {/* Show load more based on total review count and availability */}
              {!allReviewsLoaded && hasMoreReviews && (
                <div className="business-detail__load-more">
                  <button 
                    className="business-detail__load-btn"
                    onClick={handleLoadMoreReviews}
                    disabled={isLoadingMoreReviews}
                  >
                    {isLoadingMoreReviews ? (
                      <>
                        <div className="circle-preloader circle-preloader--small"></div>
                        Loading more reviews...
                      </>
                    ) : (
                      'Load More Reviews'
                    )}
                  </button>
                </div>
              )}
              {(allReviewsLoaded || !hasMoreReviews) && (
                <div className="business-detail__no-more-reviews">No more reviews.</div>
              )}
              {outscraperError && (
                <div className="business-detail__error-message">{outscraperError}</div>
              )}
            </>
          ) : (
            <div className="business-detail__no-reviews">
              <p>No reviews available for this business yet.</p>
              <button 
                className="business-detail__btn business-detail__btn--primary"
                onClick={() => handleLeaveReview(business.name)}
              >
                Be the first to leave a review
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Filter Modal */}
      {showFilterModal && (
        <div className="business-detail__filter-modal-overlay" onClick={() => setShowFilterModal(false)}>
          <div className="business-detail__filter-modal" onClick={(e) => e.stopPropagation()}>
            <h3>Filter Reviews</h3>
            
            <div className="business-detail__filter-group">
              <label htmlFor="rating-filter">Filter by Rating:</label>
              <select 
                id="rating-filter"
                value={ratingFilter} 
                onChange={(e) => setRatingFilter(e.target.value)}
              >
                <option value="">All ratings</option>
                <option value="5">5 stars</option>
                <option value="4">4 stars</option>
                <option value="3">3 stars</option>
                <option value="2">2 stars</option>
                <option value="1">1 star</option>
              </select>
            </div>

            <div className="business-detail__filter-group">
              <label htmlFor="date-filter">Reviews from:</label>
              <input 
                id="date-filter"
                type="date" 
                value={dateFilter} 
                onChange={(e) => setDateFilter(e.target.value)}
              />
            </div>

            <div className="business-detail__filter-buttons">
              <button className="business-detail__filter-apply" onClick={applyFilters}>
                Apply Filters
              </button>
              <button className="business-detail__filter-clear" onClick={clearFilters}>
                Clear All
              </button>
              <button className="business-detail__filter-cancel" onClick={() => setShowFilterModal(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default BusinessDetail;