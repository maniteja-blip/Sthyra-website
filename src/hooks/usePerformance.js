import { useState, useEffect } from 'react';

const usePerformance = () => {
    const [tier, setTier] = useState('high'); // 'high' | 'low'
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkPerformance = () => {
            const width = window.innerWidth;
            const mobile = width < 768;
            setIsMobile(mobile);

            // 1. Hardware Concurrency (Cores)
            const cores = navigator.hardwareConcurrency || 4;

            // 2. Device Memory (RAM in GB) - Experimental API
            const ram = navigator.deviceMemory || 8;

            // 3. Network Connection (Downlink in Mbps) - Experimental API
            const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
            const downlink = connection ? connection.downlink : 10; // Default to 10Mbps (Good 4G) if unknown
            const effectiveType = connection ? connection.effectiveType : '4g'; // '4g', '3g', '2g', 'slow-2g'

            // --- TIER LOGIC ---
            // HIGH TIER REQUIREMENTS:
            // - At least 4 Cores
            // - At least 4GB RAM
            // - At least 5Mbps Downlink
            // - Not on '2g' or 'slow-2g'

            const isHardwareCapable = cores >= 4 && ram >= 4;
            const isNetworkCapable = downlink >= 5 && !['2g', 'slow-2g'].includes(effectiveType);

            if (isHardwareCapable && isNetworkCapable) {
                setTier('high');
                // console.log(`🚀 Performance: High Tier Detected (Cores: ${cores}, RAM: ${ram}, Speed: ${downlink}Mbps)`);
            } else {
                setTier('low');
                // console.log(`⚠️ Performance: Low Tier Detected (Cores: ${cores}, RAM: ${ram}, Speed: ${downlink}Mbps). Serving optimized assets.`);
            }
        };

        checkPerformance();

        // Listen for network changes (if supported)
        const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
        if (connection) {
            connection.addEventListener('change', checkPerformance);
        }

        window.addEventListener('resize', checkPerformance);
        return () => {
            if (connection) connection.removeEventListener('change', checkPerformance);
            window.removeEventListener('resize', checkPerformance);
        };
    }, []);

    return { tier, isMobile, isHighPerformance: tier === 'high' };
};

export default usePerformance;
