"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { Photo } from '../data/photography';
import { useEffect } from 'react';

interface ArchiveViewerProps {
  photo: Photo | null;
  index: number;
  total: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export const ArchiveViewer = ({ photo, index, total, onClose, onNext, onPrev }: ArchiveViewerProps) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft') onPrev();
    };

    if (photo) {
      window.addEventListener('keydown', handleKeyDown);
      // Lock body scroll
      document.body.style.overflow = 'hidden';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [photo, onClose, onNext, onPrev]);

  return (
    <AnimatePresence>
      {photo && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[200] bg-[#030305] flex flex-col justify-between"
        >
          {/* Header */}
          <div className="w-full flex justify-between items-center p-6 md:p-12 z-10 mix-blend-difference text-white pointer-events-none">
            <span className="font-mono text-xs tracking-[0.3em] uppercase opacity-70">
              {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
            </span>
            
            <button 
              onClick={onClose}
              data-cursor-text="CLOSE"
              className="font-mono text-xs tracking-widest uppercase pointer-events-auto hover:opacity-70 transition-opacity"
            >
              [ Close ]
            </button>
          </div>

          {/* Image Container */}
          <div 
            className="absolute inset-0 flex items-center justify-center p-6 md:p-24"
            onClick={onNext}
            data-cursor-text="NEXT"
          >
            <motion.img
              key={photo.id}
              initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              src={photo.src}
              alt={photo.alt}
              className="max-w-full max-h-full object-contain drop-shadow-2xl select-none"
              draggable={false}
            />
          </div>

          {/* Footer Metadata */}
          <div className="w-full flex justify-between items-end p-6 md:p-12 z-10 mix-blend-difference text-white pointer-events-none">
            <div className="flex flex-col gap-2">
              <h3 className="font-display text-2xl tracking-tight font-bold uppercase">
                {photo.alt.replace(/\\.[^/.]+$/, "")} {/* remove extension */}
              </h3>
              {(photo.location || photo.camera) && (
                <div className="font-mono text-[10px] tracking-widest opacity-50 flex gap-4 uppercase">
                  {photo.location && <span>{photo.location}</span>}
                  {photo.camera && <span>{photo.camera}</span>}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
