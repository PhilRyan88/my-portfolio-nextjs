import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SplitText } from '../ui/SplitText';
import { useAnimationStore } from '@/store/animationStore';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const tags = ['SOFTWARE DEVELOPER','CINEMATOGRAPHER','PHOTOGRAPHER','BLOCKCHAIN DEV'];

export const Hero = () => {
  const { phase } = useAnimationStore();
  const [tagIndex, setTagIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const badgeText = 'JR. SOFTWARE ENGINEER';
  const marqueeRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    if (phase !== 'docked') return;
    let i = 0;
    const interval = setInterval(() => {
      if (i <= badgeText.length) {
        setDisplayedText(badgeText.slice(0, i));
        i++;
      } else {
        clearInterval(interval);
      }
    }, 100);
    return () => clearInterval(interval);
  }, [phase]);

  useEffect(() => {
    if (!marqueeRef.current) return;
    const ctx = gsap.context(() => {
      tweenRef.current = gsap.to(marqueeRef.current, {
        xPercent: -50,
        repeat: -1,
        duration: 30, // adjust duration for speed
        ease: 'none',
      });
    });
    return () => ctx.revert();
  }, []);

  const handleMouseEnter = () => tweenRef.current?.pause();
  const handleMouseLeave = () => tweenRef.current?.play();

  useEffect(() => {
    const interval = setInterval(() => {
      setTagIndex((prev) => (prev + 1) % tags.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="hero" className="w-full min-h-[100lvh] flex flex-col justify-center px-6 md:px-16 pt-32 pb-16 relative">
      <style>{`
        @keyframes terminalBlink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .animate-terminal-blink {
          animation: terminalBlink 0.6s step-end infinite;
        }
      `}</style>
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_50%,_rgba(0,240,255,0.05)_0%,_transparent_60%)]" />
      
      <div className="relative z-10 w-full max-w-[1400px] mx-auto flex flex-col justify-between h-[70vh]">
        
        {/* Top Content */}
        <div className="flex justify-between items-start font-mono text-xs md:text-sm text-gray-400 tracking-[0.2em] uppercase">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.5 }}>
            Based in <br />
            <span className="text-white">Oachira, Kerala</span>
          </motion.div>
        </div>

        {/* Massive Center Title */}
        <div className="flex flex-col items-center text-center mt-12 w-full" style={{ fontFamily: 'var(--font-archivo-black)' }}>
          <div className="relative flex flex-col items-center">
            <motion.div 
              initial={{ opacity: 0, x: -20 }} 
              animate={{ opacity: 1, x: 0 }} 
              transition={{ duration: 0.6, delay: 0.8 }}
              className="md:absolute md:right-full md:top-[15%] md:mr-6 mb-4 md:mb-0 flex items-center px-4 py-2 border-l-4 border-[#4ADE80] bg-gradient-to-r from-[#4ADE80]/20 to-transparent whitespace-nowrap backdrop-blur-sm"
            >
              <span className="text-xs md:text-sm font-mono text-[#4ADE80] font-bold tracking-[0.1em] md:tracking-[0.2em] uppercase">
                &gt; {displayedText}<span className="animate-terminal-blink font-black">_</span>
              </span>
            </motion.div>
            
            <div className="flex">
              <SplitText 
                text="A" 
                className="text-[12vw] md:text-[10vw] font-bold leading-[0.8] tracking-tighter text-white" 
                delay={0.1}
              />
              <SplitText 
                text="DITYA " 
                className="text-[12vw] md:text-[10vw] font-bold leading-[0.8] tracking-tighter text-[#FACC15]" 
                delay={0.2}
              />
            </div>
          </div>
          <SplitText 
            text="SOORAJ" 
            className="text-[15vw] md:text-[12vw] font-bold leading-[0.8] pb-[0.1em] tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-gray-500" 
            delay={0.5}
          />
        </div>
        
        {/* Bottom Content with Rotating Tags */}
        <div className="flex flex-col md:flex-row justify-between items-end mt-auto gap-8 overflow-hidden">
          <motion.p 
            initial={{ opacity: 0, x: -30 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ duration: 1, delay: 1 }}
            className="max-w-xs text-sm md:text-base text-gray-400 font-sans leading-relaxed shrink-0"
          >
            Focused on building logically and functionally accurate web applications to solve complex real-world problems.
          </motion.p>

          <div 
            className="flex-1 ml-8 overflow-hidden flex items-end pb-1 mask-image-linear-edges"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div
              ref={marqueeRef}
              className="text-lg md:text-2xl text-transparent [-webkit-text-stroke:1px_#6b7280] tracking-widest uppercase font-bold whitespace-nowrap flex w-max"
              style={{ fontFamily: 'var(--font-orbitron)' }}
            >
              {[0, 1].map((blockIndex) => (
                <div key={blockIndex} className="flex items-center">
                  {[...Array(4)].map((_, i) => (
                    <div key={`${blockIndex}-${i}`} className="flex items-center">
                      {tags.map((tag, j) => (
                        <span key={`${blockIndex}-${i}-${j}`} className="mx-6 flex items-center hover:text-white transition-colors duration-300">
                          {tag}
                          <span className="mx-6 text-white/20">|</span>
                        </span>
                      ))}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
