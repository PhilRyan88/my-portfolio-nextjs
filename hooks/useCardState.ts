import { useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import gsap from 'gsap';
import * as THREE from 'three';
import { useAnimationStore } from '@/store/animationStore';

export const useCardState = (groupRef: React.RefObject<THREE.Group | null>) => {
  const { phase, isCardExpanded, isHovered, isFlipped } = useAnimationStore();
  const { viewport } = useThree();

  useEffect(() => {
    if (!groupRef.current) return;

    // Calculate precise coordinates to dock exactly below "Freelance Work" (on desktop)
    // Center is (0,0). Top right is (viewport.width/2, viewport.height/2).
    const isMobile = viewport.width < 5;
    
    // On mobile, place it center-bottom, below the main text. On desktop, top-right.
    const targetX = isMobile ? 0 : (viewport.width / 2 - (viewport.width * 0.175));
    const targetY = isMobile ? (-viewport.height * 0.2) : (viewport.height / 2 - (viewport.height * 0.375));

    // Responsive scale to match the one in CardGroup
    const baseScale = isMobile ? viewport.width / 5 : 1;

    if (phase === 'docked' && !isCardExpanded) {
      // Animate card to top right corner
      // Adjust target scale proportionally for mobile screens so it fits the docked button overlay
      const targetScale = isHovered ? baseScale * 0.38 : baseScale * 0.35; 
      
      gsap.to(groupRef.current.position, {
        x: targetX,
        y: targetY,
        z: -1,
        duration: 1.5,
        ease: 'power3.inOut'
      });
      gsap.to(groupRef.current.rotation, {
        x: Math.PI / 8, // slight upward tilt
        y: -Math.PI / 8, // slight left turn
        z: Math.PI / 16, // slight bank
        duration: 1.5,
        ease: 'power3.inOut'
      });
      gsap.to(groupRef.current.scale, {
        x: targetScale,
        y: targetScale,
        z: targetScale,
        duration: isHovered ? 0.4 : 1.5,
        ease: 'power2.out'
      });
    } else if (phase === 'docked' && isCardExpanded) {
      // Animate card back to front and center using baseScale (not hardcoded 1)
      gsap.to(groupRef.current.position, {
        x: 0,
        y: 0,
        z: 2.5,
        duration: 1,
        ease: 'back.out(1.2)'
      });
      gsap.to(groupRef.current.rotation, {
        x: 0,
        y: isFlipped ? Math.PI : 0,
        z: 0,
        duration: 1,
        ease: 'power3.inOut'
      });
      gsap.to(groupRef.current.scale, {
        x: baseScale,
        y: baseScale,
        z: baseScale,
        duration: 1,
        ease: 'power3.inOut'
      });
    }
  }, [phase, isCardExpanded, viewport, isFlipped, isHovered]);
};
