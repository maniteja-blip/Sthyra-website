import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Lenis from 'lenis';

const SmoothScroll = ({ children }) => {
    const location = useLocation();

    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            direction: 'vertical',
            gestureDirection: 'vertical',
            smooth: true,
            mouseMultiplier: 1,
            smoothTouch: false,
            touchMultiplier: 2,
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        // Reset scroll on route change
        const handleRouteChange = () => {
            lenis.scrollTo(0, { immediate: true });
        };

        handleRouteChange(); // Initial check/reset if needed, though usually handled by browser on refresh

        return () => {
            lenis.destroy();
        };
    }, []); // Initial setup

    // Listen for route changes
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);

    return (
        <div className="w-full h-full">
            {children}
        </div>
    );
};

export default SmoothScroll;
