import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MobileHero from './mobile/MobileHero';
import MobileComparison from './mobile/MobileComparison';
import MobileBelief from './mobile/MobileBelief';
import MobileServices from './mobile/MobileServices';
import MobileWhySthyra from './mobile/MobileWhySthyra';
import MobileProjects from './mobile/MobileProjects';
import MobileContact from './mobile/MobileContact';
import { ASSETS } from '../config/assets';

const sections = [
    { id: 'hero', component: <MobileHero /> },
    { id: 'comparison', component: <MobileComparison /> },
    { id: 'belief', component: <MobileBelief /> },
    { id: 'services', component: <MobileServices /> },
    { id: 'why-sthyra', component: <MobileWhySthyra /> },
    { id: 'projects', component: <MobileProjects /> },
    { id: 'contact', component: <MobileContact /> }
];

const MobileView = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);

    const handleDragEnd = (event, info) => {
        const threshold = 50; // Drag pixel distance to trigger change
        if (info.offset.y < -threshold) {
            // Swipe Up -> Next
            if (currentIndex < sections.length - 1) {
                setDirection(1);
                setCurrentIndex(prev => prev + 1);
            }
        } else if (info.offset.y > threshold) {
            // Swipe Down -> Previous
            if (currentIndex > 0) {
                setDirection(-1);
                setCurrentIndex(prev => prev - 1);
            }
        }
    };

    // Listen for Navbar navigation events
    React.useEffect(() => {
        const handleNavigation = (e) => {
            const targetId = e.detail?.targetId;
            const index = sections.findIndex(s => s.id === targetId);
            if (index !== -1) {
                setDirection(index > currentIndex ? 1 : -1);
                setCurrentIndex(index);
            }
        };

        window.addEventListener('navigateToMobileSection', handleNavigation);
        return () => window.removeEventListener('navigateToMobileSection', handleNavigation);
    }, [currentIndex]); // Depend on currentIndex for direction calculation logic if needed, though mostly okay without it


    const variants = {
        enter: (direction) => ({
            y: direction > 0 ? '100%' : '-100%',
            scale: 1,
            opacity: 1,
            zIndex: 3,
            filter: 'brightness(1)'
        }),
        center: {
            y: 0,
            scale: 1,
            opacity: 1,
            zIndex: 2,
            filter: 'brightness(1)',
            transition: {
                y: { type: "spring", stiffness: 300, damping: 30 },
                scale: { duration: 0.4 },
                filter: { duration: 0.4 }
            }
        },
        exit: (direction) => ({
            y: direction > 0 ? '-20%' : '20%', // Parallax move slightly
            scale: 0.9, // Scale down to create depth
            opacity: 0.5, // Fade out to focus on new slide
            zIndex: 0,
            filter: 'brightness(0.5)', // Darken
            transition: {
                y: { type: "spring", stiffness: 300, damping: 30 },
                scale: { duration: 0.4 },
                opacity: { duration: 0.4 },
                filter: { duration: 0.4 }
            }
        })
    };

    return (
        <div className="fixed inset-0 bg-[#050505] overflow-hidden touch-none h-screen w-screen">

            {/* PERSISTENT LOGO HEADER - Click to go Home */}
            <div
                className="fixed top-7 right-8 z-[60] cursor-pointer"
                onClick={() => setCurrentIndex(0)}
            >
                <img
                    src={ASSETS.GLOBAL.LOGO}
                    alt="Sthyra"
                    className="w-24 md:w-32 h-auto object-contain filter invert brightness-0 drop-shadow-md"
                />
            </div>

            <AnimatePresence initial={false} custom={direction} mode="popLayout">
                <motion.div
                    key={currentIndex}
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    drag="y"
                    dragConstraints={{ top: 0, bottom: 0 }}
                    dragElastic={0.2}
                    onDragEnd={handleDragEnd}
                    className="absolute inset-0 w-full h-full"
                >
                    {/* Render the active component */}
                    <div className="w-full h-full overflow-hidden">
                        {sections[currentIndex].component}
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* Navigation Dots / Progress */}
            <div className="fixed right-4 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-50 pointer-events-none">
                {sections.map((_, idx) => (
                    <div
                        key={idx}
                        className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${idx === currentIndex ? 'bg-[#d4af37] scale-125' : 'bg-white/20'}`}
                    />
                ))}
            </div>



            {/* Persistent Scroll Indicator (Hidden on Last "Contact/Footer" Section) */}
            {currentIndex < sections.length - 1 && (
                <div className="fixed bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-60 pointer-events-none z-40 animate-bounce">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-white">Scroll</span>
                    <div className="w-[1px] h-8 bg-gradient-to-b from-white/0 via-white to-white/0"></div>
                </div>
            )}
        </div>
    );
};

export default MobileView;
