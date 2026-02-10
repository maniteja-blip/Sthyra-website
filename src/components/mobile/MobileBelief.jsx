import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { ASSETS } from '../../config/assets';
import usePerformance from '../../hooks/usePerformance';

const MobileBelief = () => {
    const videoRef = useRef(null);
    const containerRef = useRef(null);
    const isInView = useInView(containerRef, { margin: "0px 0px -20% 0px" });
    const [videoLoaded, setVideoLoaded] = useState(false);
    const { tier } = usePerformance();
    const isLowPerformance = tier === 'low';

    useEffect(() => {
        if (!isLowPerformance && videoRef.current && videoLoaded) {
            if (isInView) {
                videoRef.current.play().catch(() => { });
            } else {
                videoRef.current.pause();
            }
        }
    }, [isInView, videoLoaded, isLowPerformance]);

    return (
        <div ref={containerRef} className="relative w-full h-full flex items-center justify-center overflow-hidden bg-[#050505]">

            {/* Background Video or Fallback Image */}
            <div className="absolute inset-0 z-0">
                {/* Always use WebM for Mobile */}
                <video
                    className="w-full h-full object-cover opacity-80"
                    autoPlay
                    muted
                    loop
                    playsInline
                >
                    <source src={ASSETS.BELIEF.VIDEO_WEBM} type="video/webm" />
                </video>
                <div className="absolute inset-0 bg-black/40" />
            </div>

            {/* Content */}
            <div className="relative z-10 text-center px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 1, delay: 0.2 }}
                >
                    <p className="text-[#d4af37] tracking-[0.3em] text-[10px] uppercase mb-6 font-medium">
                        The Philosophy
                    </p>

                    <h2 className="text-4xl font-serif text-white mb-6 leading-tight">
                        Clarity Creates <br />
                        <span className="italic font-light opacity-90">Confidence.</span>
                    </h2>

                    <p className="text-sm text-gray-200 font-light leading-relaxed opacity-90 max-w-xs mx-auto">
                        When people see clearly, they trust the space instantly.
                        We replace "imagine" with "experience."
                    </p>
                </motion.div>
            </div>
        </div>
    );
};

export default MobileBelief;
