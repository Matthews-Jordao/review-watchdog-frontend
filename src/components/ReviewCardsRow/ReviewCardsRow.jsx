import React from 'react';
import './ReviewCardsRow.css';
import googleLogo from '../../assets/images/google circle icon.svg';
import facebookLogo from '../../assets/images/facebook circle icon.svg';
import yelpLogo from '../../assets/images/yelp circle icon.svg';
import starIcon from '../../assets/images/star.svg';
import unstarIcon from '../../assets/images/unstar.svg';

// Helper to generate random rating between 2.5 and 5 (half-star increments)
function getRandomRating() {
  const min = 2.5;
  const max = 5;
  const steps = (max - min) * 2 + 1; // 2.5, 3, 3.5, ..., 5
  const step = Math.floor(Math.random() * steps);
  return min + step * 0.5;
}

const cardData = [
  { logo: yelpLogo, title: 'Mexican Restaurant', subtitle: 'Mexican Restaurant' },
  { logo: googleLogo, title: 'Italian Bistro', subtitle: 'Italian Restaurant' },
  { logo: facebookLogo, title: 'Coffee Shop', subtitle: 'Coffee & Bakery' },
  { logo: yelpLogo, title: 'Auto Repair Shop', subtitle: 'Automotive Service' },
  { logo: googleLogo, title: 'Hair Salon', subtitle: 'Beauty & Wellness' },
  { logo: facebookLogo, title: 'Pizza Place', subtitle: 'Pizzeria' },
];

// Duplicate set for seamless loop
const allCards = [...cardData, ...cardData];

function ReviewCardsRow() {
  // Generate random ratings for each card
  const ratings = React.useMemo(() => allCards.map(() => getRandomRating()), []);
  return (
    <section className="review-cards-row">
      <div className="container">
        <div className="review-cards-row__content">
          {allCards.map((card, idx) => {
            const rating = ratings[idx];
            const fullStars = Math.floor(rating);
            const halfStar = rating % 1 >= 0.5;
            const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
            return (
              <div className="review-cards-row__card" key={idx}>
                <div className="review-cards-row__card-logo">
                  <img src={card.logo} alt={card.title} />
                </div>
                <div className="review-cards-row__card-content">
                  <h3 className="review-cards-row__card-title">{card.title}</h3>
                  <p className="review-cards-row__card-subtitle">{card.subtitle}</p>
                  <div className="review-cards-row__card-rating" style={{ display: 'flex', alignItems: 'center' }}>
                    {/* Full stars */}
                    {[...Array(fullStars)].map((_, i) => (
                      <img src={starIcon} alt="Star" className="star-icon" key={`full-${i}`} />
                    ))}
                    {/* Half star (use starIcon for simplicity, or add a half-star icon if available) */}
                    {halfStar && (
                      <img src={starIcon} alt="Half Star" className="star-icon" key="half" style={{ opacity: 0.5 }} />
                    )}
                    {/* Empty stars */}
                    {[...Array(emptyStars)].map((_, i) => (
                      <img src={unstarIcon} alt="Star" className="star-icon" key={`empty-${i}`} />
                    ))}
                    <span className="review-cards-row__card-rating-value" style={{ fontSize: '0.75em', color: '#888', marginLeft: '8px', whiteSpace: 'nowrap' }}>
                      {rating.toFixed(1)} / 5
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default ReviewCardsRow;