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
import About from './components/About';
import PrivacyPolicy from './components/PrivacyPolicy';
import Terms from './components/Terms';
import Preloader from './components/Preloader';
import LandingPage from './components/LandingPage';
import { seoContent } from './data/seoContent';

function App() {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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
          <Route path="/about" element={<About />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<Terms />} />

          {/* SEO Landing Pages (Invisible Routes) */}
          <Route path="/services/architectural-visualization" element={<LandingPage {...seoContent['architectural-visualization']} />} />
          <Route path="/services/3d-rendering-services" element={<LandingPage {...seoContent['3d-rendering-services']} />} />
          <Route path="/services/vr-real-estate" element={<LandingPage {...seoContent['vr-real-estate']} />} />
          <Route path="/services/real-estate-marketing" element={<LandingPage {...seoContent['real-estate-marketing']} />} />
          <Route path="/services/interactive-3d-walkthrough" element={<LandingPage {...seoContent['interactive-3d-walkthrough']} />} />
          <Route path="/services/property-digital-twin" element={<LandingPage {...seoContent['property-digital-twin']} />} />
          <Route path="/services/3d-visualization-studio-india" element={<LandingPage {...seoContent['3d-visualization-studio-india']} />} />
          <Route path="/services/pixel-streaming-real-estate" element={<LandingPage {...seoContent['pixel-streaming-real-estate']} />} />
          <Route path="/services/luxury-property-marketing" element={<LandingPage {...seoContent['luxury-property-marketing']} />} />
        </Routes>



        {/* Footer - HIDE on Mobile Home because MobileView handles it as a slide */}
        {/* On Desktop or other pages, show it normally */}
        {(!isMobile || location.pathname !== '/') && <Footer />}
      </div>
    </SmoothScroll>
  );
}

export default App;
