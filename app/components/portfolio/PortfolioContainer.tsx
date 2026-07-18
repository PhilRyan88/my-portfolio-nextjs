import { useAnimationStore } from '@/store/animationStore';
import { Hero } from './Hero';
import { Photography } from './Photography';
import { Cinematography } from './Cinematography';
import { Developer } from './Developer';
import { Tutor } from './Tutor';
import { Skills } from './Skills';
import { Navbar } from '../ui/Navbar';
import { AnimatePresence, motion } from 'framer-motion';

export const PortfolioContainer = () => {
  const { phase } = useAnimationStore();

  return (
    <AnimatePresence>
      {phase === 'unlocked' && (
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="relative w-full min-h-screen z-10"
        >
          <Navbar />
          <main className="w-full flex flex-col items-center">
            <Hero />
            <Photography />
            <Cinematography />
            <Developer />
            <Tutor />
            <Skills />
          </main>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
