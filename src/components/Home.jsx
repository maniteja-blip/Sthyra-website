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
        if (location.state) {
            if (location.state.scrollToMobile && isMobile) {
                // Dispatch event after a brief delay to ensure MobileView is mounted and ready listening
                setTimeout(() => {
                    const event = new CustomEvent('navigateToMobileSection', { detail: { targetId: location.state.scrollToMobile } });
                    window.dispatchEvent(event);
                }, 300);
            } else if (location.state.scrollTo && !isMobile) {
                const element = document.getElementById(location.state.scrollTo);
                if (element) {
                    setTimeout(() => {
                        element.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                }
            }
        }
    }, [location, isMobile]);

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
