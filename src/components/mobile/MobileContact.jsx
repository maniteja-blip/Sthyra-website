import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const MobileContact = () => {
    // Reuse the same logic but simplified UI
    const GOOGLE_FORM_ACTION_URL = "https://docs.google.com/forms/d/e/1FAIpQLSezoHAebj4E4ICrwWJAgArIYiVE7_iM-6eO8O8t3zbEe7i6TA/formResponse";
    const ENTRY_IDS = {
        name: "entry.311771327",
        company: "entry.2020409323",
        email: "entry.1667741078",
        phone: "entry.1029637006",
        subject: "entry.1827201277",
        message: "entry.2000014618"
    };

    const [formOpen, setFormOpen] = useState(false);
    const [status, setStatus] = useState("idle");

    const [formData, setFormData] = useState({
        name: "", email: "", phone: "", message: ""
    });

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus("submitting");
        const formBody = new FormData();
        Object.keys(ENTRY_IDS).forEach(key => {
            if (formData[key]) formBody.append(ENTRY_IDS[key], formData[key]);
        });

        try {
            await fetch(GOOGLE_FORM_ACTION_URL, { method: "POST", mode: "no-cors", body: formBody });
            setStatus("success");
        } catch {
            setStatus("error");
        }
    };

    return (
        <div className="relative w-full h-full bg-[#050505] flex flex-col items-center justify-center p-8 overflow-hidden">

            {/* Background Atmosphere */}
            <div className="absolute top-[-20%] right-[-20%] w-[80%] h-[50%] bg-[#d4af37]/10 blur-[100px] rounded-full pointer-events-none" />

            {!formOpen ? (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center z-10"
                >
                    <p className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-6">Ready to begin?</p>
                    <h1 className="text-5xl font-serif text-white mb-8 leading-tight">
                        Let's Build <br />
                        <span className="text-[#d4af37] italic">The Future.</span>
                    </h1>

                    <button
                        onClick={() => setFormOpen(true)}
                        className="bg-white text-black px-10 py-5 text-sm uppercase tracking-widest font-bold hover:scale-105 transition-transform"
                    >
                        Start Project
                    </button>

                    <div className="mt-12 space-y-2">
                        <p className="text-gray-500 text-xs">Or email us directly</p>
                        <a href="mailto:contact@sthyra.com" className="block text-xl text-white font-light">contact@sthyra.com</a>
                    </div>
                </motion.div>
            ) : (
                <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="w-full max-w-sm z-10 bg-[#111] p-6 rounded-xl border border-white/10"
                >
                    {/* Back Button */}
                    <button onClick={() => setFormOpen(false)} className="text-xs text-gray-500 mb-6 flex items-center gap-2">
                        ← BACK
                    </button>

                    {status === "success" ? (
                        <div className="text-center py-10">
                            <h3 className="text-2xl text-[#d4af37] font-serif mb-2">Message Sent</h3>
                            <p className="text-gray-400 text-sm">We'll be in touch shortly.</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <input
                                name="name" placeholder="Name" required
                                value={formData.name} onChange={handleChange}
                                className="w-full bg-transparent border-b border-gray-700 py-3 text-white placeholder-gray-600 focus:border-[#d4af37] focus:outline-none transition-colors"
                            />
                            <input
                                name="email" type="email" placeholder="Email" required
                                value={formData.email} onChange={handleChange}
                                className="w-full bg-transparent border-b border-gray-700 py-3 text-white placeholder-gray-600 focus:border-[#d4af37] focus:outline-none transition-colors"
                            />
                            <textarea
                                name="message" placeholder="Tell us about your project" rows="3" required
                                value={formData.message} onChange={handleChange}
                                className="w-full bg-transparent border-b border-gray-700 py-3 text-white placeholder-gray-600 focus:border-[#d4af37] focus:outline-none transition-colors resize-none"
                            />

                            <button
                                type="submit"
                                disabled={status === "submitting"}
                                className="w-full bg-[#d4af37] text-black py-4 uppercase tracking-widest text-xs font-bold mt-4"
                            >
                                {status === "submitting" ? "Sending..." : "Submit Enquiry"}
                            </button>
                        </form>
                    )}
                </motion.div>
            )}

            {/* Footer Minimal */}
            <div className="absolute bottom-6 left-0 right-0 text-center">
                <p className="text-[10px] text-gray-700 uppercase tracking-widest">© Sthyra 2025</p>
            </div>
        </div>
    );
};

export default MobileContact;
