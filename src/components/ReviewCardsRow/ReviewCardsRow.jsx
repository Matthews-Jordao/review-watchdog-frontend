import React from 'react';
import './ReviewCardsRow.css';
import googleLogo from '../../assets/images/google circle icon.svg';
import facebookLogo from '../../assets/images/facebook circle icon.svg';
import yelpLogo from '../../assets/images/yelp circle icon.svg';
import starIcon from '../../assets/images/star.svg';
import unstarIcon from '../../assets/images/unstar.svg';

function ReviewCardsRow() {
  return (
    <section className="review-cards-row">
      <div className="container">
        <div className="review-cards-row__content">
          {/* First complete set */}
          <div className="review-cards-row__card">
            <div className="review-cards-row__card-logo">
              <img src={yelpLogo} alt="Yelp" />
            </div>
            <div className="review-cards-row__card-content">
              <h3 className="review-cards-row__card-title">Mexican Restaurant</h3>
              <p className="review-cards-row__card-subtitle">Mexican Restaurant</p>
              <div className="review-cards-row__card-rating">
                <img src={unstarIcon} alt="Star" className="star-icon" />
                <img src={unstarIcon} alt="Star" className="star-icon" />
                <img src={unstarIcon} alt="Star" className="star-icon" />
                <img src={unstarIcon} alt="Star" className="star-icon" />
                <img src={unstarIcon} alt="Star" className="star-icon" />
              </div>
            </div>
          </div>
          
          <div className="review-cards-row__card">
            <div className="review-cards-row__card-logo">
              <img src={googleLogo} alt="Google" />
            </div>
            <div className="review-cards-row__card-content">
              <h3 className="review-cards-row__card-title">Italian Bistro</h3>
              <p className="review-cards-row__card-subtitle">Italian Restaurant</p>
              <div className="review-cards-row__card-rating">
                <img src={unstarIcon} alt="Star" className="star-icon" />
                <img src={unstarIcon} alt="Star" className="star-icon" />
                <img src={unstarIcon} alt="Star" className="star-icon" />
                <img src={unstarIcon} alt="Star" className="star-icon" />
                <img src={unstarIcon} alt="Star" className="star-icon" />
              </div>
            </div>
          </div>
          
          <div className="review-cards-row__card">
            <div className="review-cards-row__card-logo">
              <img src={facebookLogo} alt="Facebook" />
            </div>
            <div className="review-cards-row__card-content">
              <h3 className="review-cards-row__card-title">Coffee Shop</h3>
              <p className="review-cards-row__card-subtitle">Coffee & Bakery</p>
              <div className="review-cards-row__card-rating">
                <img src={unstarIcon} alt="Star" className="star-icon" />
                <img src={unstarIcon} alt="Star" className="star-icon" />
                <img src={unstarIcon} alt="Star" className="star-icon" />
                <img src={unstarIcon} alt="Star" className="star-icon" />
                <img src={unstarIcon} alt="Star" className="star-icon" />
              </div>
            </div>
          </div>
          
          <div className="review-cards-row__card">
            <div className="review-cards-row__card-logo">
              <img src={yelpLogo} alt="Yelp" />
            </div>
            <div className="review-cards-row__card-content">
              <h3 className="review-cards-row__card-title">Auto Repair Shop</h3>
              <p className="review-cards-row__card-subtitle">Automotive Service</p>
              <div className="review-cards-row__card-rating">
                <img src={unstarIcon} alt="Star" className="star-icon" />
                <img src={unstarIcon} alt="Star" className="star-icon" />
                <img src={unstarIcon} alt="Star" className="star-icon" />
                <img src={unstarIcon} alt="Star" className="star-icon" />
                <img src={unstarIcon} alt="Star" className="star-icon" />
              </div>
            </div>
          </div>
          
          <div className="review-cards-row__card">
            <div className="review-cards-row__card-logo">
              <img src={googleLogo} alt="Google" />
            </div>
            <div className="review-cards-row__card-content">
              <h3 className="review-cards-row__card-title">Hair Salon</h3>
              <p className="review-cards-row__card-subtitle">Beauty & Wellness</p>
              <div className="review-cards-row__card-rating">
                <img src={unstarIcon} alt="Star" className="star-icon" />
                <img src={unstarIcon} alt="Star" className="star-icon" />
                <img src={unstarIcon} alt="Star" className="star-icon" />
                <img src={unstarIcon} alt="Star" className="star-icon" />
                <img src={unstarIcon} alt="Star" className="star-icon" />
              </div>
            </div>
          </div>
          
          <div className="review-cards-row__card">
            <div className="review-cards-row__card-logo">
              <img src={facebookLogo} alt="Facebook" />
            </div>
            <div className="review-cards-row__card-content">
              <h3 className="review-cards-row__card-title">Pizza Place</h3>
              <p className="review-cards-row__card-subtitle">Pizzeria</p>
              <div className="review-cards-row__card-rating">
                <img src={unstarIcon} alt="Star" className="star-icon" />
                <img src={unstarIcon} alt="Star" className="star-icon" />
                <img src={unstarIcon} alt="Star" className="star-icon" />
                <img src={unstarIcon} alt="Star" className="star-icon" />
                <img src={unstarIcon} alt="Star" className="star-icon" />
              </div>
            </div>
          </div>
          
          {/* Duplicate set for seamless loop */}
          <div className="review-cards-row__card">
            <div className="review-cards-row__card-logo">
              <img src={yelpLogo} alt="Yelp" />
            </div>
            <div className="review-cards-row__card-content">
              <h3 className="review-cards-row__card-title">Mexican Restaurant</h3>
              <p className="review-cards-row__card-subtitle">Mexican Restaurant</p>
              <div className="review-cards-row__card-rating">
                <img src={unstarIcon} alt="Star" className="star-icon" />
                <img src={unstarIcon} alt="Star" className="star-icon" />
                <img src={unstarIcon} alt="Star" className="star-icon" />
                <img src={unstarIcon} alt="Star" className="star-icon" />
                <img src={unstarIcon} alt="Star" className="star-icon" />
              </div>
            </div>
          </div>
          
          <div className="review-cards-row__card">
            <div className="review-cards-row__card-logo">
              <img src={googleLogo} alt="Google" />
            </div>
            <div className="review-cards-row__card-content">
              <h3 className="review-cards-row__card-title">Italian Bistro</h3>
              <p className="review-cards-row__card-subtitle">Italian Restaurant</p>
              <div className="review-cards-row__card-rating">
                <img src={unstarIcon} alt="Star" className="star-icon" />
                <img src={unstarIcon} alt="Star" className="star-icon" />
                <img src={unstarIcon} alt="Star" className="star-icon" />
                <img src={unstarIcon} alt="Star" className="star-icon" />
                <img src={unstarIcon} alt="Star" className="star-icon" />
              </div>
            </div>
          </div>
          
          <div className="review-cards-row__card">
            <div className="review-cards-row__card-logo">
              <img src={facebookLogo} alt="Facebook" />
            </div>
            <div className="review-cards-row__card-content">
              <h3 className="review-cards-row__card-title">Coffee Shop</h3>
              <p className="review-cards-row__card-subtitle">Coffee & Bakery</p>
              <div className="review-cards-row__card-rating">
                <img src={unstarIcon} alt="Star" className="star-icon" />
                <img src={unstarIcon} alt="Star" className="star-icon" />
                <img src={unstarIcon} alt="Star" className="star-icon" />
                <img src={unstarIcon} alt="Star" className="star-icon" />
                <img src={unstarIcon} alt="Star" className="star-icon" />
              </div>
            </div>
          </div>
          
          <div className="review-cards-row__card">
            <div className="review-cards-row__card-logo">
              <img src={yelpLogo} alt="Yelp" />
            </div>
            <div className="review-cards-row__card-content">
              <h3 className="review-cards-row__card-title">Auto Repair Shop</h3>
              <p className="review-cards-row__card-subtitle">Automotive Service</p>
              <div className="review-cards-row__card-rating">
                <img src={unstarIcon} alt="Star" className="star-icon" />
                <img src={unstarIcon} alt="Star" className="star-icon" />
                <img src={unstarIcon} alt="Star" className="star-icon" />
                <img src={unstarIcon} alt="Star" className="star-icon" />
                <img src={unstarIcon} alt="Star" className="star-icon" />
              </div>
            </div>
          </div>
          
          <div className="review-cards-row__card">
            <div className="review-cards-row__card-logo">
              <img src={googleLogo} alt="Google" />
            </div>
            <div className="review-cards-row__card-content">
              <h3 className="review-cards-row__card-title">Hair Salon</h3>
              <p className="review-cards-row__card-subtitle">Beauty & Wellness</p>
              <div className="review-cards-row__card-rating">
                <img src={unstarIcon} alt="Star" className="star-icon" />
                <img src={unstarIcon} alt="Star" className="star-icon" />
                <img src={unstarIcon} alt="Star" className="star-icon" />
                <img src={unstarIcon} alt="Star" className="star-icon" />
                <img src={unstarIcon} alt="Star" className="star-icon" />
              </div>
            </div>
          </div>
          
          <div className="review-cards-row__card">
            <div className="review-cards-row__card-logo">
              <img src={facebookLogo} alt="Facebook" />
            </div>
            <div className="review-cards-row__card-content">
              <h3 className="review-cards-row__card-title">Pizza Place</h3>
              <p className="review-cards-row__card-subtitle">Pizzeria</p>
              <div className="review-cards-row__card-rating">
                <img src={unstarIcon} alt="Star" className="star-icon" />
                <img src={unstarIcon} alt="Star" className="star-icon" />
                <img src={unstarIcon} alt="Star" className="star-icon" />
                <img src={unstarIcon} alt="Star" className="star-icon" />
                <img src={unstarIcon} alt="Star" className="star-icon" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ReviewCardsRow;