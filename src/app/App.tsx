import { useEffect } from 'react';
import { StockBackground } from './components/StockBackground';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Programs } from './components/Programs';
import { Benefits } from './components/Benefits';
import { Mentors } from './components/Mentors';
import { Articles } from './components/Articles';
import { Testimonials } from './components/Testimonials';
import { CTA } from './components/CTA';
import { Footer } from './components/Footer';

export default function App() {
  useEffect(() => {
    // Smooth scrolling behavior
    document.documentElement.style.scrollBehavior = 'smooth';
    
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#0B0B0B] text-white overflow-x-hidden">
      {/* Animated Stock Background */}
      <StockBackground />
      
      {/* Navigation */}
      <Navigation />
      
      {/* Main Content */}
      <main className="relative z-10">
        <Hero />
        <About />
        <Programs />
        <Benefits />
        <Mentors />
        <Articles />
        <Testimonials />
        <CTA />
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}
