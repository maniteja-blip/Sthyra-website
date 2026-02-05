import React from 'react';

const PrivacyPolicy = () => {
    return (
        <div className="min-h-screen bg-[#050505] text-[#f0f0f0] pt-32 pb-20 px-6 md:px-20 font-sans">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl md:text-5xl font-serif text-white mb-10">Privacy Policy</h1>

                <div className="space-y-8 text-gray-300 font-light text-sm md:text-base leading-relaxed tracking-wide">
                    <section>
                        <h2 className="text-xl text-white mb-3 uppercase tracking-widest">1. Introduction</h2>
                        <p>
                            Welcome to Sthyra. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl text-white mb-3 uppercase tracking-widest">2. Information We Collect</h2>
                        <p>
                            We may collect, use, store and transfer different kinds of personal data about you which we have grouped together follows: Identity Data (includes first name, last name), Contact Data (includes email address, telephone number), and Technical Data (includes internet protocol (IP) address, browser type and version).
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl text-white mb-3 uppercase tracking-widest">3. How We Use Your Data</h2>
                        <p>
                            We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances: Where we need to perform the contract we are about to enter into or have entered into with you; Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl text-white mb-3 uppercase tracking-widest">4. Contact Us</h2>
                        <p>
                            If you have any questions about this privacy policy or our privacy practices, please contact us at: <br />
                            <span className="text-[#d4af37]">contact@sthyra.com</span>
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
