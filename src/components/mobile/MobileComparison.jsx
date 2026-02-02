import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { ASSETS } from '../../config/assets';

const MobileComparison = () => {
    // 50% start position
    const [sliderPos, setSliderPos] = useState(50);
    const containerRef = useRef(null);
    const isDragging = useRef(false);

    const handleDrag = (event, info) => {
        if (!containerRef.current) return;
        const { width, left } = containerRef.current.getBoundingClientRect();
        // Calculate percentage based on touch/mouse x pointer
        // info.point.x is page relative. We need relative to container.
        // Actually framer motion drag on a constrained element is easier for the button.
    };

    // Simpler approach: Draggable Handle
    // We track the x position of the handle and update the clip path of the top image.

    // Let's use a 0-100 state controlled by the handle position relative to constraints.
    const x = useMotionValue(0);
    // We need to measure width to map x to %. 
    // Instead of complex measuring, let's use a dedicated "Drag Control" approach.

    return (
        <div className="relative w-full h-full bg-black overflow-hidden flex flex-col pointer-events-auto">
            {/* Added pointer-events-auto to ensure it traps touches if needed, though usually default */}

            {/* Header */}
            <div className="absolute top-8 left-0 right-0 z-20 text-center pointer-events-none">
                <p className="text-[10px] uppercase tracking-[0.3em] text-white/50">The Difference</p>
            </div>

            <div
                ref={containerRef}
                className="relative flex-1 w-full h-full"
            // Interactive container for simple tap-to-move (optional) or just contain the slider
            >
                {/* 1. RIGHT SIDE IMAGE (Background) - STHYRA WAY (Render) */}
                {/* User said "Right side we have sthyra render". In a slider, the base image is full. */}
                <div className="absolute inset-0 w-full h-full">
                    <img
                        src={ASSETS.VIS_GAP.RENDER}
                        alt="Sthyra Way"
                        className="w-full h-full object-cover"
                    />
                    {/* Label for Right Side */}
                    <div className="absolute bottom-32 right-6 text-right pointer-events-none">
                        <span className="bg-black/50 backdrop-blur-md px-3 py-1 text-[10px] text-[#d4af37] border border-[#d4af37]/30 rounded-full font-bold uppercase tracking-widest">
                            Sthyra Way
                        </span>
                    </div>
                </div>

                {/* 2. LEFT SIDE IMAGE (Foreground, Clipped) - OLD WAY (Floor Plan) */}
                <motion.div
                    className="absolute inset-0 w-full h-full overflow-hidden"
                    style={{
                        // Clip from the right side based on slider position
                        // if slider is at 50%, we show 50% of this image (left half).
                        clipPath: `inset(0 ${100 - sliderPos}% 0 0)`
                    }}
                >
                    <img
                        src={ASSETS.VIS_GAP.FLOOR_PLAN}
                        alt="Old Way"
                        className="w-full h-full object-cover brightness-75"
                    // Keep image static size, just clip the container
                    />

                    {/* Label for Left Side */}
                    <div className="absolute top-32 left-6 pointer-events-none">
                        <span className="bg-white/10 backdrop-blur-md px-3 py-1 text-[10px] text-white/70 border border-white/20 rounded-full font-bold uppercase tracking-widest">
                            Old Way
                        </span>
                    </div>

                    {/* Darkener overlay to make the plan look more "blueprinty" and contrast with the vivid render */}
                    <div className="absolute inset-0 bg-blue-900/20 mix-blend-overlay pointer-events-none" />
                </motion.div>

                {/* 3. SLIDER HANDLE & LINE */}
                <div
                    className="absolute inset-y-0"
                    style={{ left: `${sliderPos}%` }}
                >
                    {/* Vertical Line */}
                    <div className="absolute inset-y-0 -left-[1px] w-[2px] bg-white shadow-[0_0_10px_rgba(0,0,0,0.5)]" />

                    {/* Draggable Button */}
                    <motion.div
                        className="absolute top-1/2 -translate-y-1/2 -left-6 w-12 h-12 rounded-full bg-white shadow-xl flex items-center justify-center z-30 cursor-grab active:cursor-grabbing touch-none"
                        drag="x"
                        dragConstraints={containerRef} // This is tricky, we want the button to generally follow finger but lock to the sliderPos logic. 
                        // Better approach: Make the handle drag update the state.
                        dragElastic={0}
                        dragMomentum={false}
                        onDrag={(event, info) => {
                            if (!containerRef.current) return;
                            const rect = containerRef.current.getBoundingClientRect();
                            // info.point.x is global. 
                            // clamp between 0 and rect.width
                            const x = Math.max(0, Math.min(info.point.x - rect.left, rect.width));
                            const percentage = (x / rect.width) * 100;
                            setSliderPos(percentage);
                        }}
                    >
                        {/* Arrows Icon */}
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2">
                            <path d="M15 18l-6-6 6-6" fill="black" stroke="none" transform="translate(-4, 0) scale(0.8)" />
                            <path d="M9 18l6-6-6-6" fill="black" stroke="none" transform="translate(4, 0) scale(0.8)" />
                            {/* Simple arrows */}
                            <path d="M14 8l-4 4 4 4" stroke="black" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M10 8l4 4-4 4" stroke="black" strokeLinecap="round" strokeLinejoin="round" transform="rotate(180 12 12)" />
                        </svg>
                        <div className="absolute inset-0 rounded-full border-4 border-white/30 animate-pulse" />
                    </motion.div>
                </div>

                {/* Education / Hint */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2, duration: 1 }}
                    className="absolute bottom-12 left-0 right-0 text-center pointer-events-none z-10"
                >
                    <p className="text-[9px] uppercase tracking-widest text-white/60">Drag to Compare</p>
                </motion.div>

            </div>
        </div>
    );
};

export default MobileComparison;
