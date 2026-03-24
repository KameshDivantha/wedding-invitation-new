import React from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { OurStory } from './components/OurStory';
import { EventDetails } from './components/EventDetails';

import { RSVPSection } from './components/RSVPSection';
import { Footer } from './components/Footer';
export function App() {
  return (
    <div className="min-h-screen bg-wedding-bg text-wedding-text font-serif selection:bg-lavender-200 selection:text-wedding-text">
      <Navbar />
      <HeroSection />

      {/* Watercolor divider */}
      <div className="watercolor-divider" />

      <OurStory />

      {/* Watercolor divider */}
      <div className="watercolor-divider" />

      <EventDetails />


      {/* Watercolor divider */}
      <div className="watercolor-divider" />

      <RSVPSection />
      <Footer />
    </div>);

}