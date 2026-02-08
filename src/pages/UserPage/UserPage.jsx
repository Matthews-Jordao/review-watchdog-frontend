import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ModalWithForm from '../../components/modals/ModalWithForm/ModalWithForm';
import BusinessCards from '../../components/BusinessCards/BusinessCards';
import googleIcon from '../../assets/images/google circle icon.svg';
import facebookIcon from '../../assets/images/facebook circle icon.svg';
import yelpIcon from '../../assets/images/yelp circle icon.svg';
import './UserPage.css';

function UserPage({ user, bookmarkedBusinesses = [], bookmarkedIds = [], setBookmarkedIds, onLogout }) {
  const navigate = useNavigate();
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(user?.avatar || '');

  // URL validation function
  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  const isButtonDisabled = !avatarUrl.trim() || !isValidUrl(avatarUrl.trim());

  if (!user) {
    return (
      <div className="user-page container">
        <h1 className="user-page__title">My Profile</h1>
        <div className="user-page__empty">You must be logged in to view your profile.</div>
      </div>
    );
  }
  return (
    <div className="user-page container">
      <h1 className="user-page__title">My Profile</h1>
      <div className="user-page__info-card">
        <div className="user-page__avatar-wrapper">
          <img
            className="user-page__avatar"
            src={user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}`}
            alt="Profile"
          />
          <button
            className="user-page__avatar-overlay-btn"
            type="button"
            aria-label="Change photo"
            onClick={() => setIsAvatarModalOpen(true)}
            tabIndex={0}
          >
            <span className="user-page__avatar-tooltip">Change photo</span>
          </button>
        </div>
        <div className="user-page__details">
          <div><strong>Name:</strong> {user.name}</div>
          <div><strong>Email:</strong> {user.email}</div>
        </div>
        <button
          className="business-card__btn business-card__btn--primary"
          style={{ marginLeft: 'auto' }}
          onClick={() => {
            onLogout();
            navigate('/');
          }}
        >
          Log Out
        </button>
      </div>

      <ModalWithForm
        isOpen={isAvatarModalOpen}
        onClose={() => setIsAvatarModalOpen(false)}
        title="Change Profile Photo"
        name="change-avatar"
        buttonText="Save"
        disabled={isButtonDisabled}
        onSubmit={e => {
          e.preventDefault();
          if (!isButtonDisabled) {
            // Here you would update the avatar in user state (lift to App if needed)
            setIsAvatarModalOpen(false);
          }
        }}
      >
        <label htmlFor="avatar-url" className="modal__label">Profile Image URL</label>
        <input
          id="avatar-url"
          type="url"
          value={avatarUrl}
          onChange={e => setAvatarUrl(e.target.value)}
          placeholder="https://example.com/my-photo.jpg"
          className="modal__input"
        />
      </ModalWithForm>
      <h2 className="user-page__subtitle">Bookmarked Businesses</h2>
      <div className="user-page__bookmarks">
        {bookmarkedBusinesses.length === 0 ? (
          <div className="user-page__empty">No businesses bookmarked yet.</div>
        ) : (
          <div className="business-cards__list">
            {bookmarkedBusinesses.map((business) => (
              <article key={business.id} className="business-card">
                <div className="business-card__image">
                  <img 
                    src={business.image} 
                    alt={business.name}
                    className="business-card__img"
                  />
                </div>
                <div className="business-card__content">
                  <div className="business-card__info-section">
                    <div className="business-card__header">
                      <div className="business-card__info">
                        <h3 className="business-card__name">{business.name}</h3>
                        <p className="business-card__address">{business.address}</p>
                      </div>
                      <button
                        className={`business-card__bookmark${bookmarkedIds.includes(business.id) ? ' business-card__bookmark--active' : ''}`}
                        onClick={() => {
                          setBookmarkedIds((prev) =>
                            prev.includes(business.id)
                              ? prev.filter((id) => id !== business.id)
                              : [...prev, business.id]
                          );
                        }}
                        aria-label={bookmarkedIds.includes(business.id) ? 'Remove bookmark' : 'Add bookmark'}
                      >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill={bookmarkedIds.includes(business.id) ? '#FFD600' : 'none'} stroke={bookmarkedIds.includes(business.id) ? '#FFD600' : 'currentColor'} strokeWidth="2">
                          <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                  {/* Section 2 & 3: Reviews and Actions side by side */}
                  <div className="business-card__bottom-section">
                    <div className="business-card__reviews-section">
                      <div className="business-card__platforms">
                        {/* Google */}
                        <div className="business-card__platform">
                          <div className="business-card__platform-header">
                            <img 
                              src={googleIcon}
                              alt="Google" 
                              className="business-card__platform-icon business-card__platform-icon--google" 
                            />
                            <div className="business-card__stars">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <span key={i} className={i < Math.floor(business.rating) ? 'star star--filled' : 'star'}>★</span>
                              ))}
                            </div>
                            <span className="business-card__rating-text">
                              {business.rating?.toFixed(1) || '0.0'}/5
                            </span>
                          </div>
                        </div>
                        {/* Facebook */}
                        <div className="business-card__platform">
                          <div className="business-card__platform-header">
                            <img 
                              src={facebookIcon}
                              alt="Facebook" 
                              className="business-card__platform-icon business-card__platform-icon--facebook" 
                            />
                            <div className="business-card__stars">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <span key={i} className={'star'}>★</span>
                              ))}
                            </div>
                            <span className="business-card__rating-text business-card__rating-text--unavailable">
                              0.0/5
                            </span>
                          </div>
                        </div>
                        {/* Yelp */}
                        <div className="business-card__platform">
                          <div className="business-card__platform-header">
                            <img 
                              src={yelpIcon}
                              alt="Yelp" 
                              className="business-card__platform-icon business-card__platform-icon--yelp" 
                            />
                            <div className="business-card__stars">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <span key={i} className={'star'}>★</span>
                              ))}
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
                          <button 
                            className="business-card__btn business-card__btn--secondary"
                            onClick={() => navigate(`/business/${business.place_id}`)}
                          >
                            View All Reviews
                          </button>
                        </div>
                        <div className="business-card__button-row">
                          <button 
                            className="business-card__btn business-card__btn--secondary"
                            onClick={() => {
                              let url = business.website;
                              if (!url?.startsWith('http://') && !url?.startsWith('https://')) {
                                url = 'https://' + url;
                              }
                              window.open(url, '_blank', 'noopener,noreferrer');
                            }}
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
        )}
      </div>
    </div>
  );
}

export default UserPage;
