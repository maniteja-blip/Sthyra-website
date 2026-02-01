import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ASSETS } from '../config/assets';

const narrativeSteps = [
    {
        id: 1,
        title: "Sell Before You Build",
        desc: "Even before construction, this already feels real. Validate the market with photorealism.",
        image: ASSETS.WHY_STHYRA.IMAGE_1,
        color: "#1a1a1a"
    },
    {
        id: 2,
        title: "Eliminate Confusion",
        desc: "No imagination required. Everything is clear. No visual noise, just pure clarity.",
        image: ASSETS.WHY_STHYRA.IMAGE_2,
        color: "#222222"
    },
    {
        id: 3,
        title: "Faster Decisions",
        desc: "When people feel the space, they decide faster. Confidence drives faster closing.",
        image: ASSETS.WHY_STHYRA.IMAGE_3,
        color: "#2a2a2a"
    },
    {
        id: 4,
        title: "Premium Brand",
        desc: "This looks a tier above. Position your project as timeless, confident, and premium.",
        image: ASSETS.WHY_STHYRA.IMAGE_4,
        color: "#333333"
    }
];

const Card = ({ i, step, progress, range, targetScale }) => {
    const container = useRef(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ['start end', 'start start']
    });

    const imageScale = useTransform(scrollYProgress, [0, 1], [1.2, 1]); // Parallax image inside card
    const scale = useTransform(progress, range, [1, targetScale]);

    return (
        <div ref={container} className="h-screen flex items-center justify-center sticky top-0">
            <motion.div
                className="relative flex flex-col md:flex-row w-[90vw] md:w-[1000px] h-[60vh] md:h-[500px] rounded-3xl overflow-hidden border border-white/10 shadow-2xl origin-top"
                style={{
                    backgroundColor: step.color,
                    scale,
                    top: `calc(-5vh + ${i * 25}px)`
                }}
            >
                {/* Text Side */}
                <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center relative z-10">
                    <div className="inline-block px-3 py-1 rounded-full border border-[#d4af37]/30 text-[#d4af37] text-xs tracking-widest uppercase mb-6 w-fit">
                        Reason 0{step.id}
                    </div>
                    <h2 className="text-3xl md:text-5xl font-serif text-white mb-6 leading-tight">
                        {step.title}
                    </h2>
                    <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                        {step.desc}
                    </p>
                </div>

                {/* Image Side */}
                <div className="w-full md:w-1/2 h-full relative overflow-hidden">
                    <motion.div
                        className="w-full h-full"
                        style={{ scale: imageScale }}
                    >
                        <img
                            src={step.image}
                            alt={step.title}
                            className="w-full h-full object-cover"
                        />
                        {/* Inner Shadow for depth */}
                        <div className="absolute inset-0 bg-gradient-to-r from-[#1a1a1a] via-transparent to-transparent opacity-50" />
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
};

const WhySthyra = () => {
    const container = useRef(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ['start start', 'end end']
    });

    return (
        <section ref={container} id="why-sthyra" className="relative bg-[#050505]">
            {/* Main Title Intro (Scrolls away) */}
            <div className="min-h-[50vh] flex items-center justify-center sticky top-0 z-0">
                <div className="text-center">
                    <p className="text-[#d4af37] tracking-[0.3em] uppercase text-xs mb-4">The Advantage</p>
                    <h2 className="text-5xl md:text-7xl font-serif text-white">Why Sthyra?</h2>
                </div>
            </div>

            {/* Cards Container */}
            <div className="relative z-10 pb-[20vh]"> {/* Padding bottom to unstick last card */}
                {narrativeSteps.map((step, i) => {
                    // targetScale logic: each card gets slightly smaller than the one before it as it goes up
                    // to creates a "stack" depth effect at the top
                    const targetScale = 1 - ((narrativeSteps.length - i) * 0.05);

                    return (
                        <Card
                            key={step.id}
                            i={i}
                            step={step}
                            progress={scrollYProgress}
                            range={[i * 0.25, 1]}
                            targetScale={targetScale}
                        />
                    );
                })}
            </div>
        </section>
    );
};

export default WhySthyra;
