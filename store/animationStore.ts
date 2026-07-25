import { create } from 'zustand';

export type AnimationPhase = 'idle' | 'scanning' | 'docked' | 'unlocked';

interface AnimationState {
  phase: AnimationPhase;
  setPhase: (phase: AnimationPhase) => void;
  isHovered: boolean;
  setIsHovered: (isHovered: boolean) => void;
  isCardExpanded: boolean;
  setIsCardExpanded: (expanded: boolean) => void;
  isFlipped: boolean;
  setIsFlipped: (flipped: boolean) => void;
}

export const useAnimationStore = create<AnimationState>((set) => ({
  phase: 'idle',
  setPhase: (phase) => set({ phase }),
  isHovered: false,
  setIsHovered: (isHovered) => set({ isHovered }),
  isCardExpanded: false,
  setIsCardExpanded: (isCardExpanded) => set({ isCardExpanded }),
  isFlipped: false,
  setIsFlipped: (isFlipped) => set({ isFlipped }),
}));
