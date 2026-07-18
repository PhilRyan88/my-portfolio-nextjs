import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SplitText } from '../ui/SplitText';

const tags = ['CREATIVE DEVELOPER', 'CINEMATOGRAPHER', 'PHOTOGRAPHER', 'BLOCKCHAIN DEV'];

export const Hero = () => {
  const [tagIndex, setTagIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTagIndex((prev) => (prev + 1) % tags.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="hero" className="w-full min-h-screen flex flex-col justify-center px-6 md:px-16 pt-32 pb-16 relative">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_50%,_rgba(0,240,255,0.05)_0%,_transparent_60%)]" />
      
      <div className="relative z-10 w-full max-w-[1400px] mx-auto flex flex-col justify-between h-[70vh]">
        
        {/* Top Content */}
        <div className="flex justify-between items-start font-mono text-xs md:text-sm text-gray-400 tracking-[0.2em] uppercase">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.5 }}>
            Based in <br />
            <span className="text-white">Earth, Web3</span>
          </motion.div>
          
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.7 }} className="text-right">
            Available for <br />
            <span className="text-neon-cyan text-glow">Freelance Work</span>
          </motion.div>
        </div>

        {/* Massive Center Title */}
        <div className="flex flex-col items-center text-center mt-12">
          <SplitText 
            text="ADITYA " 
            className="font-display text-[12vw] md:text-[10vw] font-bold leading-[0.8] tracking-tighter" 
            delay={0.1}
          />
          <SplitText 
            text="SOORAJ" 
            className="font-display text-[15vw] md:text-[12vw] font-bold leading-[0.8] tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-gray-500" 
            delay={0.5}
          />
        </div>
        
        {/* Bottom Content with Rotating Tags */}
        <div className="flex flex-col md:flex-row justify-between items-end mt-auto gap-8">
          <motion.p 
            initial={{ opacity: 0, x: -30 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ duration: 1, delay: 1 }}
            className="max-w-xs text-sm md:text-base text-gray-400 font-sans leading-relaxed"
          >
            Blurring the line between high-end digital design and functional engineering to create immersive web experiences.
          </motion.p>

          <div className="h-12 overflow-hidden flex items-end">
            <AnimatePresence mode="wait">
              <motion.div
                key={tagIndex}
                initial={{ y: 40, opacity: 0, rotateX: 90 }}
                animate={{ y: 0, opacity: 1, rotateX: 0 }}
                exit={{ y: -40, opacity: 0, rotateX: -90 }}
                transition={{ duration: 0.6, ease: 'easeInOut' }}
                className="font-mono text-lg md:text-2xl text-neon-violet tracking-widest uppercase font-semibold"
                style={{ transformOrigin: 'bottom' }}
              >
                {tags[tagIndex]}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

      </div>
    </section>
  );
};
