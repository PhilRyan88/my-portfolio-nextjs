import { useState, useCallback } from 'react';
import { useAnimationStore } from '@/store/animationStore';
import { useAudio } from './useAudio';
import gsap from 'gsap';
import * as THREE from 'three';

export const useCardHover = (cardRef: React.RefObject<THREE.Group | null>) => {
  const { phase, isHovered, setIsHovered } = useAnimationStore();
  const { playHoverSound } = useAudio();

  const handlePointerOver = useCallback(() => {
    if (phase !== 'unlocked') return;
    
    setIsHovered(true);
    playHoverSound();

    if (cardRef.current) {
      gsap.to(cardRef.current.scale, {
        x: 1.05,
        y: 1.05,
        z: 1.05,
        duration: 0.5,
        ease: 'elastic.out(1, 0.5)',
      });
      // Rotation toward mouse is handled in useMouseTilt or in frame loop
    }
  }, [phase, setIsHovered, playHoverSound, cardRef]);

  const handlePointerOut = useCallback(() => {
    if (phase !== 'unlocked') return;
    
    setIsHovered(false);

    if (cardRef.current) {
      gsap.to(cardRef.current.scale, {
        x: 1,
        y: 1,
        z: 1,
        duration: 0.5,
        ease: 'elastic.out(1, 0.5)',
      });
    }
  }, [phase, setIsHovered, cardRef]);

  return { handlePointerOver, handlePointerOut, isHovered };
};
