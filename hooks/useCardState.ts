import { useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import gsap from 'gsap';
import * as THREE from 'three';
import { useAnimationStore } from '@/store/animationStore';

export const useCardState = (groupRef: React.RefObject<THREE.Group | null>) => {
  const { phase, isCardExpanded, isHovered } = useAnimationStore();
  const { viewport } = useThree();

  useEffect(() => {
    if (!groupRef.current) return;

    // Calculate precise coordinates to dock exactly below "Freelance Work"
    // Center is (0,0). Top right is (viewport.width/2, viewport.height/2).
    // We want it 17.5% from the right, and 37.5% from the top to perfectly match the DOM button.
    const targetX = viewport.width / 2 - (viewport.width * 0.175);
    const targetY = viewport.height / 2 - (viewport.height * 0.375);

    if (phase === 'docked' && !isCardExpanded) {
      // Animate card to top right corner
      const targetScale = isHovered ? 0.38 : 0.35; // Scale up on hover
      
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
      // Animate card back to front and center
      gsap.to(groupRef.current.position, {
        x: 0,
        y: 0,
        z: 2.5,
        duration: 1,
        ease: 'back.out(1.2)'
      });
      gsap.to(groupRef.current.rotation, {
        x: 0,
        y: 0,
        z: 0,
        duration: 1,
        ease: 'power3.inOut'
      });
      gsap.to(groupRef.current.scale, {
        x: 1,
        y: 1,
        z: 1,
        duration: 1,
        ease: 'power3.inOut'
      });
    }
  }, [phase, isCardExpanded, viewport]);
};
