import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const photos = [
  '/assets/photography/20210720_171310.jpg', '/assets/photography/20220305_173036.jpg', '/assets/photography/20220311_161013 (1).jpg',
  '/assets/photography/20220326_175505.jpg', '/assets/photography/20220327_193023.jpg', '/assets/photography/20220816_190606.jpg', 
  '/assets/photography/20221120_161027 (1).jpg', '/assets/photography/20221120_174925.jpg', '/assets/photography/20221120_175258(0).jpg', 
  '/assets/photography/20230425_122341.jpg', '/assets/photography/20230615_135801.jpg', '/assets/photography/20230806_185347.jpg', 
  '/assets/photography/20230806_185516.jpg', '/assets/photography/20240116054016_IMG_5895 (1) (1).jpg', '/assets/photography/20240116055632_IMG_5946 (1).jpg', 
  '/assets/photography/20240116063236_IMG_6008 (1).jpg', '/assets/photography/20240116204458_IMG_6315 (1).jpg', '/assets/photography/20250611_131805 (1).jpg',
  '/assets/photography/20250615_185626 (1).jpg', '/assets/photography/20250629_180603 (1).jpg', '/assets/photography/20250629_183241.jpg', 
  '/assets/photography/20250925_223450 (1).jpg', '/assets/photography/20250930_205447.jpg', '/assets/photography/20251023_191431.jpg', 
  '/assets/photography/20251026_161111.jpg', '/assets/photography/20251026_170203 (1).jpg', '/assets/photography/20251031_141015.jpg', 
  '/assets/photography/20251109_161041.jpg', '/assets/photography/20251214_171502.jpg', '/assets/photography/20251227_174610.jpg',
  '/assets/photography/20251229_080524.jpg', '/assets/photography/20260101_171528 (1).jpg', '/assets/photography/20260101_183930(1).jpg', 
  '/assets/photography/20260110_180007.jpg', '/assets/photography/20260110_180015.jpg', '/assets/photography/20260110_181420.jpg', 
  '/assets/photography/20260110_182249 (1).jpg', '/assets/photography/20260110_182336.jpg', '/assets/photography/20260201_232711.jpg', 
  '/assets/photography/20260209_165342.jpg', '/assets/photography/20260412_173303(1) (1).jpg', '/assets/photography/20260523_184307.jpg',
  '/assets/photography/20260523_185350.jpg', '/assets/photography/20260613_174555.jpg', '/assets/photography/20260613_174815.jpg', 
  '/assets/photography/20260627_171253(1).jpg', '/assets/photography/20260627_175658.jpg', '/assets/photography/ADB_LRM (1).jpg', 
  '/assets/photography/ADB_LRM (12).jpg', '/assets/photography/ADB_LRM (13).jpg', '/assets/photography/ADB_LRM (21).jpg', 
  '/assets/photography/IMG_20230428_161806_335.jpg', '/assets/photography/IMG_20231008_232757_321.jpg', '/assets/photography/IMG_20240212_104425_030 (1).jpg',
  '/assets/photography/IMG_20260111_150318_547.jpg', '/assets/photography/_20240403-124626.jpg'
];

export const Photography = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <section id="photography" className="w-full py-32 bg-[#030305] relative overflow-hidden">
      <h2 className="absolute top-32 left-0 right-0 text-center font-display text-[15vw] font-bold text-white/5 tracking-tighter mix-blend-overlay pointer-events-none z-0">
        GALLERY
      </h2>
      
      <div className="relative z-10 px-6 md:px-16 mb-16 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <h2 className="text-4xl md:text-6xl font-display font-bold text-white tracking-tighter">
          PHOTOGRAPHY
        </h2>
        <div className="flex items-center gap-2 text-neon-cyan/70 uppercase tracking-widest text-sm font-mono animate-pulse">
          <span>Swipe to explore</span>
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>
      </div>
      
      {/* Native CSS Hardware-Accelerated Scroll Container */}
      <div className="w-full overflow-x-auto snap-x snap-mandatory px-6 md:px-16 pb-12 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
        <div className="flex gap-6 w-max pt-4">
          {photos.map((src, i) => (
            <div 
              key={i} 
              className="photo-card shrink-0 w-[80vw] sm:w-[50vw] md:w-[40vw] lg:w-[28vw] h-[60vh] rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.5)] flex items-center justify-center relative overflow-hidden group cursor-pointer snap-center"
              onClick={() => setSelectedImage(src)}
            >
              {/* Blurred vibrant background to elegantly fill the empty space of different aspect ratios */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src={src} 
                alt=""
                loading="lazy"
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover filter blur-2xl opacity-60 scale-125 pointer-events-none transition-opacity duration-700 group-hover:opacity-40"
              />
              
              {/* Subtle darkening overlay for contrast */}
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-700 pointer-events-none" />

              {/* Crisp Foreground Image (object-contain perfectly preserves ratio) */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src={src} 
                alt={`Photography ${i}`} 
                draggable="false"
                loading="lazy"
                decoding="async"
                className="relative z-10 w-full h-full object-contain pointer-events-none drop-shadow-2xl group-hover:scale-[1.03] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
              />
              
              {/* Elegant hover zoom icon */}
              <div className="absolute inset-0 pointer-events-none" />
              <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 pointer-events-none z-20">
                <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-xl flex items-center justify-center border border-white/20 text-white shadow-xl">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    
      {/* Full-screen Lightbox Preview */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(16px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[120] bg-black/90 flex items-center justify-center p-4 md:p-12 cursor-pointer"
            onClick={() => setSelectedImage(null)}
          >
            <motion.img 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              src={selectedImage} 
              className="max-w-full max-h-full object-contain drop-shadow-2xl rounded-sm"
              alt="Preview"
              draggable="false"
            />
          
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
