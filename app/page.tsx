"use client";

import { CanvasScene } from './components/scene/CanvasScene';
import { Hero } from './components/portfolio/Hero';
import { Photography } from './components/portfolio/Photography';
import { Cinematography } from './components/portfolio/Cinematography';
import { Developer } from './components/portfolio/Developer';
import { Tutor } from './components/portfolio/Tutor';
import { Experience } from './components/portfolio/Experience';
import { Skills } from './components/portfolio/Skills';
import { Navbar } from './components/ui/Navbar';
import { SmoothScroll } from './components/ui/SmoothScroll';
import { useAudio } from '@/hooks/useAudio';
import { useEffect } from 'react';
import { useAnimationStore } from '@/store/animationStore';
import { MagneticButton } from './components/ui/MagneticButton';

export default function Home() {
  const { playAmbientSound } = useAudio();
  const { phase, isCardExpanded, setIsCardExpanded, setIsHovered } = useAnimationStore();

  useEffect(() => {
    const handleInteraction = () => {
      playAmbientSound();
      window.removeEventListener('click', handleInteraction);
    };
    window.addEventListener('click', handleInteraction);
    return () => window.removeEventListener('click', handleInteraction);
  }, [playAmbientSound]);

  return (
    <SmoothScroll>
      <main className="relative w-full min-h-screen bg-[#030305] text-white">

        {/* DOM Portfolio Layer - Fades in when docked */}
        <div className={`relative z-10 transition-opacity duration-[2s] ease-in-out ${phase === 'docked' ? 'opacity-100' : 'opacity-0'}`}>
          <Navbar />
          <div className="w-full block">
            <Hero />
            <Photography />
            <Cinematography />
            <Developer />
            <Tutor />
            <Experience />
            <Skills />
          </div>
        </div>

        {/* Background dim/blur when card is expanded (z-90, behind Canvas) */}
        {phase === 'docked' && isCardExpanded && (
          <div
            className="fixed inset-0 z-[90] bg-black/70 backdrop-blur-md pointer-events-auto cursor-pointer flex flex-col items-center justify-end pb-24 transition-all duration-500"
            onClick={() => setIsCardExpanded(false)}
          >

          </div>
        )}

        {/* 3D Canvas Layer (Absolute to page top, scrolls away with Hero) */}
        <div className="absolute top-0 left-0 w-full h-[100lvh] z-[100] pointer-events-none">
          <CanvasScene />
        </div>

        {/* Interactive Overlay & Docked Button (Absolute to match Canvas) */}
        {phase === 'docked' && !isCardExpanded && (
          <div className="absolute top-0 left-0 w-full h-[100lvh] z-[110] pointer-events-none">

            {/* Docked Invisible Button located exactly over the card */}
            <button
              className="absolute right-[10vw] top-[25vh] w-[15vw] h-[25vh] cursor-pointer pointer-events-auto"
              onClick={() => setIsCardExpanded(true)}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              aria-label="Expand 3D Card"
            />
          </div>
        )}

      </main>
    </SmoothScroll>
  );
}
