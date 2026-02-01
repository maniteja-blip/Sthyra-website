import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Hero from './Hero';
import VisualizationGap from './VisualizationGap';
import Belief from './Belief';
import Services from './Services';
import WhySthyra from './WhySthyra';
import CaseStudy from './CaseStudy';

const Home = () => {
    const location = useLocation();

    useEffect(() => {
        if (location.state && location.state.scrollTo) {
            const element = document.getElementById(location.state.scrollTo);
            if (element) {
                // Small timeout to allow DOM to be ready and Lenis to initialize
                setTimeout(() => {
                    element.scrollIntoView({ behavior: 'smooth' });
                }, 100);
            }
        }
    }, [location]);

    return (
        <main>
            <Hero />
            <VisualizationGap />
            <Belief />
            <Services />
            <WhySthyra />
            <CaseStudy />
        </main>
    );
};

export default Home;
