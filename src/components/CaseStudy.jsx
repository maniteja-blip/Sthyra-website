import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

import { ASSETS } from '../config/assets';

const projects = [
    {
        id: 1,
        title: "Aadhya Serene",
        category: "Residential",
        desc: "Experience the unbuilt. A fully immersive digital twin.",
        image: ASSETS.PROJECTS.AADHYA_SERENE,
        link: "https://aadhyaserene.com/",
        alt: "Aadhya Serene residential complex digital twin visualization"
    },
    // Add more projects here easily
    {
        id: 2,
        title: "Coming Soon",
        category: "Commercial",
        desc: "The next generation of workspace visualization.",
        image: ASSETS.PROJECTS.SKYLINE, // Placeholder image
        link: "#",
        alt: "Photorealistic 3D rendering of a future commercial workspace skyline"
    }
];

const ProjectCard = ({ project }) => {
    return (
        <div className="relative h-[70vh] w-[85vw] md:w-[60vw] flex-shrink-0 bg-[#111] overflow-hidden group">
            <motion.div
                className="absolute inset-0 w-full h-full"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.7 }}
            >
                <img
                    src={project.image}
                    alt={project.alt || project.title}
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                />
            </motion.div>

            <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 bg-gradient-to-t from-black/90 to-transparent">
                <div className="flex items-center gap-4 mb-4">
                    <span className="h-[1px] w-8 bg-[#d4af37]" />
                    <span className="text-[#d4af37] text-xs uppercase tracking-widest">{project.category}</span>
                </div>
                <h3 className="text-4xl md:text-6xl font-serif text-white mb-4">{project.title}</h3>
                <p className="text-gray-400 max-w-md mb-8">{project.desc}</p>
                <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 text-white uppercase tracking-widest text-xs border-b border-white/20 pb-1 hover:border-white transition-colors"
                >
                    View Project
                </a>
            </div>
        </div>
    );
};

const CaseStudy = () => {
    const targetRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
    });

    // Horizontal scroll capability: maps vertical scroll to horizontal movement
    // Adjust -55% based on number of items (approx -100% * (n-1)/n ?) 
    // Actually just trial and error or precise calc: (100vw - totalWidth)
    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-55%"]);

    // Fade out title immediately on scroll
    const titleOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
    const titleY = useTransform(scrollYProgress, [0, 0.1], [0, -20]);

    return (
        <section ref={targetRef} id="case-study" className="relative h-[300vh] bg-[#050505]">
            <div className="sticky top-0 h-screen flex items-center overflow-hidden">

                {/* Intro Title (Static on left) */}
                <motion.div
                    style={{ opacity: titleOpacity, y: titleY }}
                    className="absolute top-12 left-6 md:top-24 md:left-20 z-10 mix-blend-difference"
                >
                    <p className="text-[#d4af37] text-xs uppercase tracking-widest mb-2">Portfolio</p>
                    <h2 className="text-4xl md:text-5xl font-serif text-white">Selected Works</h2>
                </motion.div>

                <motion.div style={{ x }} className="flex gap-12 pl-6 md:pl-20 items-center h-full">

                    {/* Intro spacer to prevent title overlap */}
                    <div className="w-[100vw] md:w-[40vw] flex-shrink-0" />

                    {projects.map((project) => (
                        <ProjectCard key={project.id} project={project} />
                    ))}

                    <div className="w-[20vw] flex-shrink-0 text-white/20 text-4xl font-serif flex items-center">
                        More Coming Soon
                    </div>

                </motion.div>
            </div>
        </section>
    );
};

export default CaseStudy;
