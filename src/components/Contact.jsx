import React from 'react';
import { motion } from 'framer-motion';

const Contact = () => {
    // FORM CONFIGURATION
    const GOOGLE_FORM_ACTION_URL = "https://docs.google.com/forms/d/e/1FAIpQLSezoHAebj4E4ICrwWJAgArIYiVE7_iM-6eO8O8t3zbEe7i6TA/formResponse";

    // Extracted from user's link:
    // entry.311771327=John (Name)
    // entry.2020409323=Sthyra (Company)
    // entry.1827201277=Project+Enquiry (Subject)
    // entry.1667741078=sthyra@sthyra.com (Email)
    // entry.1029637006=8989898989 (Phone)
    // entry.2000014618=Project+Enquiry (Message)

    const ENTRY_IDS = {
        name: "entry.311771327",
        company: "entry.2020409323",
        email: "entry.1667741078",
        phone: "entry.1029637006",
        subject: "entry.1827201277",
        message: "entry.2000014618"
    };

    const [formData, setFormData] = React.useState({
        name: "",
        company: "",
        email: "",
        phone: "",
        subject: "",
        message: ""
    });
    const [status, setStatus] = React.useState("idle"); // idle, submitting, success, error
    const [errors, setErrors] = React.useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        // Clear error when user types
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: "" }));
        }
    };

    const validateForm = () => {
        let newErrors = {};
        if (!formData.name.trim()) newErrors.name = "Name is required";

        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Email is invalid";
        }

        if (!formData.message.trim()) newErrors.message = "Message is required";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setStatus("submitting");

        const formBody = new FormData();
        formBody.append(ENTRY_IDS.name, formData.name);
        formBody.append(ENTRY_IDS.company, formData.company);
        formBody.append(ENTRY_IDS.email, formData.email);
        formBody.append(ENTRY_IDS.phone, formData.phone);
        formBody.append(ENTRY_IDS.subject, formData.subject);
        formBody.append(ENTRY_IDS.message, formData.message);

        try {
            await fetch(GOOGLE_FORM_ACTION_URL, {
                method: "POST",
                mode: "no-cors",
                body: formBody
            });
            setStatus("success");
            setFormData({ name: "", company: "", email: "", phone: "", subject: "", message: "" });
        } catch (error) {
            console.error("Submission Error:", error);
            setStatus("error");
        }
    };

    return (
        <section className="min-h-screen bg-[#0a0a0a] text-white pt-32 px-6 md:px-20 pb-20 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#d4af37]/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#d4af37]/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20">
                {/* Text Content */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                >
                    <p className="text-[#d4af37] text-xs uppercase tracking-[0.2em] mb-6">Get in Touch</p>
                    <h1 className="text-4xl md:text-7xl font-serif mb-8 leading-tight">
                        Let’s Build <br />
                        <span className="italic text-gray-500">The Future.</span>
                    </h1>
                    <p className="text-gray-400 text-lg font-light leading-relaxed mb-12 max-w-md">
                        Whether you have a project in mind or just want to explore the possibilities of immersive real estate, we are here to listen.
                    </p>

                    <div className="space-y-8">
                        <div>
                            <p className="text-xs text-gray-500 uppercase tracking-widest mb-2">Email</p>
                            <a href="mailto:contact@sthyra.com" className="text-2xl font-light hover:text-[#d4af37] transition-colors">contact@sthyra.com</a>
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 uppercase tracking-widest mb-2">Studio</p>
                            <p className="text-xl font-light text-gray-300">Bangalore, India</p>
                        </div>
                    </div>
                </motion.div>

                {/* Contact Form */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                    className="bg-white/5 backdrop-blur-sm p-10 rounded-2xl border border-white/10"
                >
                    {status === "success" ? (
                        <div className="text-center py-20">
                            <h3 className="text-2xl font-serif text-[#d4af37] mb-4">Thank You!</h3>
                            <p className="text-gray-300">Your message has been sent successfully. We will get back to you soon.</p>
                            <button
                                onClick={() => setStatus("idle")}
                                className="mt-8 text-xs uppercase tracking-widest border-b border-whitepb-1 hover:text-[#d4af37] hover:border-[#d4af37] transition-colors"
                            >
                                Send another message
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="group">
                                    <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2 group-focus-within:text-[#d4af37] transition-colors">Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className={`w-full bg-transparent border-b ${errors.name ? 'border-red-500' : 'border-white/20'} py-2 text-white focus:outline-none focus:border-[#d4af37] transition-colors`}
                                        placeholder="John Doe"
                                    />
                                    {errors.name && <span className="text-red-500 text-xs mt-1">{errors.name}</span>}
                                </div>
                                <div className="group">
                                    <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2 group-focus-within:text-[#d4af37] transition-colors">Company</label>
                                    <input
                                        type="text"
                                        name="company"
                                        value={formData.company}
                                        onChange={handleChange}
                                        className="w-full bg-transparent border-b border-white/20 py-2 text-white focus:outline-none focus:border-[#d4af37] transition-colors"
                                        placeholder="Sthyra"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="group">
                                    <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2 group-focus-within:text-[#d4af37] transition-colors">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className={`w-full bg-transparent border-b ${errors.email ? 'border-red-500' : 'border-white/20'} py-2 text-white focus:outline-none focus:border-[#d4af37] transition-colors`}
                                        placeholder="john@example.com"
                                    />
                                    {errors.email && <span className="text-red-500 text-xs mt-1">{errors.email}</span>}
                                </div>
                                <div className="group">
                                    <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2 group-focus-within:text-[#d4af37] transition-colors">Phone</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="w-full bg-transparent border-b border-white/20 py-2 text-white focus:outline-none focus:border-[#d4af37] transition-colors"
                                        placeholder="+91 99999 99999"
                                    />
                                </div>
                            </div>

                            <div className="group">
                                <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2 group-focus-within:text-[#d4af37] transition-colors">Subject</label>
                                <input
                                    type="text"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    className="w-full bg-transparent border-b border-white/20 py-2 text-white focus:outline-none focus:border-[#d4af37] transition-colors"
                                    placeholder="Project Enquiry"
                                />
                            </div>

                            <div className="group">
                                <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2 group-focus-within:text-[#d4af37] transition-colors">Message</label>
                                <textarea
                                    rows="4"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    className={`w-full bg-transparent border-b ${errors.message ? 'border-red-500' : 'border-white/20'} py-2 text-white focus:outline-none focus:border-[#d4af37] transition-colors resize-none`}
                                    placeholder="Tell us about your project..."
                                ></textarea>
                                {errors.message && <span className="text-red-500 text-xs mt-1">{errors.message}</span>}
                            </div>

                            <button
                                type="submit"
                                disabled={status === "submitting"}
                                className="bg-white text-black px-10 py-4 uppercase tracking-widest text-sm hover:bg-[#d4af37] hover:text-white transition-all duration-300 w-full md:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {status === "submitting" ? "Sending..." : "Send Message"}
                            </button>
                            {status === "error" && <p className="text-red-500 text-xs mt-2">Something went wrong. Please try again.</p>}
                        </form>
                    )}
                </motion.div>
            </div>
        </section>
    );
};

export default Contact;
