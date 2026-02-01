import React, { useLayoutEffect, useRef, useEffect, Suspense } from 'react';
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

    // 5. SCROLL    // Scroll
    useLayoutEffect(() => {
        if (!scrollGroup.current) return;
        const ctx = gsap.context(() => {
            const el = scrollGroup.current;

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
    return (
        <div className="fixed inset-0 z-50 pointer-events-none w-full h-full">
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
                    pixelRatio: typeof window !== 'undefined' ? Math.min(window.devicePixelRatio, 2) : 1
                }}
            >
                <ambientLight intensity={1.5} />
                <directionalLight position={[5, 10, 7.5]} intensity={1} />

                <Suspense fallback={null}>
                    <Butterfly />
                </Suspense>

                {/* GLOW EFFECT */}
                <EffectComposer>
                    <Bloom
                        intensity={2.0} // Strength of the glow
                        luminanceThreshold={0.2} // Threshold to trigger glow (lower = more glow)
                        luminanceSmoothing={0.9} // Smoothness of the glow
                        height={300} // Resolution
                    />
                </EffectComposer>
            </Canvas>
        </div>
    );
};

export default ButterflyWrapper;