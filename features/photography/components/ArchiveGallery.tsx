"use client";

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Photo } from '../data/photography';

interface ArchiveGalleryProps {
  photos: Photo[];
  onSelect: (index: number) => void;
}

export const ArchiveGallery = ({ photos, onSelect }: ArchiveGalleryProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Optional: Convert vertical mouse wheel to horizontal scrolling on desktop
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    const handleWheel = (e: WheelEvent) => {
      // If we are on a vertical layout (mobile), don't hijack scroll
      if (window.innerWidth < 768) return;
      
      if (e.deltaY !== 0) {
        e.preventDefault();
        container.scrollLeft += e.deltaY;
      }
    };
    
    // Non-passive to allow preventDefault
    container.addEventListener('wheel', handleWheel, { passive: false });
    return () => container.removeEventListener('wheel', handleWheel);
  }, []);

  return (
    <div 
      ref={containerRef}
      className="w-full h-full flex flex-col md:flex-row items-center md:items-end gap-8 md:gap-16 px-6 md:px-32 py-24 md:py-32 overflow-y-auto md:overflow-x-auto md:overflow-y-hidden [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none'] snap-y md:snap-x snap-mandatory"
    >
      {/* Introduction text in the filmstrip */}
      <div className="shrink-0 w-full md:w-[40vw] flex flex-col justify-center snap-start h-[60vh] md:h-auto">
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-neon-cyan/70 uppercase tracking-[0.3em] text-xs font-mono mb-4"
        >
          Volume 01
        </motion.p>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-5xl md:text-7xl font-display font-bold text-white tracking-tighter leading-tight mb-8"
        >
          THE<br/>ARCHIVE
        </motion.h1>
      </div>

      {photos.map((photo, i) => (
        <motion.div
          key={photo.id}
          initial={{ opacity: 0, filter: 'blur(10px)' }}
          whileInView={{ opacity: 1, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: "200px" }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="shrink-0 w-[90vw] md:w-auto h-auto md:h-[70vh] max-h-[80vh] flex flex-col gap-4 group cursor-pointer snap-center"
          onClick={() => onSelect(i)}
          data-cursor-text="VIEW"
        >
          <div className="relative w-full h-full overflow-hidden bg-[#111111]">
            <img 
              src={photo.src}
              alt={photo.alt}
              loading="lazy"
              className="w-full h-full object-cover md:object-contain object-bottom transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
              style={{ maxHeight: 'inherit' }}
            />
            {/* Dark gradient overlay that lifts on hover */}
            <div className="absolute inset-0 bg-black/30 group-hover:bg-transparent transition-colors duration-700 pointer-events-none" />
          </div>
          
          <div className="flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <span className="font-mono text-[10px] tracking-widest uppercase text-white/50">
              {String(i + 1).padStart(3, '0')}
            </span>
          </div>
        </motion.div>
      ))}

      {/* End spacer */}
      <div className="shrink-0 w-8 md:w-32 h-full" />
    </div>
  );
};
