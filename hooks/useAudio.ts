import { useEffect, useRef } from 'react';
import { Howl } from 'howler';
import { useUIStore } from '@/store/uiStore';

export const useAudio = () => {
  const { isMuted } = useUIStore();
  
  const hoverSound = useRef<Howl | null>(null);
  const flipSound = useRef<Howl | null>(null);
  const scanSound = useRef<Howl | null>(null);
  const unlockSound = useRef<Howl | null>(null);
  const ambientSound = useRef<Howl | null>(null);

  useEffect(() => {
    // Initialize Howl instances
    // Since we don't have assets yet, these will point to empty or non-existent files.
    // They will fail gracefully or we can just mock them.
    hoverSound.current = new Howl({ src: ['/sounds/hover.mp3'], volume: 0.5 });
    flipSound.current = new Howl({ src: ['/sounds/flip.mp3'], volume: 0.8 });
    scanSound.current = new Howl({ src: ['/sounds/scan.mp3'], volume: 0.6 });
    unlockSound.current = new Howl({ src: ['/sounds/unlock.mp3'], volume: 0.7 });
    ambientSound.current = new Howl({ src: ['/sounds/ambient.mp3'], volume: 0.3, loop: true });

    return () => {
      // Cleanup
      hoverSound.current?.unload();
      flipSound.current?.unload();
      scanSound.current?.unload();
      unlockSound.current?.unload();
      ambientSound.current?.unload();
    };
  }, []);

  useEffect(() => {
    Howler.mute(isMuted);
  }, [isMuted]);

  const playHoverSound = () => {
    if (!isMuted && hoverSound.current) hoverSound.current.play();
  };

  const playFlipSound = () => {
    if (!isMuted && flipSound.current) flipSound.current.play();
  };

  const playScanSound = () => {
    if (!isMuted && scanSound.current) scanSound.current.play();
  };

  const playUnlockSound = () => {
    if (!isMuted && unlockSound.current) unlockSound.current.play();
  };

  const playAmbientSound = () => {
    if (!isMuted && ambientSound.current && !ambientSound.current.playing()) {
      ambientSound.current.play();
    }
  };

  return {
    playHoverSound,
    playFlipSound,
    playScanSound,
    playUnlockSound,
    playAmbientSound,
  };
};
