import React from 'react';

const Terms = () => {
    return (
        <div className="min-h-screen bg-[#050505] text-[#f0f0f0] pt-32 pb-20 px-6 md:px-20 font-sans">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl md:text-5xl font-serif text-white mb-10">Terms of Service</h1>

                <div className="space-y-8 text-gray-300 font-light text-sm md:text-base leading-relaxed tracking-wide">
                    <section>
                        <h2 className="text-xl text-white mb-3 uppercase tracking-widest">1. Acceptance of Terms</h2>
                        <p>
                            By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement. In addition, when using this websites particular services, you shall be subject to any posted guidelines or rules applicable to such services.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl text-white mb-3 uppercase tracking-widest">2. Intellectual Property</h2>
                        <p>
                            This site and its original content, features, and functionality are owned by Sthyra and are protected by international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl text-white mb-3 uppercase tracking-widest">3. Licensing</h2>
                        <p>
                            Any 3D assets, visualizations, or software delivered by Sthyra are subject to the specific licensing agreements signed at the commencement of a project. Using our website does not grant you any license to our intellectual property.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl text-white mb-3 uppercase tracking-widest">4. Limitation of Liability</h2>
                        <p>
                            In no event shall Sthyra, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default Terms;
