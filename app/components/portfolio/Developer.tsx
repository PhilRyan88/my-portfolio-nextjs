import { useEffect, useRef, useState } from 'react';
import { MagneticButton } from '../ui/MagneticButton';
import gsap from 'gsap';

const projects = [
  { 
    name: 'MATRIX', 
    tech: 'REACT / SOLIDITY / WEB3', 
    desc: 'My final year project: a Web3-based social media platform built entirely from scratch during the 2022-2023 period, with very limited usage of the early, less-efficient versions of ChatGPT. Each uploaded post can be minted as an NFT, allowing users to bid on them within a specified timeframe. It features a complete bidding history and allows users to view profiles to see how many NFTs others hold in their wallets.',
    images: [
      '/assets/projects/matrix/Screenshot 2026-07-19 122137.png',
      '/assets/projects/matrix/Screenshot 2026-07-19 122013.png',
      '/assets/projects/matrix/Screenshot 2026-07-19 122059.png',
      '/assets/projects/matrix/Screenshot 2026-07-19 122115.png',
      '/assets/projects/matrix/Screenshot 2026-07-19 122127.png'
    ]
  },
  { 
    name: 'BOOK VERSE', 
    tech: 'REACT / SOLIDITY / NODE.JS / MONGODB', 
    desc: 'A Web3 book-selling e-commerce platform designed for thrifting and transferring book ownership using cryptocurrency. Users can set a base price, and others can make offers. Books have a validity period on user profiles, requiring a blockchain gas fee to maintain their listing.' 
  },
  { 
    name: 'LAWYER HUB', 
    tech: 'REACT / NODE.JS / EXPRESS / MONGODB', 
    desc: 'A comprehensive case management system for law offices. It tracks case registration dates, upcoming hearings, and client details, including a chain of custody for submitted IDs. It features a dedicated calendar for court dates, as well as a robust financial system to track dues and payments.' 
  },
  { 
    name: 'LEGAL CARE AI', 
    tech: 'REACT / NODE.JS / EXPRESS / NLP', 
    desc: 'An AI-powered legal application that generates forms for wills, divorce, leases, and land transfers. It features a dedicated chatbot for legal queries and a draft analyzer—built with a machine learning model trained on over 5,000 datasets—that summarizes legal documents and recommends necessary steps.' 
  },
  { 
    name: 'BALLOT BLOCX', 
    tech: 'REACT / SOLIDITY / WEB3', 
    desc: 'A decentralized, blockchain-based voting system built to elect a college chairman, designed to completely eliminate the possibility of duplicate voting.' 
  },
  { 
    name: 'CLOUD SAFE', 
    tech: 'REACT / SUPABASE / NODE.JS / SPEAKEASY', 
    desc: 'A highly secure application featuring Two-Factor Authentication (2FA) to keep user files fully encrypted and safely stored in the cloud.' 
  },
  { 
    name: 'NEXENTRY', 
    tech: 'NEXT.JS / TAILWIND CSS', 
    desc: 'A modern, high-performance website designed and developed for a corporate data entry company.' 
  },
];

const ProjectImageGallery = ({ images }: { images: string[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className="absolute inset-0 flex items-center justify-center font-mono text-xs text-gray-600">
        IMAGE PLACEHOLDER
      </div>
    );
  }

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (images.length > 1) {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }
  };

  return (
    <div 
      className="absolute inset-0 w-full h-full cursor-pointer z-40"
      onClick={handleNextImage}
    >
      {images.map((src, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img 
          key={i}
          src={src} 
          alt={`Screenshot ${i + 1}`} 
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${i === currentIndex ? 'opacity-60 group-hover/img:opacity-100' : 'opacity-0'}`} 
        />
      ))}
      
      {images.length > 1 && (
        <>
          {/* Tutorial Hint */}
          <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm border border-white/10 px-3 py-1.5 rounded-full z-30 opacity-0 group-hover/img:opacity-100 transition-opacity duration-500 pointer-events-none flex items-center gap-2">
            <span className="font-mono text-[10px] text-neon-cyan uppercase tracking-widest">Click to advance</span>
            <svg className="w-3 h-3 text-neon-cyan animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </div>
          
          {/* Navigation Dots */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-1.5 z-20 pointer-events-none">
            {images.map((_, i) => (
              <div key={i} className={`h-1 rounded-full transition-all duration-300 ${i === currentIndex ? 'w-4 bg-neon-cyan' : 'w-1.5 bg-white/30'}`} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export const Developer = () => {
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card) => {
        if (!card) return;
        
        const tl = gsap.timeline({ paused: true });
        tl.to(card.querySelector('.reveal-content'), {
          height: 'auto',
          opacity: 1,
          duration: 0.6,
          ease: 'power3.inOut',
        });

        const play = () => tl.play();
        const reverse = () => tl.reverse();

        card.addEventListener('mouseenter', play);
        card.addEventListener('mouseleave', reverse);

        (card as any)._cleanup = () => {
          card.removeEventListener('mouseenter', play);
          card.removeEventListener('mouseleave', reverse);
        };
      });
    });

    return () => {
      cardsRef.current.forEach(card => {
        if (card && (card as any)._cleanup) (card as any)._cleanup();
      });
      ctx.revert();
    };
  }, []);

  return (
    <section id="developer" className="w-full min-h-screen px-6 md:px-16 py-32 relative">
      <h2 className="text-4xl md:text-6xl font-display font-bold mb-16 text-white tracking-tighter">
        DEVELOPMENT
      </h2>
      
      <div className="flex flex-col gap-8 w-full max-w-6xl mx-auto">
        {projects.map((p, i) => (
          <div 
            key={i}
            ref={el => { cardsRef.current[i] = el; }}
            className="w-full glass-panel border border-white/5 hover:border-neon-cyan/50 transition-colors duration-500 p-8 group cursor-pointer"
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 md:gap-0">
              <h3 className="text-3xl md:text-6xl font-display font-bold text-gray-500 group-hover:text-white transition-colors duration-500 tracking-tighter">
                {p.name}
              </h3>
              <p className="font-mono text-neon-cyan text-xs md:text-sm tracking-widest uppercase">{p.tech}</p>
            </div>
            
            <div className="reveal-content h-0 opacity-0 overflow-hidden flex flex-col md:flex-row gap-8 mt-0 group-hover:mt-12">
              <div className="flex-1 aspect-video bg-black/50 border border-white/10 relative overflow-hidden group/img rounded-lg">
                <ProjectImageGallery images={(p as any).images || []} />
                {/* Simulated scan line */}
                <div className="absolute top-0 left-0 w-full h-[2px] bg-neon-cyan/50 -translate-y-full group-hover/img:translate-y-[500px] transition-transform duration-[3s] ease-linear z-30 pointer-events-none" />
              </div>
              <div className="flex-1 flex flex-col justify-between">
                <p className="text-xl text-gray-400 font-sans leading-relaxed font-light">
                  {p.desc}
                </p>

              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
