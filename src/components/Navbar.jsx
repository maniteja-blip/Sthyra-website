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
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (id) => {
        setIsMobileMenuOpen(false);
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
        navigate('/contact');
    }

    return (
        <>
            <motion.nav
                className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 md:px-12 py-6 transition-all duration-500 ${isScrolled ? 'bg-[#0a0a0a]/90 backdrop-blur-md py-4' : 'bg-transparent'}`}
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 1, delay: 1 }}
            >
                {/* Logo - Inverted to white for dark theme */}
                <div className="w-32 md:w-40 cursor-pointer z-50" onClick={scrollToTop}>
                    <img
                        src={ASSETS.GLOBAL.LOGO}
                        alt="Sthyra Real Estate Visualization Logo"
                        className="w-full h-auto object-contain filter invert brightness-0"
                    />
                </div>

                <div className="hidden md:flex gap-8 text-sm uppercase tracking-widest font-light drop-shadow-md">
                    <button onClick={() => scrollToSection('case-study')} className="hover:text-white transition-colors text-white/90">Projects</button>
                    <button onClick={() => scrollToSection('services')} className="hover:text-white transition-colors text-white/90">Services</button>
                    <button onClick={() => scrollToSection('belief')} className="hover:text-white transition-colors text-white/90">Beliefs</button>
                </div>

                <button
                    onClick={navigateToContact}
                    className="hidden md:block text-xs uppercase tracking-widest border border-white/20 px-6 py-3 hover:bg-white hover:text-black transition-all"
                >
                    Contact
                </button>

                {/* Mobile Menu Icon */}
                <div
                    className="md:hidden w-8 h-8 flex flex-col justify-center items-end gap-1 cursor-pointer z-50"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    <motion.div
                        animate={isMobileMenuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                        className="w-full h-[1px] bg-white origin-center transition-all"
                    ></motion.div>
                    <motion.div
                        animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                        className="w-2/3 h-[1px] bg-white transition-all"
                    ></motion.div>
                    <motion.div
                        animate={isMobileMenuOpen ? { rotate: -45, y: -6, width: "100%" } : { rotate: 0, y: 0, width: "100%" }} // Adjusted width logic for symmetry 
                        className="w-full h-[1px] bg-white origin-center transition-all"
                    ></motion.div>
                </div>
            </motion.nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: "-100%" }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: "-100%" }}
                        transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
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
