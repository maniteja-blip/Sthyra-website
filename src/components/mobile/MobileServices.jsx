import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ASSETS } from '../../config/assets';

const services = [
    {
        id: 0,
        title: "Interactive Web",
        subtitle: "Immersive Web",
        desc: "Turn passive viewing into active exploration.",
        image: ASSETS.SERVICES.MOBILE_INTERACTIVE,
        color: "#d4af37"
    },
    {
        id: 1,
        title: "Cinematic Films",
        subtitle: "Emotional Story",
        desc: "Architecture in motion, directed with soul.",
        image: ASSETS.SERVICES.CINEMATIC,
        color: "#fea768"
    },
    {
        id: 2,
        title: "Ultra-Real Renders",
        subtitle: "Precision Detail",
        desc: "Indistinguishable from reality, pixel perfect.",
        image: ASSETS.SERVICES.ULTRA_REAL,
        color: "#a0a0a0"
    },
    {
        id: 3,
        title: "Pixel Streaming",
        subtitle: "Real-Time Cloud",
        desc: "Walk through unbuilt spaces instantly on any device.",
        image: ASSETS.SERVICES.MOBILE_PIXEL,
        color: "#ffffff"
    },
    {
        id: 4,
        title: "VR & AR Immersion",
        subtitle: "Pre-construction",
        desc: "Pre-construction sales tools for deep immersion.",
        image: ASSETS.SERVICES.VR,
        color: "#d4af37"
    }
];

const MobileServices = () => {
    const [index, setIndex] = useState(0);
    const DURATION = 5000; // 5 seconds per slide

    useEffect(() => {
        const timer = setTimeout(() => {
            if (index < services.length - 1) {
                setIndex(prev => prev + 1);
            }
        }, DURATION);

        return () => clearTimeout(timer);
    }, [index]);

    return (
        <div className="relative w-full h-full bg-[#050505] overflow-hidden">

            {/* Tap Navigation Layer - Invisible 50/50 Split */}
            <div className="absolute inset-0 z-30 flex">
                <div
                    className="w-1/2 h-full"
                    onClick={() => index > 0 && setIndex(index - 1)}
                />
                <div
                    className="w-1/2 h-full"
                    onClick={() => index < services.length - 1 && setIndex(index + 1)}
                />
            </div>

            {/* Left Button - Premium Glass Pill */}
            {/* Left Button - Premium Glass Pill */}
            <div
                className={`absolute left-4 top-[65%] -translate-y-1/2 z-40 pointer-events-auto transition-opacity duration-300 ${index > 0 ? 'opacity-100' : 'opacity-0'}`}
                onClick={() => index > 0 && setIndex(index - 1)}
            >
                <div className="w-12 h-12 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 flex items-center justify-center active:scale-95 transition-all shadow-[0_0_20px_rgba(255,255,255,0.05)]">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
                        <path d="M15 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
            </div>

            {/* Right Button - Premium Glass Pill */}
            <div
                className={`absolute right-4 top-[65%] -translate-y-1/2 z-40 pointer-events-auto transition-opacity duration-300 ${index < services.length - 1 ? 'opacity-100' : 'opacity-0'}`}
                onClick={() => index < services.length - 1 && setIndex(index + 1)}
            >
                <div className="w-12 h-12 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 flex items-center justify-center active:scale-95 transition-all shadow-[0_0_20px_rgba(255,255,255,0.05)]">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
                        <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
            </div>

            {/* Top Progress Bars */}
            <div className="absolute top-24 left-4 right-4 z-30 flex gap-2 pointer-events-none">
                {services.map((_, i) => (
                    <div key={i} className="h-[2px] flex-1 bg-white/20 rounded-full overflow-hidden">
                        <motion.div
                            key={`${i}-${index}-${i === index}`} // Force reset on change
                            className="h-full bg-white"
                            initial={{ width: i < index ? "100%" : "0%" }}
                            animate={{ width: i < index ? "100%" : (i === index ? "100%" : "0%") }}
                            transition={{
                                duration: i === index ? DURATION / 1000 : 0,
                                ease: "linear"
                            }}
                        />
                    </div>
                ))}
            </div>

            <AnimatePresence mode="wait" initial={false}>
                <motion.div
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0 w-full h-full pointer-events-none"
                >
                    {/* Background Image */}
                    <div className="absolute inset-0 w-full h-full">
                        <img
                            src={services[index].image}
                            alt={services[index].title}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                    </div>

                    {/* Content */}
                    <div className="absolute bottom-52 left-8 right-8 z-10">
                        <motion.span
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.1 }}
                            className="block text-xs font-bold tracking-widest uppercase mb-2"
                            style={{ color: services[index].color }}
                        >
                            0{index + 1} / 0{services.length} — {services[index].subtitle}
                        </motion.span>

                        <motion.h2
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="text-4xl font-serif text-white mb-4 leading-none"
                        >
                            {services[index].title}
                        </motion.h2>

                        <motion.p
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="text-sm text-gray-300 font-light leading-relaxed max-w-xs"
                        >
                            {services[index].desc}
                        </motion.p>
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

export default MobileServices;
