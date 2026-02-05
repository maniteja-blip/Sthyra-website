import React from 'react';

const About = () => {
    return (
        <div className="min-h-screen bg-[#050505] text-[#f0f0f0] pt-32 pb-20 px-6 md:px-20 font-sans">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl md:text-6xl font-serif text-white mb-8">About <span className="text-[#d4af37]">Sthyra</span>.</h1>

                <div className="prose prose-invert prose-lg max-w-none text-gray-300 font-light leading-relaxed tracking-wide">
                    <p className="mb-6">
                        Sthyra is the new standard in architectural immersion. We transform unbuilt spaces into hyper-realistic digital experiences that drive sales and engagement.
                    </p>
                    <p className="mb-6">
                        Born from a passion for precision and a vision for the future of real estate marketing, our studio combines cutting-edge technology with cinematic storytelling. We don't just render buildings; we craft atmospheres, emotions, and digital twins that feel as real as the physical world.
                    </p>
                    <p>
                        Based in Bangalore, we serve luxury developers and architects globally, pushing the boundaries of what's possible in web-based 3D visualization.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default About;
