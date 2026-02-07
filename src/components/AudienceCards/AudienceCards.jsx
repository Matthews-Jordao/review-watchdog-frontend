import React from 'react';
import './AudienceCards.css';
import forThePeopleIcon from '../../assets/images/ForThePeople Icon.svg';
import forTheBusinessIcon from '../../assets/images/ForTheBusiness icon.svg';

function AudienceCards({ onLoginClick, onSignUpClick }) {
  const handleSignUpClick = (e) => {
    e.preventDefault();
    if (onSignUpClick) {
      onSignUpClick();
    }
  };

  const handleSignInClick = (e) => {
    e.preventDefault();
    if (onLoginClick) {
      onLoginClick();
    }
  };

  return (
    <section className="audience-cards">
      <div className="container">
        <div className="audience-cards__content">
          <div className="audience-cards__card">
            <div className="audience-cards__card-content">
              <div className="audience-cards__card-header">
                <div className="audience-cards__card-icon">
                  <img src={forThePeopleIcon} alt="For The People" />
                </div>
                <h3 className="audience-cards__card-title">For The People</h3>
              </div>
              <p className="audience-cards__card-description">
                One simple place to search any business and instantly see reviews from Google, Yelp, Facebook, and more.
              </p>
              <p className="audience-cards__card-description">
                Create an account to keep track of reviews, saved businesses, and everything you want to revisit.
              </p>
            </div>
            <button className="audience-cards__card-btn" onClick={handleSignUpClick}>Sign Up</button>
          </div>
          
          <div className="audience-cards__card">
            <div className="audience-cards__card-content">
              <div className="audience-cards__card-header">
                <div className="audience-cards__card-icon">
                  <img src={forTheBusinessIcon} alt="For Businesses" />
                </div>
                <h3 className="audience-cards__card-title">For Businesses</h3>
              </div>
              <p className="audience-cards__card-description">
                One dashboard to track and reply to all your reviews across Google, Yelp, Facebook, and more.
              </p>
              <p className="audience-cards__card-description">
                Sign in to monitor all your reviews and manage every reply from one centralized dashboard.
              </p>
            </div>
            <button className="audience-cards__card-btn" onClick={handleSignInClick}>Sign In</button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AudienceCards;