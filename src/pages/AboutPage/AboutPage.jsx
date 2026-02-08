import React from 'react';
import './AboutPage.css';
import dashboardIcon from '../../assets/images/dashboard icon.svg';
import searchIcon from '../../assets/images/searchicon.svg';
import forBusinessIcon from '../../assets/images/ForTheBusiness icon.svg';
import forPeopleIcon from '../../assets/images/ForThePeople Icon.svg';
import analysisIcon from '../../assets/images/Analysis Icon.svg';
import bellIcon from '../../assets/images/bell icon.svg';
import detectiveDog from '../../assets/images/Detective Dog hole.png';
import googleLogo from '../../assets/images/google circle icon.svg';
import facebookLogo from '../../assets/images/facebook circle icon.svg';
import yelpLogo from '../../assets/images/yelp circle icon.svg';
import starIcon from '../../assets/images/star.svg';
import unstarIcon from '../../assets/images/unstar.svg';

function AboutPage() {
  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-page__hero">
        <div className="container">
          <h1 className="about-page__title">About Review Watchdog</h1>
          <div className="about-page__hero-content">
            <div className="about-page__hero-text">
              <p className="about-page__intro">
                <strong>Review Watchdog</strong> is an all-in-one reputation platform built to bring transparency to <strong>customers</strong> and clarity to <strong>businesses</strong>.
              </p>
              <p className="about-page__value-prop">
                We aggregate reviews from multiple platforms and organize them into one streamlined experience—making it easy for business owners to <strong>manage their reputation</strong> and for customers to research businesses <strong>with confidence</strong>.
              </p>
            </div>
            <div className="about-page__hero-image">
              <img src={detectiveDog} alt="Detective Dog" className="about-page__mascot" />
            </div>
          </div>
        </div>
      </section>

      {/* For Customers Section */}
      <section className="about-page__customers">
        <div className="container">
          <div className="about-page__section-card">
            <div className="about-page__section-content">
              <h2 className="about-page__section-title">
                <strong>For Customers:</strong> Smarter Business Research
              </h2>
              <div className="about-page__features">
                <div className="about-page__feature">
                  <img src={searchIcon} alt="Search" className="about-page__feature-icon" />
                  <span><strong>All Reviews, One Search</strong></span>
                </div>
                <div className="about-page__feature">
                  <img src={analysisIcon} alt="Analysis" className="about-page__feature-icon" />
                  <span><strong>Transparent Reputation View</strong></span>
                </div>
                <div className="about-page__feature">
                  <img src={dashboardIcon} alt="Dashboard" className="about-page__feature-icon" />
                  <span><strong>Platform Comparison</strong></span>
                </div>
                <div className="about-page__feature">
                  <img src={forPeopleIcon} alt="People" className="about-page__feature-icon" />
                  <span><strong>Faster Decision-Making</strong></span>
                </div>
              </div>
            </div>
            <div className="about-page__section-mockup">
              <div className="about-page__review-cards">
                <div className="about-page__review-card">
                  <div className="about-page__review-card-logo">
                    <img src={googleLogo} alt="Google" />
                  </div>
                  <div className="about-page__review-card-content">
                    <h4 className="about-page__review-card-title">Hair Salon Elite</h4>
                    <p className="about-page__review-card-subtitle">Beauty & Wellness - Google</p>
                    <div className="about-page__review-card-rating">
                      <img src={starIcon} alt="Star" className="star-icon" />
                      <img src={starIcon} alt="Star" className="star-icon" />
                      <img src={starIcon} alt="Star" className="star-icon" />
                      <img src={starIcon} alt="Star" className="star-icon" />
                      <img src={unstarIcon} alt="Star" className="star-icon" />
                      <span className="about-page__review-card-rating-value">4.3 / 5</span>
                    </div>
                  </div>
                </div>
                <div className="about-page__review-card">
                  <div className="about-page__review-card-logo">
                    <img src={facebookLogo} alt="Facebook" />
                  </div>
                  <div className="about-page__review-card-content">
                    <h4 className="about-page__review-card-title">Hair Salon Elite</h4>
                    <p className="about-page__review-card-subtitle">Beauty & Wellness - Facebook</p>
                    <div className="about-page__review-card-rating">
                      <img src={starIcon} alt="Star" className="star-icon" />
                      <img src={starIcon} alt="Star" className="star-icon" />
                      <img src={starIcon} alt="Star" className="star-icon" />
                      <img src={starIcon} alt="Star" className="star-icon" />
                      <img src={starIcon} alt="Star" className="star-icon" />
                      <span className="about-page__review-card-rating-value">4.8 / 5</span>
                    </div>
                  </div>
                </div>
                <div className="about-page__review-card">
                  <div className="about-page__review-card-logo">
                    <img src={yelpLogo} alt="Yelp" />
                  </div>
                  <div className="about-page__review-card-content">
                    <h4 className="about-page__review-card-title">Hair Salon Elite</h4>
                    <p className="about-page__review-card-subtitle">Beauty & Wellness - Yelp</p>
                    <div className="about-page__review-card-rating">
                      <img src={starIcon} alt="Star" className="star-icon" />
                      <img src={starIcon} alt="Star" className="star-icon" />
                      <img src={starIcon} alt="Star" className="star-icon" />
                      <img src={starIcon} alt="Star" className="star-icon" />
                      <img src={unstarIcon} alt="Star" className="star-icon" />
                      <span className="about-page__review-card-rating-value">4.1 / 5</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* For Businesses Section */}
      <section className="about-page__businesses">
        <div className="container">
          <div className="about-page__section-card">
            <div className="about-page__section-content">
              <h2 className="about-page__section-title">
                <strong>For Businesses:</strong> Reputation Management, Simplified
              </h2>
              <div className="about-page__features">
                <div className="about-page__feature">
                  <img src={dashboardIcon} alt="Dashboard" className="about-page__feature-icon" />
                  <span><strong>Unified Review Inbox</strong></span>
                </div>
                <div className="about-page__feature">
                  <img src={analysisIcon} alt="Analytics" className="about-page__feature-icon" />
                  <span><strong>Cross-Platform Insights</strong></span>
                </div>
                <div className="about-page__feature">
                  <img src={searchIcon} alt="Search" className="about-page__feature-icon" />
                  <span><strong>Search & Filters</strong></span>
                </div>
                <div className="about-page__feature">
                  <img src={bellIcon} alt="Monitoring" className="about-page__feature-icon" />
                  <span><strong>Reputation Monitoring</strong></span>
                </div>
                <div className="about-page__feature">
                  <img src={forBusinessIcon} alt="Multi-location" className="about-page__feature-icon" />
                  <span><strong>Multi-Location Support</strong></span>
                </div>
              </div>
            </div>
            <div className="about-page__section-mockup">
              <div className="about-page__review-cards">
                <div className="about-page__review-card">
                  <div className="about-page__review-card-logo">
                    <img src={googleLogo} alt="Google" />
                  </div>
                  <div className="about-page__review-card-content">
                    <h4 className="about-page__review-card-title">"Amazing pizza and great service!"</h4>
                    <p className="about-page__review-card-subtitle">Sarah M. - Google Review</p>
                    <div className="about-page__review-card-rating">
                      <img src={starIcon} alt="Star" className="star-icon" />
                      <img src={starIcon} alt="Star" className="star-icon" />
                      <img src={starIcon} alt="Star" className="star-icon" />
                      <img src={starIcon} alt="Star" className="star-icon" />
                      <img src={starIcon} alt="Star" className="star-icon" />
                      <span className="about-page__review-card-rating-value">5 / 5</span>
                    </div>
                  </div>
                </div>
                <div className="about-page__review-card">
                  <div className="about-page__review-card-logo">
                    <img src={yelpLogo} alt="Yelp" />
                  </div>
                  <div className="about-page__review-card-content">
                    <h4 className="about-page__review-card-title">"Best coffee in town, highly recommend!"</h4>
                    <p className="about-page__review-card-subtitle">Mike R. - Yelp Review</p>
                    <div className="about-page__review-card-rating">
                      <img src={starIcon} alt="Star" className="star-icon" />
                      <img src={starIcon} alt="Star" className="star-icon" />
                      <img src={starIcon} alt="Star" className="star-icon" />
                      <img src={starIcon} alt="Star" className="star-icon" />
                      <img src={unstarIcon} alt="Star" className="star-icon" />
                      <span className="about-page__review-card-rating-value">4 / 5</span>
                    </div>
                  </div>
                </div>
                <div className="about-page__review-card">
                  <div className="about-page__review-card-logo">
                    <img src={facebookLogo} alt="Facebook" />
                  </div>
                  <div className="about-page__review-card-content">
                    <h4 className="about-page__review-card-title">"Fixed my car quickly and professionally"</h4>
                    <p className="about-page__review-card-subtitle">David L. - Facebook Review</p>
                    <div className="about-page__review-card-rating">
                      <img src={starIcon} alt="Star" className="star-icon" />
                      <img src={starIcon} alt="Star" className="star-icon" />
                      <img src={starIcon} alt="Star" className="star-icon" />
                      <img src={starIcon} alt="Star" className="star-icon" />
                      <img src={starIcon} alt="Star" className="star-icon" />
                      <span className="about-page__review-card-rating-value">5 / 5</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="about-page__mission">
        <div className="container">
          <h2 className="about-page__section-title">Bridging the Gap Between Businesses & Customers</h2>
          <div className="about-page__mission-content">
            <p className="about-page__mission-intro">Our mission is simple:</p>
            <div className="about-page__mission-quote">
              <div className="about-page__mission-icons">
                <div className="about-page__mission-icon">
                  <img src={forBusinessIcon} alt="For Business" />
                </div>
                <div className="about-page__mission-icon">
                  <img src={forPeopleIcon} alt="For People" />
                </div>
              </div>
              <blockquote className="about-page__mission-statement">
                "Create transparency for customers and actionable insights for businesses."
              </blockquote>
            </div>
            <p className="about-page__mission-conclusion">
              By bringing every review into one ecosystem, we help businesses build trust—and help customers choose with confidence.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AboutPage;