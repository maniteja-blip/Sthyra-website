import React, { useState, lazy, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
// Lazy Load Butterfly to reduce initial bundle size (Performance Fix)
const ButterflyWrapper = lazy(() => import('./components/ButterflyWrapper'));
import CustomCursor from './components/CustomCursor';
import NoiseOverlay from './components/NoiseOverlay';
import SmoothScroll from './components/SmoothScroll';
import Home from './components/Home';
import Contact from './components/Contact';
import Preloader from './components/Preloader';

function App() {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <SmoothScroll>
      <div className="app-container cursor-none"> {/* Hide default cursor */}
        <AnimatePresence mode="wait">
          {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
        </AnimatePresence>

        <CustomCursor />
        <NoiseOverlay />

        {/* Load 3D Butterfly in background without blocking main site */}
        <Suspense fallback={null}>
          <ButterflyWrapper />
        </Suspense>

        <Navbar />
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>

        {/* Global Mobile Scroll Indicator - Hides on scroll */}
        <div className={`md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 transition-opacity duration-500 pointer-events-none z-40 ${isScrolled ? 'opacity-0' : 'opacity-60 animate-bounce'}`}>
          <span className="text-[10px] uppercase tracking-[0.2em] text-white">Scroll</span>
          <div className="w-[1px] h-8 bg-gradient-to-b from-white/0 via-white to-white/0"></div>
        </div>

        <Footer />
      </div>
    </SmoothScroll>
  );
}

export default App;
