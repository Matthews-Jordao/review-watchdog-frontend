import React from 'react';
import './Hero.css';
import searchIcon from '../../assets/images/searchicon.svg';
import googleLogo from '../../assets/images/google-ar21.svg';
import facebookLogo from '../../assets/images/facebook-ar21.svg';
import yelpLogo from '../../assets/images/yelp-ar21.svg';

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
            <button className="hero__search-btn">
              <img src={searchIcon} alt="Search" className="hero__search-icon" />
            </button>
          </div>
          
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