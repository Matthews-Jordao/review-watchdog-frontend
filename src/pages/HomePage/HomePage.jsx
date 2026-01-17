import React from 'react';
import './HomePage.css';
import Hero from '../../components/Hero/Hero';
import ReviewCardsRow from '../../components/ReviewCardsRow/ReviewCardsRow';
import AudienceCards from '../../components/AudienceCards/AudienceCards';
import TestimonialsCarousel from '../../components/TestimonialsCarousel/TestimonialsCarousel';
import WhyChooseSection from '../../components/WhyChooseSection/WhyChooseSection';
import BottomCTA from '../../components/BottomCTA/BottomCTA';

function HomePage() {
  return (
    <div className="homepage">
      <Hero />
      <ReviewCardsRow />
      <AudienceCards />
      <TestimonialsCarousel />
      <WhyChooseSection />
      <BottomCTA />
    </div>
  );
}

export default HomePage;