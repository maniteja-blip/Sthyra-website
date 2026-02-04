import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Preloader = ({ onComplete }) => {
    // Sequence State: 
    // 0 = Init (Black Screen)
    // 1 = Show STHYRA Text (t=0.3s)
    // 2 = Show Golden Line (t=1.5s)
    // 3 = Show Tagline (t=2.8s)
    // 4 = Split Open (t=4.5s)
    const [step, setStep] = useState(0);

    useEffect(() => {
        const t1 = setTimeout(() => setStep(1), 300);
        const t2 = setTimeout(() => setStep(2), 1500);
        const t3 = setTimeout(() => setStep(3), 2800);
        const t4 = setTimeout(() => setStep(4), 4500); // Faster split
        const t5 = setTimeout(() => onComplete(), 5500); // Faster cleanup

        return () => {
            clearTimeout(t1);
            clearTimeout(t2);
            clearTimeout(t3);
            clearTimeout(t4);
            clearTimeout(t5);
        };
    }, [onComplete]);

    const sentence = "Redefining Reality";
    const letters = sentence.split("");

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.04 } // Smoother flow
        }
    };

    const childVariants = {
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" } // Smooth ease without bounce
        },
        hidden: {
            opacity: 0,
            y: 10
        }
    };

    return (
        <div className="fixed inset-0 z-[9999] pointer-events-none flex flex-col">

            {/* Top Shutter */}
            <motion.div
                initial={{ height: "50%" }}
                animate={{ height: step === 4 ? 0 : "50%" }}
                transition={{ duration: 1.0, ease: [0.76, 0, 0.24, 1] }} // Slightly faster exit (1.0s vs 1.2s)
                className="absolute top-0 left-0 right-0 bg-[#0a0a0a] border-b border-[#d4af37]/20 z-20 overflow-hidden"
            >
                <div className="absolute bottom-0 left-0 right-0 flex justify-center pb-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{
                            opacity: step >= 1 ? 1 : 0,
                            y: step >= 1 ? 0 : 30
                        }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="overflow-visible pb-4 pt-2"
                    >
                        <h1 className="text-6xl md:text-8xl font-conneqt text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500 leading-none pb-2">
                            STHYRA
                        </h1>
                    </motion.div>
                </div>
            </motion.div>

            {/* Bottom Shutter */}
            <motion.div
                initial={{ height: "50%" }}
                animate={{ height: step === 4 ? 0 : "50%" }}
                transition={{ duration: 1.0, ease: [0.76, 0, 0.24, 1] }} // Slightly faster exit
                className="absolute bottom-0 left-0 right-0 bg-[#0a0a0a] border-t border-[#d4af37]/20 z-20 overflow-hidden"
            >
                <div className="absolute top-0 left-0 right-0 flex justify-center pt-8">
                    {/* Render sequence only when Step >= 3 */}
                    {step >= 3 && (
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            className="flex overflow-hidden"
                        >
                            {letters.map((letter, index) => (
                                <motion.span
                                    key={index}
                                    variants={childVariants}
                                    className="inline-block text-xs uppercase tracking-[0.5em] text-[#d4af37]"
                                >
                                    {letter === " " ? "\u00A0" : letter}
                                </motion.span>
                            ))}
                        </motion.div>
                    )}
                </div>
            </motion.div>

            {/* Golden Line */}
            <motion.div
                className="absolute top-1/2 left-0 right-0 h-[1px] bg-[#d4af37] z-30"
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{
                    scaleX: step >= 2 ? 1 : 0,
                    opacity: step === 4 ? 0 : (step >= 2 ? 1 : 0) // Fade out at step 4
                }}
                transition={{
                    scaleX: { duration: 1.2, ease: "easeInOut" },
                    opacity: { duration: 0.5 }
                }}
            />
        </div>
    );
};

export default Preloader;
