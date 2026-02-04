import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ASSETS } from '../../config/assets';
import usePerformance from '../../hooks/usePerformance';

const MobileHero = () => {
    const [showText, setShowText] = useState(false);
    const { isHighPerformance } = usePerformance();

    // Adaptive Video Source: high-end phones get HQ, others get standard
    const videoSrc = isHighPerformance && ASSETS.HERO.VIDEO_HQ
        ? ASSETS.HERO.VIDEO_HQ
        : ASSETS.HERO.VIDEO;

    useEffect(() => {
        // Delay text appearance to let background settle
        const timer = setTimeout(() => setShowText(true), 1500);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="relative w-full h-full overflow-hidden bg-black">
            {/* Background Video */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-black/40 z-10" /> {/* Dimming Overlay */}
                <video
                    src={videoSrc}
                    poster={ASSETS.HERO.POSTER}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Content centered vertically */}
            <div className="relative z-20 w-full h-full flex flex-col items-center justify-center px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={showText ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                >
                    <p className="text-[10px] uppercase tracking-[0.4em] text-gray-300 mb-4 font-light">
                        Architectural Visualization
                    </p>
                    <h1 className="text-5xl font-conneqt text-white leading-tight mb-2">
                        STHYRA
                    </h1>
                    <div className="w-12 h-[1px] bg-[#d4af37] mx-auto mt-6 opacity-80" />
                </motion.div>
            </div>

            {/* Scroll Hint (Bottom) - Replaces the global one that might be hidden */}
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 opacity-60">
                <span className="text-[9px] uppercase tracking-widest text-white/70">Explore</span>
                <div className="w-[1px] h-10 bg-gradient-to-b from-white/0 via-white to-white/0 animate-pulse" />
            </div>
        </div>
    );
};

export default MobileHero;
