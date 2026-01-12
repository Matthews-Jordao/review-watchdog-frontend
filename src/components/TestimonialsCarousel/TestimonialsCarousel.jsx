import React from 'react';
import './TestimonialsCarousel.css';

function TestimonialsCarousel() {
  return (
    <section className="testimonials">
      <div className="container">
        <div className="testimonials__content">
          <div className="testimonials__card">
            <div className="testimonials__card-stars">★★★★★</div>
            <p className="testimonials__card-quote">"Love being able to see all the reviews for a business in one place instead of jumping between Yelp, Google, and others. Makes it much easier and faster to feel confident before making deals."</p>
            <div className="testimonials__card-author">- Jessica M.</div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TestimonialsCarousel;