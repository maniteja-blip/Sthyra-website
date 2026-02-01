import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { ASSETS } from '../config/assets';

const Belief = () => {
    const containerRef = useRef(null);
    const videoRef = useRef(null);
    const [videoLoaded, setVideoLoaded] = useState(false);
    const isInView = useInView(containerRef, { margin: "0px 0px -20% 0px" }); // Trigger a bit earlier/later

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    // Optimize play/pause based on visibility
    useEffect(() => {
        if (videoRef.current && videoLoaded) {
            if (isInView) {
                videoRef.current.play().catch(e => { });
            } else {
                videoRef.current.pause();
            }
        }
    }, [isInView, videoLoaded]);

    // Parallax Effect for Background
    const y = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);
    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1, 1.1]);
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

    // Text Animations
    const textY = useTransform(scrollYProgress, [0.2, 0.5], [100, 0]);
    const textOpacity = useTransform(scrollYProgress, [0.2, 0.4, 0.6, 0.8], [0, 1, 1, 0]);

    return (
        <section id="belief" ref={containerRef} className="relative h-[120vh] flex items-center justify-center overflow-hidden bg-[#050505]">

            {/* Parallax Background Layer */}
            <motion.div
                className="absolute inset-0 w-full h-full will-change-transform"
                style={{ opacity }}
            >
                <motion.video
                    ref={videoRef}
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${videoLoaded ? 'opacity-100' : 'opacity-0'}`}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    onLoadedData={() => setVideoLoaded(true)}
                    style={{
                        y,
                        scale
                    }}
                >
                    <source src={ASSETS.BELIEF.VIDEO_MOBILE} media="(max-width: 767px)" />
                    <source src={ASSETS.BELIEF.VIDEO_DESKTOP} type="video/mp4" />
                </motion.video>
                {/* Simple Dark Overlay like Hero Section */}
                <div className="absolute inset-0 bg-black/40" />

            </motion.div>

            {/* Content Layer */}
            <div className="relative z-10 text-center px-6 max-w-5xl mx-auto mix-blend-normal">
                <motion.div style={{ y: textY, opacity: textOpacity }}>
                    <p className="text-[#d4af37] tracking-[0.3em] text-xs md:text-sm uppercase mb-6 font-medium">
                        The Philosophy
                    </p>

                    <h2 className="text-4xl md:text-7xl lg:text-8xl font-serif text-white mb-8 leading-tight tracking-tight">
                        Clarity Creates <br />
                        <span className="italic font-light opacity-90 text-white">Confidence.</span>
                    </h2>

                    <p className="md:text-xl text-gray-200 font-light leading-relaxed max-w-2xl mx-auto opacity-90">
                        When people see clearly, they trust the space instantly.
                        <br className="hidden md:block" />
                        We replace "imagine" with "experience."
                    </p>
                </motion.div>
            </div>

        </section>
    );
};

export default Belief;
