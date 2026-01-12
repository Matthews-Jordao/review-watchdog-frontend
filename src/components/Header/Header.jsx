import React from 'react';
import './Header.css';

function Header() {
  return (
    <header className="header">
      <div className="container">
        <div className="header__content">
          <div className="header__logo">
            <span className="header__logo-icon">🐕‍🦺</span>
            <span className="header__logo-text">REVIEW WATCHDOG</span>
          </div>
          
          <nav className="header__nav">
            <a href="#businesses" className="header__nav-link">For Businesses</a>
            <a href="#login" className="header__nav-link">Log in</a>
            <button className="header__cta-btn">Sign Up</button>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;