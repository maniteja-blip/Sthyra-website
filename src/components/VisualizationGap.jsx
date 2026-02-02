import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ASSETS } from '../config/assets';

const VisualizationGap = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Image Transitions
    const renderOpacity = useTransform(scrollYProgress, [0.4, 0.6], [0, 1]);
    const planOpacity = useTransform(scrollYProgress, [0.4, 0.6], [1, 0]);

    // Text Animations - Adjusted timing for smoother flow
    const text1Opacity = useTransform(scrollYProgress, [0.1, 0.3, 0.45], [0, 1, 0]);
    const text2Opacity = useTransform(scrollYProgress, [0.55, 0.7, 0.9], [0, 1, 0]);

    return (
        <div ref={containerRef} className="relative h-[300vh] bg-[#050505]">

            <div className="sticky top-0 w-full h-screen flex flex-col md:flex-row overflow-hidden">

                {/* RIGHT SIDE: IMAGES (STICKY) */}
                <div className="w-full md:w-1/2 h-1/2 md:h-full relative order-last md:order-last border-l border-white/5 flex items-center justify-center p-8 md:p-16 bg-[#080808]">

                    {/* Framed Container for Images */}
                    <div className="relative w-full h-full max-h-[80vh] border border-[#d4af37]/20 flex items-center justify-center overflow-hidden bg-black/50 backdrop-blur-sm">

                        {/* Floor Plan Layer */}
                        <motion.div
                            className="absolute inset-0 flex items-center justify-center"
                            style={{ opacity: planOpacity }}
                        >
                            <img
                                src={ASSETS.VIS_GAP.FLOOR_PLAN}
                                alt="Architectural 2D floor plan blueprint"
                                className="w-full h-full object-cover"
                            />
                        </motion.div>

                        {/* Render Layer */}
                        <motion.div
                            className="absolute inset-0 flex items-center justify-center"
                            style={{ opacity: renderOpacity }}
                        >
                            <img
                                src={ASSETS.VIS_GAP.RENDER}
                                alt="Photorealistic 3D interior visualization living room"
                                className="w-full h-full object-cover"
                            />
                        </motion.div>
                    </div>

                </div>

                {/* LEFT SIDE: TEXT CONTENT (Center Aligned) */}
                <div className="w-full md:w-1/2 h-1/2 md:h-full relative flex items-center justify-center bg-[#0a0a0a] px-8 md:px-20 z-10">

                    {/* Floating Instructions */}


                    {/* Text 1: The Old Way matches the Floor Plan */}
                    <motion.div
                        className="absolute w-[85%] max-w-lg"
                        style={{ opacity: text1Opacity }}
                    >
                        <h2 className="text-4xl md:text-6xl font-serif text-gray-500 mb-6 font-light">
                            The Gap Between Blueprint and Buys
                        </h2>
                        <p className="text-lg text-gray-400 leading-relaxed font-light">
                            Friction exists in the imagination. Technical drawings and static renders leave value on the table. <br />
                            We remove the guesswork.
                        </p>
                    </motion.div>

                    {/* Text 2: The New Way matches the Render */}
                    <motion.div
                        className="absolute w-[85%] max-w-lg"
                        style={{ opacity: text2Opacity }}
                    >
                        <h2 className="text-4xl md:text-6xl font-serif text-white mb-6 font-light">
                            The Sthyra Way
                        </h2>
                        <p className="text-lg text-[#d4af37] leading-relaxed font-light">
                            We convert technical plans into emotion. <br />
                            A photorealistic promise of the life they will live.
                        </p>
                    </motion.div>

                </div>

            </div>
        </div>
    );
};

export default VisualizationGap;
