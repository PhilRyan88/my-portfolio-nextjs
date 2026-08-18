import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import * as THREE from 'three';
import { useAnimationStore } from '@/store/animationStore';
import { useAudio } from './useAudio';
import { useThree } from '@react-three/fiber';
import { useRouter } from 'next/navigation';

export const useIntro = (cardRef: React.RefObject<THREE.Group | null>) => {
  const { setPhase } = useAnimationStore();
  const { playScanSound, playUnlockSound } = useAudio();
  const { camera } = useThree();
  const router = useRouter();

  // Store functions in refs to avoid useEffect triggering on every render
  const audioRefs = useRef({ playScanSound, playUnlockSound, setPhase, router });
  useEffect(() => {
    audioRefs.current = { playScanSound, playUnlockSound, setPhase, router };
  }, [playScanSound, playUnlockSound, setPhase, router]);

  useEffect(() => {
    if (!cardRef.current) return;
    
    // If we've already completed the intro (e.g. returning from another page), skip it
    if (useAnimationStore.getState().phase === 'docked') {
      return;
    }

    // Center the card and camera
    cardRef.current.position.set(0, 0, 0);
    cardRef.current.rotation.set(0, 0, 0);
    camera.position.set(0, 0, 8);

    const tl = gsap.timeline({
      onComplete: () => {
        audioRefs.current.setPhase('docked'); // Transition to docked phase instead of redirecting
        audioRefs.current.playUnlockSound();
      }
    });

    // Short wait, then trigger scanning phase
    tl.to({}, { duration: 1 })
      .add(() => {
        audioRefs.current.setPhase('scanning');
        audioRefs.current.playScanSound();
      })
      // Wait for QR animation (0.5 pop + 1.5 scan + 0.5 popback = 2.5s)
      .to({}, { duration: 3.0 });

    return () => {
      tl.kill();
    };
  }, [cardRef, camera]); // Removed audio/state functions to prevent accidental timeline killing
};
