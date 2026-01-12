import React from 'react';
import './Hero.css';

function Hero() {
  return (
    <section className="hero">
      <div className="container">
        <div className="hero__content">
          <h1 className="hero__headline">Every Review. One Watchful Eye.</h1>
          <p className="hero__subheadline">
            See the full picture. Search any business and instantly view combined 
            ratings from Google, Yelp, Facebook, and More.
          </p>
          
          <div className="hero__search">
            <input 
              type="text" 
              placeholder="Try 'Papa's Pizza' or 'Main Street Auto Repairs'..."
              className="hero__search-input"
            />
            <button className="hero__search-btn">🔍</button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;