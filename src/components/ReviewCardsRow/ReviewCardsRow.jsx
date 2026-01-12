import React from 'react';
import './ReviewCardsRow.css';

function ReviewCardsRow() {
  return (
    <section className="review-cards-row">
      <div className="container">
        <div className="review-cards-row__content">
          <div className="review-cards-row__card">
            <span className="review-cards-row__card-platform">Yelp</span>
            <h3 className="review-cards-row__card-title">Mexican Restaurant</h3>
            <div className="review-cards-row__card-rating">★★★★☆</div>
          </div>
          
          <div className="review-cards-row__card">
            <span className="review-cards-row__card-platform">Google</span>
            <h3 className="review-cards-row__card-title">Mexican Restaurant</h3>
            <div className="review-cards-row__card-rating">★★★★☆</div>
          </div>
          
          <div className="review-cards-row__card">
            <span className="review-cards-row__card-platform">Facebook</span>
            <h3 className="review-cards-row__card-title">Mexican Restaurant</h3>
            <div className="review-cards-row__card-rating">★★★★☆</div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ReviewCardsRow;