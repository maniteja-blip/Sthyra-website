import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Hero from './Hero';
import VisualizationGap from './VisualizationGap';
import Belief from './Belief';
import Services from './Services';
import WhySthyra from './WhySthyra';
import CaseStudy from './CaseStudy';
import MobileView from './MobileView';

const Home = () => {
    const location = useLocation();
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            console.log("Checking mobile width:", window.innerWidth);
            setIsMobile(window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

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

    if (isMobile) {
        return <MobileView />;
    }

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
