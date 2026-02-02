import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ASSETS } from '../../config/assets';

const reasons = [
    {
        id: 1,
        title: "Sell Before You Build",
        desc: "Even before construction, this already feels real. Validate the market with photorealism.",
        image: ASSETS.WHY_STHYRA.IMAGE_1
    },
    {
        id: 2,
        title: "Eliminate Confusion",
        desc: "No imagination required. Everything is clear. No visual noise, just pure clarity.",
        image: ASSETS.WHY_STHYRA.IMAGE_2
    },
    {
        id: 3,
        title: "Faster Decisions",
        desc: "When people feel the space, they decide faster. Confidence drives faster closing.",
        image: ASSETS.WHY_STHYRA.IMAGE_3
    },
    {
        id: 4,
        title: "Premium Brand",
        desc: "This looks a tier above. Position your project as timeless, confident, and premium.",
        image: ASSETS.WHY_STHYRA.IMAGE_4
    }
];

const MobileWhySthyra = () => {
    const [index, setIndex] = useState(0);
    const DURATION = 4000; // 4 seconds per slide

    useEffect(() => {
        const timer = setTimeout(() => {
            if (index < reasons.length - 1) {
                setIndex(prev => prev + 1);
            }
        }, DURATION);

        return () => clearTimeout(timer);
    }, [index]);

    return (
        <div className="relative w-full h-full bg-[#080808] overflow-hidden">

            {/* Tap Navigation Layer - Invisible 50/50 Split */}
            <div className="absolute inset-0 z-30 flex">
                <div
                    className="w-1/2 h-full"
                    onClick={() => index > 0 && setIndex(index - 1)}
                />
                <div
                    className="w-1/2 h-full"
                    onClick={() => index < reasons.length - 1 && setIndex(index + 1)}
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
                className={`absolute right-4 top-[65%] -translate-y-1/2 z-40 pointer-events-auto transition-opacity duration-300 ${index < reasons.length - 1 ? 'opacity-100' : 'opacity-0'}`}
                onClick={() => index < reasons.length - 1 && setIndex(index + 1)}
            >
                <div className="w-12 h-12 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 flex items-center justify-center active:scale-95 transition-all shadow-[0_0_20px_rgba(255,255,255,0.05)]">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
                        <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
            </div>

            {/* Top Progress Bars */}
            <div className="absolute top-24 left-4 right-4 z-30 flex gap-2 pointer-events-none">
                {reasons.map((_, i) => (
                    <div key={i} className="h-[2px] flex-1 bg-white/20 rounded-full overflow-hidden">
                        <motion.div
                            key={`${i}-${index}-${i === index}`} // Force reset on change
                            className="h-full bg-[#d4af37]"
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

            <AnimatePresence mode="wait">
                <motion.div
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6 }} // Faster crossfade
                    className="absolute inset-0 w-full h-full pointer-events-none"
                >
                    {/* Background Image */}
                    <div className="absolute inset-0 w-full h-full">
                        <motion.img
                            src={reasons[index].image}
                            className="w-full h-full object-cover"
                            alt="bg"
                        />
                        <div className="absolute inset-0 bg-black/60" />
                    </div>

                    {/* Text Container */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center px-8 text-center z-10">
                        <motion.span
                            className="text-[#d4af37] text-xs tracking-[0.3em] uppercase mb-6"
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.1 }}
                        >
                            Reason 0{reasons[index].id}
                        </motion.span>
                        <motion.h3
                            className="text-4xl font-serif text-white mb-6 leading-tight"
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                        >
                            {reasons[index].title}
                        </motion.h3>
                        <motion.p
                            className="text-gray-300 font-light leading-relaxed max-w-xs"
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.3 }}
                        >
                            {reasons[index].desc}
                        </motion.p>
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    );
}

export default MobileWhySthyra;
