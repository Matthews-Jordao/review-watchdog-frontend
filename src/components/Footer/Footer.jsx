import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';
import logo from '../../assets/images/logo.svg';

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__content">
          
          {/* Company Info Section */}
          <div className="footer__section footer__section--company">
            <Link to="/" className="footer__logo">
              <img src={logo} alt="Review Watchdog Logo" className="footer__logo-icon" />
              <span className="footer__logo-text">
                <span className="footer__logo-text--review">REVIEW</span>
                <span className="footer__logo-text--watchdog">WATCHDOG</span>
              </span>
            </Link>
            <p className="footer__description">
              Monitor and manage your online reputation across all major review platforms.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="footer__section footer__section--nav">
            <h4 className="footer__heading">Navigation</h4>
            <nav className="footer__nav">
              <ul className="footer__nav-list">
                <li className="footer__nav-item">
                  <Link to="/" className="footer__nav-link">Home</Link>
                </li>
                <li className="footer__nav-item">
                  <Link to="/about" className="footer__nav-link">About</Link>
                </li>
                <li className="footer__nav-item">
                  <a href="#features" className="footer__nav-link">Features</a>
                </li>
                <li className="footer__nav-item">
                  <a href="#testimonials" className="footer__nav-link">Testimonials</a>
                </li>
              </ul>
            </nav>
          </div>

          {/* Legal Links */}
          <div className="footer__section footer__section--legal">
            <h4 className="footer__heading">Legal</h4>
            <nav className="footer__nav">
              <ul className="footer__nav-list">
                <li className="footer__nav-item">
                  <a href="/privacy" className="footer__nav-link" target="_blank" rel="noopener noreferrer">
                    Privacy Policy
                  </a>
                </li>
                <li className="footer__nav-item">
                  <a href="/terms" className="footer__nav-link" target="_blank" rel="noopener noreferrer">
                    Terms of Service
                  </a>
                </li>
                <li className="footer__nav-item">
                  <a href="/cookies" className="footer__nav-link" target="_blank" rel="noopener noreferrer">
                    Cookie Policy
                  </a>
                </li>
              </ul>
            </nav>
          </div>

          {/* Contact Info */}
          <div className="footer__section footer__section--contact">
            <h4 className="footer__heading">Contact</h4>
            <address className="footer__address">
              <p className="footer__contact-item">
                <a href="mailto:support@reviewwatchdog.com" className="footer__contact-link">
                  support@reviewwatchdog.com
                </a>
              </p>
              <p className="footer__contact-item">
                <a href="tel:+1-555-0123" className="footer__contact-link">
                  (555) 012-3456
                </a>
              </p>
            </address>
          </div>

        </div>

        {/* Copyright Bar */}
        <div className="footer__bottom">
          <p className="footer__copyright">
            © {new Date().getFullYear()} Review Watchdog. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;