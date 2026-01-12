import React from 'react';
import './HomePage.css';
import Header from '../../components/Header/Header';
import Hero from '../../components/Hero/Hero';
import ReviewCardsRow from '../../components/ReviewCardsRow/ReviewCardsRow';
import AudienceCards from '../../components/AudienceCards/AudienceCards';
import TestimonialsCarousel from '../../components/TestimonialsCarousel/TestimonialsCarousel';
import WhyChooseSection from '../../components/WhyChooseSection/WhyChooseSection';
import BottomCTA from '../../components/BottomCTA/BottomCTA';

function HomePage() {
  return (
    <div className="homepage">
      <Header />
      <main>
        <Hero />
        <ReviewCardsRow />
        <AudienceCards />
        <TestimonialsCarousel />
        <WhyChooseSection />
        <BottomCTA />
      </main>
    </div>
  );
}

export default HomePage;