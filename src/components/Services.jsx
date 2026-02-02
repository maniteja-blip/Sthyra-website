import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import { ASSETS } from '../config/assets';

const services = [
    {
        id: 1,
        title: 'Interactive Web Experiences',
        desc: 'No downloads. Zero friction.',
        image: ASSETS.SERVICES.INTERACTIVE,
        alt: 'Interactive 3D web walkthrough interface on a tablet showing a luxury apartment balcony view'
    },
    {
        id: 2,
        title: 'Cinematic Films',
        desc: 'Storytelling that converts.',
        image: ASSETS.SERVICES.CINEMATIC,
        alt: 'Cinematic architectural visualization film still showing moody lighting and high-end interior design'
    },
    {
        id: 3,
        title: 'Ultra-Real Renders',
        desc: 'Indistinguishable from reality.',
        image: ASSETS.SERVICES.ULTRA_REAL,
        alt: 'Photorealistic 3D interior rendering of a modern living room by Sthyra'
    },
    {
        id: 4,
        title: 'Pixel Streaming',
        desc: 'Cloud-hosted Unreal power.',
        image: ASSETS.SERVICES.PIXEL,
        alt: 'Unreal Engine pixel streaming demo showing high-fidelity real estate graphics in a browser'
    },
    {
        id: 5,
        title: 'VR & AR Immersion',
        desc: 'Pre-construction sales tools.',
        image: ASSETS.SERVICES.VR,
        alt: 'Virtual Reality headset user experiencing an immersive pre-construction architectural tour'
    }
];

const ServiceItem = ({ service, setActiveService }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { margin: "-50% 0px -50% 0px" });

    useEffect(() => {
        if (isInView) {
            setActiveService(service.id);
        }
    }, [isInView, setActiveService, service.id]);

    return (
        <motion.div
            ref={ref}
            className="h-screen flex flex-col justify-center px-4 md:px-20 relative z-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ margin: "-20%" }}
        >
            <div className="max-w-xs w-fit backdrop-blur-md bg-black/40 p-4 md:p-6 rounded-xl border border-white/10">
                <motion.h3
                    variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="text-xl md:text-3xl font-light text-white mb-2 leading-tight"
                >
                    {service.title}
                </motion.h3>
                <motion.p
                    variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }}
                    transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
                    className="font-mono text-[10px] md:text-sm text-[#d4af37]"
                >
                    {service.desc}
                </motion.p>
                <motion.div
                    variants={{ hidden: { width: 0 }, visible: { width: 40 } }}
                    transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
                    className="h-[1px] bg-[#d4af37] mt-3 md:mt-4"
                />
            </div>
        </motion.div>
    );
};

const Services = () => {
    const [activeService, setActiveService] = useState(1);

    return (
        <section id="services" className="relative bg-[#050505] text-white">

            {/* 
               🏆 CONTAINER: FIXED CINEMATIC FRAME 
               "The layout controls the image."
            */}
            <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">

                {/* Cinematic Viewport Constraint */}
                <div className="relative w-[95%] md:w-[90%] lg:w-[85%] aspect-[3/2] max-w-7xl mx-auto rounded-sm overflow-hidden shadow-2xl border border-white/5 bg-[#0a0a0a]">

                    <AnimatePresence initial={false} custom={1}>
                        {services.map((service) => {
                            if (service.id !== activeService) return null;
                            return (
                                <motion.div
                                    key={service.id}
                                    className="absolute inset-0 w-full h-full overflow-hidden will-change-transform"
                                    initial={{ y: "100%" }}
                                    animate={{ y: "0%" }}
                                    exit={{ y: "-100%", opacity: 0.5 }}
                                    transition={{
                                        duration: 1.0,
                                        ease: [0.16, 1, 0.3, 1], // "Expo" ease for premium feel
                                    }}
                                >
                                    {/* INTERNAL PARALLAX IMAGE */}
                                    <motion.div
                                        className="absolute inset-0 w-full h-full will-change-transform"
                                        initial={{ y: "-20%" }}
                                        animate={{ y: "0%" }}
                                        exit={{ y: "20%" }} // Moves opposite to container for depth
                                        transition={{
                                            duration: 1.2,
                                            ease: [0.16, 1, 0.3, 1]
                                        }}
                                    >
                                        <motion.img
                                            src={service.image}
                                            alt={service.alt}
                                            className="w-full h-full object-cover will-change-transform"
                                            initial={{ scale: 1.0 }}
                                            animate={{ scale: 1.25 }}
                                            transition={{ duration: 20, ease: "linear" }}
                                        />

                                        {/* Cinematic Overlays */}
                                        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-700" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
                                    </motion.div>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>

                    {/* Fixed Header within Frame ? Or Outside? 
                        User: "Background stays calm". 
                        Let's keep the global section header outside the frame for cleanness.
                    */}

                </div>

                {/* Section Header (Outside Frame) */}
                <div className="absolute top-24 left-6 md:top-32 md:left-20 z-20 mix-blend-difference text-white pointer-events-none">
                    <h2 className="text-sm font-serif tracking-[0.2em] uppercase mb-2 opacity-80">Our Expertise</h2>
                </div>

            </div>

            {/* SCROLLABLE CONTENT OVERLAY */}
            <div className="relative z-10 -mt-[100vh]">
                {services.map((service) => (
                    <ServiceItem
                        key={service.id}
                        service={service}
                        setActiveService={setActiveService}
                    />
                ))}
            </div>

        </section>
    );
};

export default Services;
