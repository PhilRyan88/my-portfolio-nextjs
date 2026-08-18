"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';

export const PhotographyEntry = () => {
  return (
    <section id="photography-entry" className="w-full py-40 bg-[#030305] relative overflow-hidden flex items-center justify-center border-t border-white/5">
      
      {/* Background Subtle Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.03)_0%,_transparent_70%)] pointer-events-none" />

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto flex flex-col items-center">
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="text-neon-cyan/70 uppercase tracking-[0.3em] text-xs font-mono mb-6"
        >
          Selected Works
        </motion.p>
        
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, delay: 0.1 }}
          className="text-5xl md:text-8xl font-display font-bold text-white tracking-tighter leading-tight mb-8"
        >
          THE ARCHIVE
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-gray-400 max-w-md mx-auto mb-16 font-sans text-sm md:text-base leading-relaxed"
        >
          A curated collection of frames, experimental compositions, and moments captured along the way.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <Link 
            href="/photography" 
            className="group relative inline-flex items-center justify-center px-8 py-4 bg-white text-black font-bold uppercase tracking-widest text-sm overflow-hidden"
          >
            <span className="relative z-10 transition-transform duration-500 group-hover:-translate-y-12">
              Enter Photography
            </span>
            <span className="absolute inset-0 z-10 flex items-center justify-center text-white bg-black translate-y-full transition-transform duration-500 group-hover:translate-y-0">
              Enter Photography
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};
