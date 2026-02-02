import React, { useLayoutEffect, useRef, useEffect, useState, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, useAnimations, Html } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ASSETS } from '../config/assets';

gsap.registerPlugin(ScrollTrigger);

const Butterfly = () => {
    const scrollGroup = useRef();
    const floatGroup = useRef();

    // CREDIT: Animated Flying Fluttering Butterfly Loop by LasquetiSpice
    // Source: https://sketchfab.com/3d-models/animated-flying-fluttering-butterfly-loop-80f8d9a6dadc411e89ca366cb0cfb0d9
    // License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
    useEffect(() => {
        console.log(
            '%c 🦋 3D Butterfly Model by LasquetiSpice \n%cLicensed under CC-BY-4.0 | https://sketchfab.com/LasquetiSpice',
            'color: #d4af37; font-weight: bold; font-size: 12px;',
            'color: #888; font-size: 10px;'
        );
    }, []);

    // 1. USE THE ORIGINAL GLB FILE (It is safer and not corrupt)
    // Ensure this file is in your public/assets/ folder
    const { scene, animations } = useGLTF('/assets/animated_flying_fluttering_butterfly_loop.glb');
    const { actions } = useAnimations(animations, floatGroup);

    // 2. FORCE "OLD SCHOOL" MATERIAL LOOK
    // This removes the shiny white reflection and brings back the Orange color
    useLayoutEffect(() => {
        scene.traverse((child) => {
            if (child.isMesh) {
                child.material.side = THREE.DoubleSide;
                // These two lines remove the "White" washout
                child.material.roughness = 1;
                child.material.metalness = 0;
                child.material.envMapIntensity = 0;

                // FIX: Make the body visible against dark background
                // Add a subtle glow so it's never pitch black
                child.material.emissive = new THREE.Color('#333333');
                child.material.emissiveIntensity = 0.4;

                child.material.needsUpdate = true;
            }
        });
    }, [scene]);

    // 3. ANIMATION LOGIC (Wing Flapping)
    useEffect(() => {
        if (actions && animations.length > 0) {
            const firstAnimName = Object.keys(actions)[0];
            const action = actions[firstAnimName];
            if (action) {
                action.reset().fadeIn(0.5).play();
                action.timeScale = 1.5;
                action.setLoop(THREE.LoopRepeat);
            }
        }
    }, [actions, animations]);

    // 4. FLOATING LOGIC
    useFrame((state) => {
        if (floatGroup.current) {
            floatGroup.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1;
        }
    });

    // 5. ANIMATION CONTROLLER
    useLayoutEffect(() => {
        if (!scrollGroup.current) return;

        const isMobile = window.innerWidth < 768;

        const ctx = gsap.context(() => {
            const el = scrollGroup.current;

            if (isMobile) {
                // --- MOBILE BEHAVIOR: GENTLE LOOPING FLIGHT ---
                // Start visible (Center-ish but moving)
                el.position.set(-1, -0.5, 0);
                el.rotation.set(0, Math.PI / 3, 0);
                el.scale.set(1.5, 1.5, 1.5);

                // --- RANDOM WANDER LOGIC ---
                // Instead of a strict loop, we move to random points to feel "alive"
                const wander = () => {
                    // Random target within visible bounds (approx for mobile aspect ratio)
                    const tx = (Math.random() - 0.5) * 2.5; // -1.25 to 1.25
                    const ty = (Math.random() - 0.5) * 6;   // -3 to 3 (covers full vertical height)
                    const tz = (Math.random() - 0.5) * 2;   // -1 to 1 (depth)

                    // Random rotation - subtle tilt matching movement
                    const ry = tx * 0.5; // Face direction roughly

                    const duration = 4 + Math.random() * 4; // 4s to 8s (slow & calm)

                    gsap.to(el.position, {
                        x: tx,
                        y: ty,
                        z: tz,
                        duration: duration,
                        ease: "sine.inOut",
                        onComplete: wander // Loop forever
                    });

                    gsap.to(el.rotation, {
                        y: ry,
                        duration: duration,
                        ease: "sine.inOut"
                    });
                };

                // Start wandering
                wander();

            } else {
                // --- DESKTOP BEHAVIOR: SCROLL TRIGGER ---

                // Set Initial Scale/Pos
                el.position.set(0, 0, 0);
                el.rotation.set(0, Math.PI / 4, 0);
                el.scale.set(2.5, 2.5, 2.5);

                // 1. Hero
                if (document.getElementById('hero')) {
                    gsap.to(el.position, {
                        scrollTrigger: { trigger: "#hero", start: "top top", end: "bottom top", scrub: 1 },
                        x: 2, y: -1, z: -2
                    });
                }

                // 2. Belief
                if (document.getElementById('belief')) {
                    gsap.to(el.rotation, {
                        scrollTrigger: { trigger: "#belief", start: "top bottom", end: "bottom top", scrub: 1 },
                        y: Math.PI * 2, x: 0.5
                    });
                }

                // 3. Services (Center)
                if (document.getElementById('services')) {
                    gsap.to(el.position, {
                        scrollTrigger: { trigger: "#services", start: "top center", end: "bottom center", scrub: 1 },
                        x: 0, y: 0, z: 0
                    });
                }

                // 4. Why Sthyra (Move Left to let text be read on right)
                if (document.getElementById('why-sthyra')) {
                    gsap.to(el.position, {
                        scrollTrigger: { trigger: "#why-sthyra", start: "top bottom", end: "center center", scrub: 1 },
                        x: -3, y: 1, z: -2
                    });
                    gsap.to(el.rotation, {
                        scrollTrigger: { trigger: "#why-sthyra", start: "top bottom", end: "center center", scrub: 1 },
                        y: Math.PI / 2
                    });
                }

                // 5. Case Study (Fly Up and Away - Intermediate step)
                if (document.getElementById('case-study')) {
                    gsap.to(el.position, {
                        scrollTrigger: { trigger: "#case-study", start: "top bottom", end: "center center", scrub: 1 },
                        x: 2, y: 4, z: -5
                    });
                }

                // 6. Footer (Land on Contact Button)
                if (document.getElementById('footer')) {
                    // Fly down to the bottom right where the button is
                    gsap.to(el.position, {
                        scrollTrigger: { trigger: "#footer", start: "top center", end: "bottom bottom", scrub: 1 },
                        x: 3.5, y: -2.5, z: 0
                    });
                    // Rotate to face the user/button
                    gsap.to(el.rotation, {
                        scrollTrigger: { trigger: "#footer", start: "top center", end: "bottom bottom", scrub: 1 },
                        x: 0, y: -Math.PI / 4, z: 0
                    });
                    // Scale down slightly to "land"
                    gsap.to(el.scale, {
                        scrollTrigger: { trigger: "#footer", start: "top center", end: "bottom bottom", scrub: 1 },
                        x: 1.5, y: 1.5, z: 1.5
                    });
                }
            }
        });
        return () => ctx.revert();
    }, []);

    return (
        <group ref={scrollGroup}>
            <group ref={floatGroup}>
                {/* Add a light that follows the butterfly to illuminate the body */}
                <pointLight distance={5} intensity={5} color="#fea768" position={[0, -0.5, 0]} />
                <primitive object={scene} />
            </group>
        </group>
    );
};

const ButterflyWrapper = () => {
    const [isMobile, setIsMobile] = useState(false);
    const [isLowPerf, setIsLowPerf] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            const mobile = window.innerWidth < 768;
            setIsMobile(mobile);

            if (mobile) {
                // 1. HARDWARE CHECK (Heuristic)
                // If device has <= 4 cores or low memory info, it's likely a budget phone
                const cores = navigator.hardwareConcurrency || 4;
                // deviceMemory is experimental, default to generic high value if undefined
                const ram = navigator.deviceMemory || 8;

                if (cores < 4 || ram < 4) {
                    console.log("🦋 Butterfly: Low-end device detected (CPU/RAM). Disabling for performance.");
                    setIsLowPerf(true);
                    return;
                }

                // 2. RUNTIME FPS CHECK
                // Monitor performance for the first 2 seconds
                let frameCount = 0;
                let startTime = performance.now();
                let rafId;

                const checkFPS = () => {
                    frameCount++;
                    const currentTime = performance.now();
                    const elapsed = currentTime - startTime;

                    if (elapsed >= 1000) { // Every second
                        const fps = (frameCount / elapsed) * 1000;
                        console.log(`🦋 Butterfly: Mobile FPS Check: ${Math.round(fps)}`);

                        if (fps < 30) { // Threshold: Below 30fps is "laggy"
                            console.log("🦋 Butterfly: FPS too low. Disabling animation.");
                            setIsLowPerf(true);
                            cancelAnimationFrame(rafId);
                            return;
                        }

                        // Reset window
                        frameCount = 0;
                        startTime = currentTime;
                    }

                    // Stop checking after 3 seconds (if it's stable by then, keep it)
                    if (performance.now() > 5000) {
                        return;
                    }

                    rafId = requestAnimationFrame(checkFPS);
                };

                rafId = requestAnimationFrame(checkFPS);

                return () => cancelAnimationFrame(rafId);
            }
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Performance Optimization: Don't render anything if device is struggling
    if (isLowPerf) return null;

    return (
        <div className="fixed inset-0 z-[70] pointer-events-none w-full h-full">
            <Canvas
                className="pointer-events-none"
                style={{ pointerEvents: 'none' }}
                camera={{ position: [0, 0, 6], fov: 45 }}
                // --- THE MAGIC FIX ---
                // 'flat' turns off Tone Mapping (No white washout)
                // 'linear' turns off sRGB (Raw orange color)
                flat
                linear
                gl={{
                    antialias: true,
                    alpha: true,
                    // OPTIMIZATION: Use lower pixel ratio on mobile
                    pixelRatio: typeof window !== 'undefined' ? (isMobile ? 1 : Math.min(window.devicePixelRatio, 2)) : 1
                }}
            >
                <ambientLight intensity={1.5} />
                <directionalLight position={[5, 10, 7.5]} intensity={1} />

                <Suspense fallback={null}>
                    <Butterfly />
                </Suspense>

                {/* GLOW EFFECT - DISABLED ON MOBILE FOR PERFORMANCE */}
                {!isMobile && (
                    <EffectComposer>
                        <Bloom
                            intensity={2.0} // Strength of the glow
                            luminanceThreshold={0.2} // Threshold to trigger glow (lower = more glow)
                            luminanceSmoothing={0.9} // Smoothness of the glow
                            height={300} // Resolution
                        />
                    </EffectComposer>
                )}
            </Canvas>
        </div>
    );
};

export default ButterflyWrapper;