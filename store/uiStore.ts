import { create } from 'zustand';

export type ActiveSection = 'hero' | 'about' | 'experience' | 'projects' | 'contact';

interface UIState {
  isMuted: boolean;
  setIsMuted: (isMuted: boolean) => void;
  activeSection: ActiveSection;
  setActiveSection: (section: ActiveSection) => void;
}

export const useUIStore = create<UIState>((set) => ({
  isMuted: false,
  setIsMuted: (isMuted) => set({ isMuted }),
  activeSection: 'hero',
  setActiveSection: (section) => set({ activeSection: section }),
}));
