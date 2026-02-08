import React, { useState } from 'react';
import './TestimonialsCarousel.css';
import starIcon from '../../assets/images/star.svg';
import unstarIcon from '../../assets/images/unstar.svg';
import arrowBtn from '../../assets/images/arrow btn.svg';

function TestimonialsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  
  const testimonials = [
    {
      id: 1,
      quote: "I like that I can look up businesses and remember the ones I've reviewed or want to try. Everything feels simple and well organized.",
      author: "Olivia T.",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=60&h=60&fit=crop&crop=face"
    },
    {
      id: 2,
      quote: "Review Watchdog has completely changed how I manage my online reputation. The insights are incredibly detailed and actionable.",
      author: "Marcus R.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face"
    },
    {
      id: 3,
      quote: "Finally, a tool that makes monitoring customer feedback effortless. The real-time alerts have saved my business multiple times.",
      author: "Sarah M.",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&crop=face"
    },
    {
      id: 4,
      quote: "The automated reporting features have streamlined our review management process. We catch issues before they become problems.",
      author: "David L.",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face"
    },
    {
      id: 5,
      quote: "Customer insights are presented in such a clear way. It's helped us improve our service quality significantly.",
      author: "Emma K.",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=60&h=60&fit=crop&crop=face"
    },
    {
      id: 6,
      quote: "The best investment we've made for our online presence. The ROI has been incredible within just a few months.",
      author: "James P.",
      avatar: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=60&h=60&fit=crop&crop=face"
    }
  ];

  const cardsPerView = 3;
  const maxIndex = Math.max(0, testimonials.length - cardsPerView);

  const nextTestimonial = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex(prev => prev < maxIndex ? prev + 1 : 0);
    setTimeout(() => setIsAnimating(false), 600);
  };

  const prevTestimonial = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex(prev => prev > 0 ? prev - 1 : maxIndex);
    setTimeout(() => setIsAnimating(false), 600);
  };

  const visibleTestimonials = testimonials.slice(currentIndex, currentIndex + cardsPerView);

  return (
    <section className="testimonials">
      <div className="container">
        <div className="testimonials__wrapper">
          <button 
            className="testimonials__nav testimonials__nav--prev" 
            onClick={prevTestimonial}
            aria-label="Previous testimonials"
          >
            <img src={arrowBtn} alt="Previous" className="testimonials__arrow-icon testimonials__arrow-icon--flipped" />
          </button>
          
          <div className="testimonials__content">
            <div 
              className="testimonials__slider" 
              style={{
                transform: `translateX(-${currentIndex * (350 + 16)}px)`,
                transition: isAnimating ? 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)' : 'none'
              }}
            >
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="testimonials__card">
                  <div className="testimonials__card-stars">
                    <img src={starIcon} alt="Star" className="testimonials__star-icon" />
                    <img src={starIcon} alt="Star" className="testimonials__star-icon" />
                    <img src={starIcon} alt="Star" className="testimonials__star-icon" />
                    <img src={starIcon} alt="Star" className="testimonials__star-icon" />
                    <img src={starIcon} alt="Star" className="testimonials__star-icon" />
                  </div>
                  <p className="testimonials__card-quote">
                    {testimonial.quote}
                  </p>
                  <div className="testimonials__card-author">
                    <div className="testimonials__card-avatar">
                      <img src={testimonial.avatar} alt={testimonial.author} />
                    </div>
                    <span className="testimonials__card-name">{testimonial.author}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <button 
            className="testimonials__nav testimonials__nav--next" 
            onClick={nextTestimonial}
            aria-label="Next testimonials"
          >
            <img src={arrowBtn} alt="Next" className="testimonials__arrow-icon" />
          </button>
        </div>
      </div>
    </section>
  );
}

export default TestimonialsCarousel;