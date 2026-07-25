'use client';
import { motion } from 'framer-motion';

export const Footer = () => {
  return (
    <footer className="w-full relative py-16 bg-[#030305] flex flex-col items-center justify-center border-t border-white/5">
      
      <div className="relative z-10 flex flex-col items-center justify-center gap-2">
        
        {/* Small Signature */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          className="mb-4"
        >
          <span 
            className="text-4xl md:text-5xl text-white/80"
            style={{ fontFamily: 'var(--font-signature)' }}
          >
            Aditya S Sooraj
          </span>
        </motion.div>
        
        {/* Copyright */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          className="flex flex-col md:flex-row items-center gap-4 text-[10px] font-mono text-white/30 tracking-widest uppercase"
        >
          <span>© {new Date().getFullYear()} All Rights Reserved</span>
        </motion.div>
      </div>

    </footer>
  );
};
