import React from 'react';
import './AudienceCards.css';

function AudienceCards() {
  return (
    <section className="audience-cards">
      <div className="container">
        <div className="audience-cards__content">
          <div className="audience-cards__card">
            <div className="audience-cards__card-icon">👥</div>
            <h3 className="audience-cards__card-title">For The People</h3>
            <p className="audience-cards__card-description">Get the true picture of any business and instantly see reviews from Google, Yelp, Facebook, and more.</p>
            <button className="audience-cards__card-btn">Sign Up</button>
          </div>
          
          <div className="audience-cards__card">
            <div className="audience-cards__card-icon">🏢</div>
            <h3 className="audience-cards__card-title">For Businesses</h3>
            <p className="audience-cards__card-description">Claim your business and keep track and reply to all your reviews across Google, Yelp, Facebook, and More.</p>
            <button className="audience-cards__card-btn">Sign In</button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AudienceCards;