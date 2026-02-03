import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { ASSETS } from '../config/assets';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            const beliefSection = document.getElementById('belief');
            let isOverBelief = false;

            if (beliefSection) {
                const rect = beliefSection.getBoundingClientRect();
                // Check if the Navbar (approx 100px) is overlapping with the Belief section
                // or if the Belief section is dominating the viewport
                if (rect.top <= 100 && rect.bottom >= 100) {
                    isOverBelief = true;
                }
            }

            // Transparent if at Top (Hero) OR Over Belief Section
            if (window.scrollY < 50 || isOverBelief) {
                setIsScrolled(false);
            } else {
                setIsScrolled(true);
            }
        };

        window.addEventListener('scroll', handleScroll);
        // Initial check
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (id) => {
        setIsMobileMenuOpen(false);

        // Mobile Navigation Handling
        if (window.innerWidth < 768) { // Explicit mobile check matching Home.jsx
            const targetId = id === 'case-study' ? 'projects' : id;
            const event = new CustomEvent('navigateToMobileSection', { detail: { targetId } });
            window.dispatchEvent(event);
            // If on homepage, MobileView picks this up.
            // If NOT on homepage, we navigate home first
            if (location.pathname !== '/') {
                navigate('/', { state: { scrollToMobile: targetId } });
            }
            return;
        }

        if (location.pathname !== '/') {
            navigate('/', { state: { scrollTo: id } });
        } else {
            const element = document.getElementById(id);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    const scrollToTop = () => {
        setIsMobileMenuOpen(false);
        if (location.pathname !== '/') {
            navigate('/');
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const navigateToContact = () => {
        setIsMobileMenuOpen(false);
        if (window.innerWidth < 768) {
            const event = new CustomEvent('navigateToMobileSection', { detail: { targetId: 'contact' } });
            window.dispatchEvent(event);
            if (location.pathname !== '/') {
                navigate('/', { state: { scrollToMobile: 'contact' } });
            }
        } else {
            navigate('/contact');
        }
    }

    return (
        <>
            <motion.nav
                className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 md:px-12 py-6 transition-colors duration-500 pointer-events-none ${isScrolled ? 'bg-transparent md:bg-[#0a0a0a]/90 md:backdrop-blur-md py-4' : 'bg-transparent'}`}
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 1, delay: 1 }}
            >
                {/* Logo - Inverted to white for dark theme - HIDDEN ON MOBILE per user request */}
                <div className="hidden md:block w-32 md:w-40 cursor-pointer z-50 pointer-events-auto" onClick={scrollToTop}>
                    <img
                        src={ASSETS.GLOBAL.LOGO}
                        alt="Sthyra Real Estate Visualization Logo"
                        className="w-full h-auto object-contain filter invert brightness-0"
                    />
                </div>

                <div className="hidden md:flex gap-8 text-sm uppercase tracking-widest font-light drop-shadow-md pointer-events-auto">
                    <button onClick={() => scrollToSection('case-study')} className="hover:text-white transition-colors text-white/90">Projects</button>
                    <button onClick={() => scrollToSection('services')} className="hover:text-white transition-colors text-white/90">Services</button>
                    <button onClick={() => scrollToSection('belief')} className="hover:text-white transition-colors text-white/90">Beliefs</button>
                </div>

                <button
                    onClick={navigateToContact}
                    className="hidden md:block text-xs uppercase tracking-widest border border-white/20 px-6 py-3 hover:bg-white hover:text-black transition-all pointer-events-auto"
                >
                    Contact
                </button>

                {/* Mobile Menu Icon */}
                <div
                    className="md:hidden w-8 h-8 flex flex-col justify-center items-end gap-1 cursor-pointer z-50 pointer-events-auto"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    <motion.div
                        animate={isMobileMenuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                        className="w-full h-[1px] bg-white origin-center"
                    ></motion.div>
                    <motion.div
                        animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                        className="w-2/3 h-[1px] bg-white"
                    ></motion.div>
                    <motion.div
                        animate={isMobileMenuOpen ? { rotate: -45, y: -6, width: "100%" } : { rotate: 0, y: 0, width: "100%" }} // Adjusted width logic for symmetry 
                        className="w-full h-[1px] bg-white origin-center"
                    ></motion.div>
                </div>
            </motion.nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }} /* Simplified initial state */
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }} /* Simplified exit for performance */
                        transition={{ duration: 0.2 }} /* Even faster duration */
                        className="fixed inset-0 z-40 bg-[#0a0a0a] flex flex-col items-center justify-center gap-8 text-2xl font-light uppercase tracking-widest"
                    >
                        <button onClick={() => scrollToSection('case-study')} className="hover:text-[#d4af37] transition-colors">Projects</button>
                        <button onClick={() => scrollToSection('services')} className="hover:text-[#d4af37] transition-colors">Services</button>
                        <button onClick={() => scrollToSection('belief')} className="hover:text-[#d4af37] transition-colors">Beliefs</button>
                        <button onClick={navigateToContact} className="hover:text-[#d4af37] transition-colors">Contact</button>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
