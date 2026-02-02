import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ASSETS } from '../config/assets';

const Footer = () => {
    const navigate = useNavigate();

    return (
        <footer id="footer" className="bg-[#050505] text-[#f0f0f0] pt-32 pb-24 md:pb-20 px-6 md:px-12 border-t border-white/5 overflow-hidden">
            <div className="flex flex-col md:flex-row justify-between items-start mb-24 md:mb-32">

                {/* HEADLINE */}
                {/* HEADLINE */}
                <div className="flex flex-col gap-10 max-w-3xl">
                    <div>
                        <p className="text-3xl md:text-5xl font-serif text-white leading-tight">
                            The new standard in <br />
                            <span className="italic text-[#d4af37] opacity-90">architectural immersion.</span>
                        </p>
                        <p className="text-sm uppercase tracking-widest text-gray-500 mt-4">
                            Bangalore | Global
                        </p>
                    </div>
                    <div className="flex gap-6 mt-2">
                        <button
                            onClick={() => navigate('/contact')}
                            className="text-xs md:text-sm uppercase tracking-[0.2em] border-b border-white/30 pb-2 hover:border-[#d4af37] hover:text-[#d4af37] transition-all cursor-pointer"
                        >
                            Schedule a Pilot
                        </button>
                    </div>
                </div>

                {/* LINKS & SOCIALS */}
                <div className="flex gap-20 mt-16 md:mt-0 text-sm uppercase tracking-widest text-gray-400">
                    <div className="flex flex-col gap-4">
                        <span className="text-white opacity-50 mb-2">Socials</span>
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Linkedin</a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Instagram</a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Twitter/X</a>
                    </div>

                </div>
            </div>

            {/* MASSIVE FOOTER LOGO */}
            <div className="border-t border-white/10 pt-4 relative">
                <div className="flex justify-between items-end text-[10px] md:text-xs uppercase tracking-widest text-gray-600 mb-2">
                    <span>© 2026 Sthyra Inc.</span>
                    <span>Bangalore, India</span>
                </div>

                <div className="flex justify-center items-center -mb-4 md:-mb-8 pointer-events-none select-none">
                    {/* GOLD LOGO (Filter-based for better cross-device compatibility) 
                        Fixes "mask-image" issues on mobile/Safari with external S3 assets 
                    */}
                    <img
                        src={ASSETS.GLOBAL.FOOTER_LOGO}
                        alt="Sthyra Logo"
                        className="w-[50vw] md:w-[35vw] object-contain opacity-90"
                    />
                </div>
            </div>
        </footer>
    );
};

export default Footer;
