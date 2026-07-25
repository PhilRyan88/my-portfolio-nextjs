'use client';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { GitHubLogoIcon, LinkedInLogoIcon, InstagramLogoIcon } from '@radix-ui/react-icons';

import { useAnimationStore } from '@/store/animationStore';
import { MagneticButton } from './MagneticButton';
import { motion, AnimatePresence } from 'framer-motion';

export const Navbar = () => {
  const { setIsCardExpanded, setIsFlipped } = useAnimationStore();
  
  const [isScrolled, setIsScrolled] = useState(false);
  const [isManuallyExpanded, setIsManuallyExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 150) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
        setIsManuallyExpanded(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    // Run once on mount to set initial state
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isCollapsed = (isScrolled || isMobile) && !isManuallyExpanded;

  const handleNavClick = () => {
    if (isScrolled || isMobile) {
      setIsManuallyExpanded(false);
    }
  };

  const links = [
    { name: 'WORK', href: '#developer' },
    { name: 'ABOUT', href: '#experience' },
    { name: 'SKILLS', href: '#skills' },
    { name: 'CONTACT', action: () => { 
        handleNavClick();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setIsCardExpanded(true); 
        setIsFlipped(true); 
      } 
    }
  ];

  return (
    <div className="fixed top-0 left-0 w-full z-50 flex justify-center pointer-events-none">
      <motion.nav 
        layout
        initial={false}
        transition={{ type: 'spring', stiffness: 300, damping: 25, mass: 0.8 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        onClick={() => {
          if (isCollapsed) setIsManuallyExpanded(true);
        }}
        className={`pointer-events-auto relative overflow-hidden flex items-center
          ${isCollapsed 
            ? 'w-16 h-16 rounded-full border border-white/20 bg-[#030305]/60 backdrop-blur-md mt-6 cursor-pointer shadow-[0_0_20px_rgba(0,0,0,0.5)] justify-center' 
            : (isMobile 
                ? 'w-[95%] h-[72px] rounded-full border border-white/10 bg-[#030305]/95 backdrop-blur-xl mt-4 mix-blend-normal text-white shadow-2xl' 
                : 'w-full h-[88px] rounded-none border-b border-white/5 mix-blend-difference text-white px-10 justify-between')
          }`}
      >
        <AnimatePresence mode="popLayout" initial={false}>
          {isCollapsed ? (
            <motion.div
              key="ball"
              initial={{ opacity: 0, scale: 0, rotate: -180 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0, rotate: 180 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="absolute inset-0 flex items-center justify-center w-full h-full"
            >
              {/* Outer spinning ring for futuristic feel */}
              <div className="absolute inset-0 rounded-full border border-neon-cyan/20 border-t-neon-cyan/80 animate-[spin_4s_linear_infinite]" />
              
              {/* Inner glowing core */}
              <div className={`absolute inset-2 rounded-full bg-neon-cyan/20 blur-sm transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`} />

              <Menu className="w-5 h-5 text-white z-10" />
            </motion.div>
          ) : (
            <motion.div
              key="full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className={`flex items-center w-full h-full ${
                isMobile 
                  ? 'overflow-x-auto no-scrollbar gap-8 px-6 touch-pan-x' 
                  : 'justify-between'
              }`}
            >
              {/* Brand */}
              <div className="font-display font-bold text-xl tracking-tighter cursor-pointer flex-shrink-0">
                A.SOORAJ <span className="text-neon-cyan">©</span>
              </div>
              
              {/* Mobile Close Button (Shows inside the scrollable area at the start) */}
              {isMobile && isManuallyExpanded && (
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsManuallyExpanded(false);
                  }}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-red-500 hover:text-white transition-all duration-300 text-white flex-shrink-0"
                >
                  <X size={16} />
                </button>
              )}

              {/* Links */}
              <div className="flex items-center gap-6 md:gap-8 font-mono text-sm tracking-widest flex-shrink-0 md:absolute md:left-1/2 md:-translate-x-1/2">
                {links.map((link) => (
                  <MagneticButton key={link.name}>
                    {link.href ? (
                      <a 
                        href={link.href} 
                        onClick={() => handleNavClick()}
                        className="hover:text-neon-cyan transition-colors duration-300 py-2 whitespace-nowrap block"
                      >
                        {link.name}
                      </a>
                    ) : (
                      <button 
                        onClick={link.action} 
                        className="hover:text-neon-cyan transition-colors duration-300 py-2 whitespace-nowrap block"
                      >
                        {link.name}
                      </button>
                    )}
                  </MagneticButton>
                ))}
              </div>

              {/* Right Actions */}
              <div className="flex items-center gap-6 flex-shrink-0">
                <div className="flex items-center gap-6 md:border-r md:border-white/20 md:pr-6 md:mr-2">
                  <MagneticButton>
                    <a href="https://github.com/PhilRyan88" target="_blank" rel="noreferrer">
                      <GitHubLogoIcon className="w-5 h-5 hover:text-neon-violet transition-colors cursor-pointer" />
                    </a>
                  </MagneticButton>
                  <MagneticButton>
                    <a href="https://www.linkedin.com/in/aditya-sooraj-863a2b2b1" target="_blank" rel="noreferrer">
                      <LinkedInLogoIcon className="w-5 h-5 hover:text-neon-cyan transition-colors cursor-pointer" />
                    </a>
                  </MagneticButton>
                  <MagneticButton>
                    <a href="https://www.instagram.com/the.adityasooraj/" target="_blank" rel="noreferrer">
                      <InstagramLogoIcon className="w-5 h-5 hover:text-[#E1306C] transition-colors cursor-pointer" />
                    </a>
                  </MagneticButton>
                </div>
                
                {/* Close Button when manually expanded and scrolled (Desktop) */}
                {!isMobile && isManuallyExpanded && isScrolled && (
                  <button 
                    onClick={(e) => {
                      e.stopPropagation(); // Don't trigger the nav container click
                      setIsManuallyExpanded(false);
                    }}
                    className="ml-2 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-red-500 hover:text-white transition-all duration-300 text-white flex-shrink-0"
                  >
                    <X size={18} />
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </div>
  );
};
