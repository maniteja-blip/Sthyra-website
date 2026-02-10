import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import ReactMarkdown from 'react-markdown';

// Simple SEO Landing Page Template (Invisible from Nav)
const LandingPage = ({ title, description, keywords, content }) => {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-[#050505] text-white pt-32 pb-20 px-6 md:px-20">
            <Helmet>
                <title>{title} | Sthyra</title>
                <meta name="description" content={description} />
                <meta name="keywords" content={keywords} />
                <link rel="canonical" href={window.location.href} />
            </Helmet>

            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <p className="text-[#d4af37] tracking-[0.2em] uppercase text-sm mb-4">Service Overview</p>
                    <h1 className="text-4xl md:text-6xl font-serif mb-8 leading-tight text-white/90">
                        {title}
                    </h1>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="prose prose-invert prose-lg max-w-none text-gray-300 font-light leading-relaxed"
                >
                    <ReactMarkdown>{content}</ReactMarkdown>
                </motion.div>

                <div className="mt-16 pt-16 border-t border-white/10">
                    <h3 className="text-2xl font-serif mb-4">Ready to start?</h3>
                    <a href="/contact" className="inline-block px-8 py-3 bg-[#d4af37] text-black font-medium tracking-wide hover:bg-white transition-colors duration-300">
                        CONTACT US
                    </a>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
