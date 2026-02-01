import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

const Preloader = ({ onComplete }) => {

    useEffect(() => {
        // Total duration of animation is roughly 2.5 - 3 seconds
        // We trigger onComplete slightly before the exit animation finishes to allow App to remove it smoothly
        const timer = setTimeout(() => {
            onComplete();
        }, 2800);

        return () => clearTimeout(timer);
    }, [onComplete]);

    return (
        <div className="fixed inset-0 z-[100] pointer-events-none flex flex-col">
            {/* Top Shutter */}
            <motion.div
                initial={{ height: "50vh" }}
                animate={{ height: 0 }}
                transition={{ duration: 0.8, delay: 2.0, ease: [0.76, 0, 0.24, 1] }}
                className="w-full bg-[#0a0a0a] border-b border-[#d4af37]/20 relative z-20 flex items-end justify-center overflow-hidden"
            >
                {/* Logo/Text attached to top shutter */}
                <motion.div
                    className="mb-8 overflow-hidden"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }} // Fade out before split? No, let it move up.
                    transition={{ duration: 0.5 }}
                >
                    <motion.h1
                        className="text-6xl md:text-8xl font-serif text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500"
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 1, delay: 0.2 }}
                    >
                        STHYRA
                    </motion.h1>
                </motion.div>
            </motion.div>

            {/* Bottom Shutter */}
            <motion.div
                initial={{ height: "50vh" }}
                animate={{ height: 0 }}
                transition={{ duration: 0.8, delay: 2.0, ease: [0.76, 0, 0.24, 1] }}
                className="w-full bg-[#0a0a0a] border-t border-[#d4af37]/20 relative z-20 flex items-start justify-center overflow-hidden"
            >
                <motion.p
                    className="mt-8 text-xs uppercase tracking-[0.5em] text-[#d4af37]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.8 }}
                >
                    Redefining Reality
                </motion.p>
            </motion.div>

            {/* The Golden Line */}
            <motion.div
                className="absolute top-1/2 left-0 right-0 h-[1px] bg-[#d4af37] z-30"
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{
                    scaleX: [0, 1, 1],
                    opacity: [0, 1, 0] // Fade out as it splits
                }}
                transition={{
                    duration: 2.0,
                    times: [0, 0.5, 1], // Draw fast, hold, fade
                    ease: "easeInOut"
                }}
            />
        </div>
    );
};

export default Preloader;
