import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ASSETS } from '../../config/assets';

const projects = [
    {
        id: 1,
        title: "Aadhya Serene",
        location: "Thanisandra, Bangalore",
        image: ASSETS.PROJECTS.AADHYA_SERENE,
        year: "2024"
    },
    {
        id: 2,
        title: "Skyline Avenue",
        location: "Coming Soon",
        image: ASSETS.PROJECTS.SKYLINE,
        year: "2025"
    }
];

const MobileProjects = () => {
    const [index, setIndex] = useState(0);

    const handleDragEnd = (_, info) => {
        if (info.offset.x < -50 && index < projects.length - 1) {
            setIndex(index + 1);
        } else if (info.offset.x > 50 && index > 0) {
            setIndex(index - 1);
        }
    };

    return (
        <div className="relative w-full h-full bg-[#050505] overflow-hidden">

            {/* Header / Counter - Moved down to clear Nav/Logo */}
            <div className="absolute top-24 left-0 right-0 z-20 px-8 flex justify-between items-center pointer-events-none">
                <span className="text-[10px] uppercase tracking-[0.3em] text-white/70">Selected Works</span>
                <span className="text-[10px] font-mono text-[#d4af37]">0{index + 1} / 0{projects.length}</span>
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
                className={`absolute right-4 top-[65%] -translate-y-1/2 z-40 pointer-events-auto transition-opacity duration-300 ${index < projects.length - 1 ? 'opacity-100' : 'opacity-0'}`}
                onClick={() => index < projects.length - 1 && setIndex(index + 1)}
            >
                <div className="w-12 h-12 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 flex items-center justify-center active:scale-95 transition-all shadow-[0_0_20px_rgba(255,255,255,0.05)]">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
                        <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
            </div>

            <AnimatePresence mode="wait" initial={false}>
                <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }} // Subtle slide effect
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0 w-full h-full"
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.2}
                    onDragEnd={handleDragEnd}
                    onTap={(event, info) => {
                        const width = window.innerWidth;
                        if (info.point.x < width / 2) {
                            if (index > 0) setIndex(index - 1);
                        } else {
                            if (index < projects.length - 1) setIndex(index + 1);
                        }
                    }}
                >
                    {/* Background Image */}
                    <div className="absolute inset-0 w-full h-full">
                        <motion.img
                            src={projects[index].image}
                            alt={projects[index].title}
                            className="w-full h-full object-cover"
                            initial={{ scale: 1.1 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 10, ease: "linear" }} // Slow subtle zoom
                        />
                        {/* Cinematic Overlay - Bottom Gradient for Text */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90" />
                        <div className="absolute inset-0 bg-black/20" /> {/* General dim */}
                    </div>

                    {/* Content */}
                    <div className="absolute bottom-48 left-8 right-8 z-10 pointer-events-none">
                        <motion.div
                            initial={{ y: 30, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2, duration: 0.8 }}
                        >
                            {/* Year removed as per request */}
                            {/* <div className="flex items-center gap-3 mb-4">
                                <span className="h-[1px] w-8 bg-[#d4af37]" />
                                <span className="text-[#d4af37] text-xs uppercase tracking-widest">{projects[index].year}</span>
                            </div> */}

                            <h2 className="text-4xl md:text-5xl font-serif text-white mb-2 leading-tight">
                                {projects[index].title}
                            </h2>
                            <p className="text-gray-300 text-sm font-light tracking-wide opacity-80">
                                {projects[index].location}
                            </p>
                        </motion.div>
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* Progress / Navigation Lines */}
            <div className="absolute bottom-36 left-8 right-8 flex gap-2 z-20 pointer-events-none">
                {projects.map((_, i) => (
                    <div
                        key={i}
                        className="h-[2px] flex-1 bg-white/10 overflow-hidden relative"
                    >
                        {/* Active Progress Filler */}
                        {i === index && (
                            <motion.div
                                className="absolute inset-y-0 left-0 bg-[#d4af37]"
                                initial={{ width: "0%" }}
                                animate={{ width: "100%" }}
                                transition={{ duration: 5, ease: "linear" }} // Auto-play feel (fake) or just fill
                            />
                        )}
                        {i < index && <div className="absolute inset-0 bg-white/50" />}
                    </div>
                ))}
            </div>

            {/* Swipe Hint */}
            <div className="absolute bottom-26 right-8 text-white/40 text-[9px] uppercase tracking-widest pointer-events-none">
                Swipe to View
            </div>

        </div>
    );
};

export default MobileProjects;
