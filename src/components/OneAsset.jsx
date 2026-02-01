import React from 'react';
import { motion } from 'framer-motion';

const OneAsset = () => {
    return (
        <section className="py-40 bg-[#080808] relative overflow-hidden flex flex-col items-center justify-center">

            {/* Abstract Background Animation */}
            <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
                <motion.div
                    className="w-[500px] h-[500px] border border-[#d4af37] rounded-full"
                    animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.1, 0.3] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                    className="absolute w-[300px] h-[300px] border border-white/20 rounded-full"
                    animate={{ scale: [1, 1.1, 1], rotate: [0, 90, 0] }}
                    transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                />
            </div>

            <div className="relative z-10 text-center max-w-3xl px-6">
                <h2 className="text-4xl md:text-5xl mb-6">One Asset. Many Applications.</h2>
                <p className="text-gray-400 mb-12">
                    At the center is the Digital Twin. We build it once, and deploy it everywhere.
                    <br />
                    Faster sales. Lower costs. Design certainty.
                </p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-sm tracking-widest uppercase text-[#d4af37]">
                    {["Web", "VR", "Mobile", "Film"].map((item, i) => (
                        <motion.div
                            key={item}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.2 }}
                            className="border border-white/10 py-4 px-6 hover:bg-white/5 transition-colors"
                        >
                            {item}
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default OneAsset;
