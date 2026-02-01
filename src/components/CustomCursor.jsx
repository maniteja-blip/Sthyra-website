import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const CustomCursor = () => {
    const cursorRef = useRef(null); // The dot
    const followerRef = useRef(null); // The bubble

    useEffect(() => {
        // Move the cursor logic out of React state to avoid re-renders
        const cursor = cursorRef.current;
        const follower = followerRef.current;

        // Center the cursor elements
        gsap.set(cursor, { xPercent: -50, yPercent: -50 });
        gsap.set(follower, { xPercent: -50, yPercent: -50 });

        const onMouseMove = (e) => {
            const { clientX, clientY } = e;

            // 1. The Dot moves instantly
            gsap.to(cursor, { x: clientX, y: clientY, duration: 0.1, ease: "power2.out" });

            // 2. The Bubble follows with elasticity (lag)
            gsap.to(follower, { x: clientX, y: clientY, duration: 0.6, ease: "power2.out" });
        };

        const onMouseOver = (e) => {
            // Check if hovering over clickable elements
            if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON' || e.target.closest('a') || e.target.closest('button')) {
                gsap.to(follower, { scale: 1.5, opacity: 0.8, borderColor: "transparent", backgroundColor: "rgba(212, 175, 55, 0.2)", duration: 0.3 }); // Gold fill
                gsap.to(cursor, { scale: 0, duration: 0.3 }); // Hide dot on hover
            } else {
                gsap.to(follower, { scale: 1, opacity: 1, borderColor: "rgba(212, 175, 55, 0.5)", backgroundColor: "transparent", duration: 0.3 }); // Gold border
                gsap.to(cursor, { scale: 1, duration: 0.3 });
            }
        };

        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mouseover', onMouseOver);

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseover', onMouseOver);
        };
    }, []);

    return (
        <>
            {/* The small dot */}
            <div
                ref={cursorRef}
                className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-[100] hidden md:block"
            />
            {/* The trailing bubble */}
            <div
                ref={followerRef}
                className="fixed top-0 left-0 w-8 h-8 border border-[#d4af37]/50 rounded-full pointer-events-none z-[99] hidden md:block"
            />
        </>
    );
};

export default CustomCursor;
