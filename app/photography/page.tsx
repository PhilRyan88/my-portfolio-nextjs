"use client";

import { useState, useEffect } from 'react';
import { photographyData } from '@/features/photography/data/photography';
import { ArchiveGallery } from '@/features/photography/components/ArchiveGallery';
import { ArchiveViewer } from '@/features/photography/components/ArchiveViewer';
import { Navbar } from '@/app/components/ui/Navbar';
import Link from 'next/link';
import { CustomCursor } from '@/app/components/ui/CustomCursor';
import { motion } from 'framer-motion';
import { SmoothScroll } from '@/app/components/ui/SmoothScroll';

export default function PhotographyPage() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  // Lock global scroll on desktop since we use horizontal scrolling in the gallery
  useEffect(() => {
    if (window.innerWidth >= 768) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const handleNext = () => {
    if (selectedIndex === null) return;
    setSelectedIndex((selectedIndex + 1) % photographyData.length);
  };

  const handlePrev = () => {
    if (selectedIndex === null) return;
    setSelectedIndex((selectedIndex - 1 + photographyData.length) % photographyData.length);
  };

  return (
    <main className="relative w-full h-[100lvh] bg-[#030305] text-white overflow-hidden">
      <CustomCursor />
      
      {/* Absolute Header - Minimal Navigation */}
      <div className="absolute top-0 left-0 w-full z-50 flex justify-between items-center px-6 md:px-12 py-8 pointer-events-none mix-blend-difference">
        <Link 
          href="/" 
          data-cursor-text="BACK" 
          className="font-mono text-xs tracking-[0.3em] uppercase pointer-events-auto hover:opacity-70 transition-opacity"
        >
          [ Return to Portfolio ]
        </Link>
        <div className="font-display text-sm tracking-widest uppercase font-bold opacity-30">
          Archive
        </div>
      </div>

      <ArchiveGallery 
        photos={photographyData} 
        onSelect={(index) => setSelectedIndex(index)} 
      />

      {selectedIndex !== null && (
        <ArchiveViewer 
          photo={photographyData[selectedIndex]}
          index={selectedIndex}
          total={photographyData.length}
          onClose={() => setSelectedIndex(null)}
          onNext={handleNext}
          onPrev={handlePrev}
        />
      )}
    </main>
  );
}
