import React, { useLayoutEffect, useRef, useEffect, useState, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, useAnimations } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ASSETS } from '../config/assets';
import usePerformance from '../hooks/usePerformance';

gsap.registerPlugin(ScrollTrigger);

const Butterfly = () => {
    const scrollGroup = useRef();
    const floatGroup = useRef();

    // CREDIT: Animated Flying Fluttering Butterfly Loop by LasquetiSpice
    useEffect(() => {
        console.log(
            '%c 🦋 3D Butterfly Model by LasquetiSpice \n%cLicensed under CC-BY-4.0',
            'color: #d4af37; font-weight: bold; font-size: 12px;',
            'color: #888; font-size: 10px;'
        );
    }, []);

    const { scene, animations } = useGLTF('/assets/animated_flying_fluttering_butterfly_loop.glb');
    const { actions } = useAnimations(animations, floatGroup);

    // MATERIAL TWEAKS
    useLayoutEffect(() => {
        scene.traverse((child) => {
            if (child.isMesh) {
                child.material.side = THREE.DoubleSide;
                child.material.roughness = 1;
                child.material.metalness = 0;
                child.material.envMapIntensity = 0;
                child.material.emissive = new THREE.Color('#333333');
                child.material.emissiveIntensity = 0.4;
                child.material.needsUpdate = true;
            }
        });
    }, [scene]);

    // ANIMATION (Wing Flap)
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

    // FLOATING
    useFrame((state) => {
        if (floatGroup.current) {
            floatGroup.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1;
        }
    });

    // SCROLL / MOVE CONTROLLER
    useLayoutEffect(() => {
        if (!scrollGroup.current) return;

        const isMobile = window.innerWidth < 768;

        const ctx = gsap.context(() => {
            const el = scrollGroup.current;

            if (isMobile) {
                // MOBILE: Wander
                el.position.set(-1, -0.5, 0);
                el.rotation.set(0, Math.PI / 3, 0);
                el.scale.set(1.5, 1.5, 1.5);

                const wander = () => {
                    const tx = (Math.random() - 0.5) * 2.5;
                    const ty = (Math.random() - 0.5) * 6;
                    const tz = (Math.random() - 0.5) * 2;
                    const ry = tx * 0.5;
                    const duration = 4 + Math.random() * 4;

                    gsap.to(el.position, {
                        x: tx, y: ty, z: tz, duration: duration, ease: "sine.inOut", onComplete: wander
                    });
                    gsap.to(el.rotation, {
                        y: ry, duration: duration, ease: "sine.inOut"
                    });
                };
                wander();
            } else {
                // DESKTOP: Scroll Triggers
                el.position.set(0, 0, 0);
                el.rotation.set(0, Math.PI / 4, 0);
                el.scale.set(2.5, 2.5, 2.5);

                const triggers = [
                    { id: 'hero', x: 2, y: -1, z: -2 },
                    { id: 'belief', rot: true, y: Math.PI * 2, x: 0.5 },
                    { id: 'services', x: 0, y: 0, z: 0 },
                    { id: 'why-sthyra', x: -3, y: 1, z: -2, rot: true, ry: Math.PI / 2 },
                    { id: 'case-study', x: 2, y: 4, z: -5 },
                    { id: 'footer', x: 3.5, y: -2.5, z: 0, rot: true, rx: 0, ry: -Math.PI / 4, scale: 1.5 }
                ];

                triggers.forEach(t => {
                    if (document.getElementById(t.id)) {
                        const trigger = { trigger: `#${t.id}`, start: "top bottom", end: "bottom top", scrub: 1 };
                        if (t.id === 'hero') trigger.start = "top top";
                        if (t.id === 'footer') { trigger.start = "top center"; trigger.end = "bottom bottom"; }
                        if (t.id === 'why-sthyra') trigger.end = "center center";

                        if (t.rot) {
                            if (t.ry !== undefined) gsap.to(el.rotation, { scrollTrigger: trigger, y: t.ry });
                        } else {
                            gsap.to(el.position, { scrollTrigger: trigger, x: t.x, y: t.y, z: t.z });
                        }

                        // Full detailed implementation for crucial sections to match original behavior exactly
                        if (t.id === 'hero') {
                            gsap.to(el.position, { scrollTrigger: trigger, x: 2, y: -1, z: -2 });
                        }
                        if (t.id === 'belief') {
                            gsap.to(el.rotation, { scrollTrigger: trigger, y: Math.PI * 2, x: 0.5 });
                        }
                        if (t.id === 'services') {
                            gsap.to(el.position, { scrollTrigger: trigger, x: 0, y: 0, z: 0 });
                        }
                        if (t.id === 'why-sthyra') {
                            gsap.to(el.position, { scrollTrigger: trigger, x: -3, y: 1, z: -2 });
                            gsap.to(el.rotation, { scrollTrigger: trigger, y: Math.PI / 2 });
                        }
                        if (t.id === 'case-study') {
                            gsap.to(el.position, { scrollTrigger: trigger, x: 2, y: 4, z: -5 });
                        }
                        if (t.id === 'footer') {
                            gsap.to(el.position, { scrollTrigger: trigger, x: 3.5, y: -2.5, z: 0 });
                            gsap.to(el.rotation, { scrollTrigger: trigger, x: 0, y: -Math.PI / 4, z: 0 });
                            gsap.to(el.scale, { scrollTrigger: trigger, x: 1.5, y: 1.5, z: 1.5 });
                        }
                    }
                });
            }
        });
        return () => ctx.revert();
    }, []);

    return (
        <group ref={scrollGroup}>
            <group ref={floatGroup}>
                <pointLight distance={5} intensity={5} color="#fea768" position={[0, -0.5, 0]} />
                <primitive object={scene} />
            </group>
        </group>
    );
};

const ButterflyWrapper = () => {
    const { isHighPerformance, isMobile } = usePerformance();
    const [isLowPerf, setIsLowPerf] = useState(false);

    useEffect(() => {
        if (!isHighPerformance) {
            console.log("🦋 Butterfly: Low-spec/Network detected via Hook. Disabling.");
            setIsLowPerf(true);
            return;
        }

        // RUNTIME FPS CHECK
        let frameCount = 0;
        let startTime = performance.now();
        let rafId;

        const checkFPS = () => {
            frameCount++;
            const currentTime = performance.now();
            const elapsed = currentTime - startTime;

            if (elapsed >= 1000) {
                const fps = (frameCount / elapsed) * 1000;
                const threshold = isMobile ? 30 : 15;

                if (fps < threshold) {
                    console.log(`🦋 Butterfly: FPS too low (${Math.round(fps)} < ${threshold}). Disabling.`);
                    setIsLowPerf(true);
                    cancelAnimationFrame(rafId);
                    return;
                }
                frameCount = 0;
                startTime = currentTime;
            }

            if (performance.now() > 4000) return;
            rafId = requestAnimationFrame(checkFPS);
        };

        const timer = setTimeout(() => {
            startTime = performance.now();
            frameCount = 0;
            rafId = requestAnimationFrame(checkFPS);
        }, 1000);

        return () => {
            cancelAnimationFrame(rafId);
            clearTimeout(timer);
        };
    }, [isHighPerformance, isMobile]);

    if (isLowPerf) return null;

    return (
        <div className="fixed inset-0 z-[70] pointer-events-none w-full h-full">
            <Canvas
                className="pointer-events-none"
                style={{ pointerEvents: 'none' }}
                camera={{ position: [0, 0, 6], fov: 45 }}
                flat
                linear
                gl={{
                    antialias: true,
                    alpha: true,
                    pixelRatio: typeof window !== 'undefined' ? (isMobile ? 1 : Math.min(window.devicePixelRatio, 2)) : 1
                }}
            >
                <ambientLight intensity={1.5} />
                <directionalLight position={[5, 10, 7.5]} intensity={1} />

                <Suspense fallback={null}>
                    <Butterfly />
                </Suspense>

                {!isMobile && (
                    <EffectComposer>
                        <Bloom
                            intensity={2.0}
                            luminanceThreshold={0.2}
                            luminanceSmoothing={0.9}
                            height={300}
                        />
                    </EffectComposer>
                )}
            </Canvas>
        </div>
    );
};

export default ButterflyWrapper;