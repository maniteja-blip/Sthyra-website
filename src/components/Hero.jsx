import React, { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ASSETS } from '../config/assets';
import usePerformance from '../hooks/usePerformance';

const Hero = () => {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const isInView = useInView(containerRef);
  const navigate = useNavigate();
  const { tier } = usePerformance();
  const isHighPerformance = tier === 'high';
  const isLowPerformance = tier === 'low';

  // Adaptive Video Source: Use HQ if system is capable, otherwise standard
  const videoSrc = isHighPerformance && ASSETS.HERO.VIDEO_HQ
    ? ASSETS.HERO.VIDEO_HQ
    : ASSETS.HERO.VIDEO;

  useEffect(() => {
    if (videoRef.current) {
      if (isInView) {
        videoRef.current.play().catch(e => console.log("Auto-play prevented", e));
      } else {
        videoRef.current.pause();
      }
    }
  }, [isInView]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.8; // Slow down slightly for cinematic feel
    }
  }, []);

  return (
    <section id="hero" ref={containerRef} className="relative w-full h-screen overflow-hidden">
      {/* Background Video with Slow Scale or Fallback Image */}
      <motion.div
        className="absolute inset-0 w-full h-full will-change-transform"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 10, ease: "easeOut" }}
      >
        {isLowPerformance ? (
          <video
            className="absolute inset-0 w-full h-full object-cover opacity-80"
            autoPlay
            muted
            loop
            playsInline
          >
            <source src={ASSETS.HERO.VIDEO_WEBM} type="video/webm" />
          </video>
        ) : (
          <video
            ref={videoRef}
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            poster={ASSETS.HERO.POSTER}
          >
            <source src={videoSrc} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}
        <div className="absolute inset-0 bg-black/30" /> {/* Dim overlay */}
      </motion.div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
        <motion.h1
          className="text-4xl md:text-7xl lg:text-8xl tracking-tight mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
        >
          Live the Space.<br />
          <span className="italic font-light opacity-90">Before It Exists.</span>
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl font-light max-w-2xl opacity-80 mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.8, ease: "easeOut" }}
        >
          We bridge the gap between blueprint and reality. Immersive, interactive, and indistinguishable from the physical world. Sell your vision with absolute confidence.
        </motion.p>


        <motion.div
          className="flex flex-col md:flex-row gap-4 md:gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 1.1, ease: "easeOut" }}
        >
          <button
            onClick={() => navigate('/contact')}
            className="px-8 py-4 bg-[#f0f0f0] text-[#0a0a0a] text-sm uppercase tracking-widest hover:bg-white transition-colors cursor-pointer"
          >
            Request Live Demo
          </button>
          <button
            onClick={() => {
              const element = document.getElementById('case-study');
              if (element) element.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-8 py-4 border border-[#f0f0f0]/30 text-[#f0f0f0] text-sm uppercase tracking-widest hover:bg-[#f0f0f0]/10 transition-colors cursor-pointer"
          >
            Explore Experience
          </button>
        </motion.div>

        {/* Scroll Down Indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer opacity-80"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{
            opacity: { delay: 2, duration: 1 },
            y: { repeat: Infinity, duration: 1.5, ease: "easeInOut" }
          }}
          onClick={() => {
            const visualizationGap = document.getElementById('visualization-gap'); // Assuming next section is VisualizationGap or similar
            if (visualizationGap) visualizationGap.scrollIntoView({ behavior: 'smooth' });
            // Fallback to scrolling by window height if ID not found, or use 'belief' as user mentioned beliefs next to projects/services
            else window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
          }}
        >
          <span className="text-[10px] uppercase tracking-[0.2em] text-white/70">Scroll Down</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-white/0 via-white/50 to-white/0"></div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
