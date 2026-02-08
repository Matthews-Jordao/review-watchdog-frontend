import React from 'react';
import './WhyChooseSection.css';
import bellIcon from '../../assets/images/bell icon.svg';
import dashboardIcon from '../../assets/images/dashboard icon.svg';
import analysisIcon from '../../assets/images/Analysis Icon.svg';

function WhyChooseSection() {
  return (
    <section className="why-choose">
      <div className="container">
        <h2 className="why-choose__title">Why Choose Review Watchdog?</h2>
        
        <div className="why-choose__content">
          <div className="why-choose__feature">
            <div className="why-choose__feature-icon">
              <img src={bellIcon} alt="Real-time alerts icon" />
            </div>
            <h3 className="why-choose__feature-title">Real-Time Alerts</h3>
            <p className="why-choose__feature-description">Get instant notifications when new reviews are posted. Never miss feedback and respond quickly to maintain your reputation.</p>
          </div>
          
          <div className="why-choose__feature">
            <div className="why-choose__feature-icon">
              <img src={dashboardIcon} alt="Centralized dashboard icon" />
            </div>
            <h3 className="why-choose__feature-title">Centralized Dashboard</h3>
            <p className="why-choose__feature-description">Monitor all your reviews from Google, Yelp, Facebook, and other platforms in one unified dashboard. Save time and stay organized.</p>
          </div>
          
          <div className="why-choose__feature">
            <div className="why-choose__feature-icon">
              <img src={analysisIcon} alt="Competitive analysis icon" />
            </div>
            <h3 className="why-choose__feature-title">Competitive Analysis</h3>
            <p className="why-choose__feature-description">Compare your ratings and reviews against competitors. Identify opportunities to improve and stay ahead in your market.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default WhyChooseSection;