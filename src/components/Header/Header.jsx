import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Header.css';
import logo from '../../assets/images/logo.svg';
import { LoginModal, RegisterModal } from '../modals';

function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogoClick = (e) => {
    e.preventDefault();
    
    // If we're already on the home page, refresh it
    if (location.pathname === '/') {
      window.location.reload();
    } else {
      // Navigate to home page
      navigate('/');
    }
  };

  const handleLoginClick = (e) => {
    e.preventDefault();
    setIsLoginModalOpen(true);
    setIsMobileMenuOpen(false); // Close mobile menu if open
  };

  const handleSignUpClick = (e) => {
    e.preventDefault();
    setIsRegisterModalOpen(true);
    setIsMobileMenuOpen(false); // Close mobile menu if open
  };

  const handleCloseModals = () => {
    setIsLoginModalOpen(false);
    setIsRegisterModalOpen(false);
  };

  const handleLogin = (formData) => {
    console.log('Login:', formData);
    // Handle login logic here
    handleCloseModals();
  };

  const handleRegister = (formData) => {
    console.log('Register:', formData);
    // Handle register logic here
    handleCloseModals();
  };

  const handleSwitchToRegister = () => {
    setIsLoginModalOpen(false);
    setIsRegisterModalOpen(true);
  };

  const handleSwitchToLogin = () => {
    setIsRegisterModalOpen(false);
    setIsLoginModalOpen(true);
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header__content">
          <button onClick={handleLogoClick} className="header__logo">
            <img src={logo} alt="Review Watchdog Logo" className="header__logo-icon" />
            <span className="header__logo-text">
              <span className="header__logo-text--review">REVIEW</span>
              <span className="header__logo-text--watchdog">WATCHDOG</span>
            </span>
          </button>
          
          {/* Desktop Navigation */}
          <nav className="header__nav header__nav--desktop">
            <a href="#businesses" className="header__nav-link">For Businesses</a>
            <button onClick={handleLoginClick} className="header__nav-link">Log in</button>
            <button onClick={handleSignUpClick} className="header__cta-btn">Sign Up</button>
          </nav>

          {/* Mobile Hamburger Button */}
          <button 
            className="header__hamburger"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            <span className="header__hamburger-line"></span>
            <span className="header__hamburger-line"></span>
            <span className="header__hamburger-line"></span>
          </button>

          {/* Mobile Navigation */}
          <nav className={`header__nav header__nav--mobile ${isMobileMenuOpen ? 'header__nav--mobile-open' : ''}`}>
            <a href="#businesses" className="header__nav-link">For Businesses</a>
            <button onClick={handleLoginClick} className="header__nav-link">Log in</button>
            <button onClick={handleSignUpClick} className="header__cta-btn">Sign Up</button>
          </nav>
        </div>
      </div>
      
      {/* Login Modal */}
      <LoginModal 
        isOpen={isLoginModalOpen}
        onLogin={handleLogin}
        onRegister={handleSwitchToRegister}
        onClose={handleCloseModals}
      />
      
      {/* Register Modal */}
      <RegisterModal 
        isOpen={isRegisterModalOpen}
        onRegister={handleRegister}
        onLogin={handleSwitchToLogin}
        onClose={handleCloseModals}
      />
    </header>
  );
}

export default Header;