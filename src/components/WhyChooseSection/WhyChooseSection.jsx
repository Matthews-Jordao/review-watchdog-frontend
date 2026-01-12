import React from 'react';
import './WhyChooseSection.css';

function WhyChooseSection() {
  return (
    <section className="why-choose">
      <div className="container">
        <h2 className="why-choose__title">Why Choose Review Watchdog?</h2>
        
        <div className="why-choose__content">
          <div className="why-choose__feature">
            <div className="why-choose__feature-icon">🚨</div>
            <h3 className="why-choose__feature-title">Real-Time Alerts</h3>
            <p className="why-choose__feature-description">See the full picture. Search any business and instantly view combined ratings from Google, Yelp, Facebook, and More.</p>
          </div>
          
          <div className="why-choose__feature">
            <div className="why-choose__feature-icon">📈</div>
            <h3 className="why-choose__feature-title">Centralized Dashboard</h3>
            <p className="why-choose__feature-description">See the full picture. Search any business and instantly view combined ratings from Google, Yelp, Facebook, and More.</p>
          </div>
          
          <div className="why-choose__feature">
            <div className="why-choose__feature-icon">📊</div>
            <h3 className="why-choose__feature-title">Competitive Analysis</h3>
            <p className="why-choose__feature-description">See the full picture. Search any business and instantly view combined ratings from Google, Yelp, Facebook, and More.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default WhyChooseSection;